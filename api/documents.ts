import type { VercelRequest, VercelResponse } from '@vercel/node';

// Memory fallback for serverless session execution
let inMemoryDocsStore: { overrides: Record<string, any>; globalAffidavit: string | null } = {
  overrides: {},
  globalAffidavit: null,
};
let inMemoryDocFilesStore: Record<string, string> = {};

function getKvCredentials() {
  const kvUrl =
    process.env.KV_REST_API_URL ||
    process.env.UPSTASH_REDIS_REST_URL ||
    process.env.STORAGE_REST_API_URL ||
    process.env.STORAGE_URL;

  const kvToken =
    process.env.KV_REST_API_TOKEN ||
    process.env.UPSTASH_REDIS_REST_TOKEN ||
    process.env.STORAGE_REST_API_TOKEN ||
    process.env.STORAGE_TOKEN;

  return { kvUrl, kvToken };
}

async function kvGet(key: string, kvUrl: string, kvToken: string): Promise<string | null> {
  try {
    const res = await fetch(`${kvUrl}/get/${encodeURIComponent(key)}`, {
      headers: { Authorization: `Bearer ${kvToken}` },
    });
    if (!res.ok) return null;
    const data = await res.json();
    if (data.result === undefined || data.result === null) return null;

    let result = typeof data.result === 'string' ? data.result : JSON.stringify(data.result);

    // Unwrap JSON-encoded strings (e.g. '"https://..."' → 'https://...')
    // This handles cases where Upstash stores the raw request body including quotes
    if (result.startsWith('"') && result.endsWith('"')) {
      try {
        const parsed = JSON.parse(result);
        if (typeof parsed === 'string') result = parsed;
      } catch {}
    }

    return result;
  } catch (e) {
    console.error(`Error reading key ${key} from KV:`, e);
    return null;
  }
}

