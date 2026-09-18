import type { VercelRequest, VercelResponse } from '@vercel/node';

// Memory fallback for serverless session execution
let inMemoryDocsStore: any = null;

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

  // GET: Retrieve documents configuration
  if (req.method === 'GET') {
    if (kvUrl && kvToken) {
      try {
        const kvRes = await fetch(`${kvUrl}/get/minit_doc_overrides`, {
          headers: { Authorization: `Bearer ${kvToken}` },
        });
        const kvData = await kvRes.json();
        if (kvData.result) {
          const parsed = typeof kvData.result === 'string' ? JSON.parse(kvData.result) : kvData.result;
          return res.status(200).json(parsed);
        }
      } catch (e) {
        console.error('Error reading from Vercel KV:', e);
      }
    }

    return res.status(200).json(inMemoryDocsStore || { overrides: {}, globalAffidavit: null });
  }

  // POST: Save documents configuration
  if (req.method === 'POST') {
    try {
      const { overrides, globalAffidavit } = req.body;
      
      // Store in memory
      inMemoryDocsStore = { overrides, globalAffidavit };

      if (kvUrl && kvToken) {
        await fetch(`${kvUrl}/set/minit_doc_overrides`, {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${kvToken}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(JSON.stringify({ overrides, globalAffidavit })),
        });
      }

      return res.status(200).json({ success: true, message: 'Documentos guardados globalmente.' });
    } catch (err: any) {
      console.error('Error saving documents:', err);
      return res.status(500).json({ error: err.message || 'Error al guardar documentos.' });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