async function kvSet(key: string, value: any, kvUrl: string, kvToken: string): Promise<boolean> {
  try {
    // Send the value as a raw string (Upstash stores the request body as-is)
    const body = typeof value === 'string' ? value : JSON.stringify(value);
    const res = await fetch(`${kvUrl}/set/${encodeURIComponent(key)}`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${kvToken}`,
        'Content-Type': 'text/plain',
      },
      body,
    });
    return res.ok;
  } catch (e) {
    console.error(`Error setting key ${key} in KV:`, e);
    return false;
  }
}

// Clean embedded base64 URLs from index and offload them to separate KV keys
async function sanitizeAndOffloadIndex(
  indexData: { overrides?: Record<string, any>; globalAffidavit?: string | null },
  kvUrl?: string,
  kvToken?: string
) {
  let modified = false;
  const overrides = indexData.overrides || {};
  let globalAffidavit = indexData.globalAffidavit || null;

  if (globalAffidavit && globalAffidavit.startsWith('data:')) {
    const fileKey = 'GLOBAL_globalAffidavit';
    inMemoryDocFilesStore[fileKey] = globalAffidavit;
    if (kvUrl && kvToken) {
      await kvSet(`minit_doc_file:${fileKey}`, globalAffidavit, kvUrl, kvToken);
    }
    globalAffidavit = `/api/documents?docId=${fileKey}`;
    modified = true;
  }

  const cleanOverrides: Record<string, any> = {};
  for (const [prodId, docsObj] of Object.entries(overrides)) {
    if (!docsObj || typeof docsObj !== 'object') continue;
    cleanOverrides[prodId] = {};
    for (const [docType, val] of Object.entries(docsObj as Record<string, any>)) {
      if (typeof val === 'string' && val.startsWith('data:')) {
        const fileKey = `${prodId}_${docType}`;
        inMemoryDocFilesStore[fileKey] = val;
        if (kvUrl && kvToken) {
          await kvSet(`minit_doc_file:${fileKey}`, val, kvUrl, kvToken);
        }
        cleanOverrides[prodId][docType] = `/api/documents?docId=${fileKey}`;
        modified = true;
      } else {
        cleanOverrides[prodId][docType] = val;
      }
    }
  }

  const resultIndex = { overrides: cleanOverrides, globalAffidavit };
  if (modified && kvUrl && kvToken) {
    await kvSet('minit_doc_overrides', JSON.stringify(resultIndex), kvUrl, kvToken);
  }

  return { resultIndex, modified };
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('Expires', '0');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const { kvUrl, kvToken } = getKvCredentials();

  // GET: Fetch individual document file OR retrieve index map
  if (req.method === 'GET') {
    const docId = req.query.docId as string | undefined;

    // 1. Serving a specific document file by docId
    if (docId) {
      let fileData: string | null = null;
      if (kvUrl && kvToken) {
        fileData = await kvGet(`minit_doc_file:${docId}`, kvUrl, kvToken);
      }
      if (!fileData) {
        fileData = inMemoryDocFilesStore[docId] || null;
      }

      if (!fileData) {
        return res.status(404).json({ error: 'Documento no encontrado' });
      }

      // If it's a base64 Data URL, render as binary file
      if (fileData.startsWith('data:')) {
        const matches = fileData.match(/^data:([^;]+);base64,(.*)$/s);
        if (matches) {
          const contentType = matches[1];
          const base64Str = matches[2];
          const buffer = Buffer.from(base64Str, 'base64');

          res.setHeader('Content-Type', contentType);
          res.setHeader('Content-Length', buffer.length.toString());
          res.setHeader('Content-Disposition', `inline; filename="${docId}.pdf"`);
          res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
          return res.status(200).send(buffer);
        }
      }

      // Proxy via streaming (no size limit — pipes bytes directly without buffering)
      if (fileData.startsWith('http://') || fileData.startsWith('https://')) {
        try {
          const upstream = await fetch(fileData);
          if (!upstream.ok) {
            return res.status(502).json({ error: 'No se pudo obtener el documento del servidor de almacenamiento' });
          }

          const contentType = upstream.headers.get('content-type') || 'application/pdf';
          const contentLength = upstream.headers.get('content-length');

          res.setHeader('Content-Type', contentType);
          if (contentLength) res.setHeader('Content-Length', contentLength);
          res.setHeader('Content-Disposition', `inline; filename="${docId}.pdf"`);
          res.setHeader('Cache-Control', 'public, max-age=3600');

          // Pipe the Cloudinary stream directly to the response — no buffering, no size cap
          const { Readable } = await import('stream');
          const nodeStream = Readable.fromWeb(upstream.body as Parameters<typeof Readable.fromWeb>[0]);
          nodeStream.pipe(res);
          return;
        } catch (e) {
          console.error(`[docId=${docId}] Error al hacer proxy del archivo:`, e);
          return res.status(502).json({ error: 'Error al obtener el documento' });
        }
      }

      // Last resort: log and return useful error info for debugging
      console.error(`[docId=${docId}] Formato inesperado de fileData:`, fileData?.slice(0, 100));
      return res.status(400).json({
        error: 'Formato de documento no válido',
        hint: 'El archivo puede haber sido almacenado con un formato incorrecto. Volvé a subir el documento desde el panel.',
      });
    }

    // 2. Serving document overrides index
    let rawResult: any = null;
    if (kvUrl && kvToken) {
      const kvVal = await kvGet('minit_doc_overrides', kvUrl, kvToken);
      if (kvVal) {
        try {
          rawResult = typeof kvVal === 'string' ? JSON.parse(kvVal) : kvVal;
          if (typeof rawResult === 'string') {
            rawResult = JSON.parse(rawResult);
          }
        } catch (e) {
          console.error('Error parsing minit_doc_overrides KV JSON:', e);
        }
      }
    }

    if (!rawResult) {
      rawResult = inMemoryDocsStore || { overrides: {}, globalAffidavit: null };
    }

    // Sanitize any legacy embedded base64 URLs
    const { resultIndex } = await sanitizeAndOffloadIndex(rawResult, kvUrl, kvToken);
    inMemoryDocsStore = resultIndex;

    return res.status(200).json(resultIndex);
  }

  // POST: Save individual document file OR save document overrides index
  if (req.method === 'POST') {
    try {
      const { docId, fileData, overrides, globalAffidavit } = req.body || {};

      // 1. Save a single document file directly
      if (docId && fileData) {
        inMemoryDocFilesStore[docId] = fileData;
        if (kvUrl && kvToken) {
          await kvSet(`minit_doc_file:${docId}`, fileData, kvUrl, kvToken);
        }
        const documentUrl = `/api/documents?docId=${encodeURIComponent(docId)}`;
        return res.status(200).json({ success: true, url: documentUrl });
      }

      // 2. Save document overrides index
      const { resultIndex } = await sanitizeAndOffloadIndex(
        { overrides: overrides || {}, globalAffidavit: globalAffidavit || null },
        kvUrl,
        kvToken
      );

      inMemoryDocsStore = resultIndex;

      if (kvUrl && kvToken) {
        await kvSet('minit_doc_overrides', JSON.stringify(resultIndex), kvUrl, kvToken);
      }

      return res.status(200).json({
        success: true,
        message: 'Documentos guardados globalmente.',
        data: resultIndex,
      });
    } catch (err: any) {
      console.error('Error saving documents:', err);
      return res.status(500).json({ error: err.message || 'Error al guardar documentos.' });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}

