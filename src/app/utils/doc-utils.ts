/**
 * Formats a document URL to ensure relative paths have a leading slash.
 */
export function formatDocUrl(url: string): string {
  if (!url) return "";
  const trimmed = url.trim();
  if (
    trimmed.startsWith("http://") ||
    trimmed.startsWith("https://") ||
    trimmed.startsWith("data:") ||
    trimmed.startsWith("blob:") ||
    trimmed.startsWith("/")
  ) {
    return trimmed;
  }
  return "/" + trimmed;
}

/**
 * Safely opens a document (PDF, data URL, external URL, or relative path) in a new tab.
 * Handles data: URLs by converting them to Blobs to prevent Chromium top-frame data URL blocking.
 */
export function openDocument(url: string): void {
  if (!url) return;
  const formatted = formatDocUrl(url);

  if (formatted.startsWith("data:")) {
    try {
      const parts = formatted.split(",");
      const mimeMatch = parts[0].match(/:(.*?);/);
      const mimeType = mimeMatch ? mimeMatch[1] : "application/pdf";
      const base64Data = parts[1];
      const binaryStr = atob(base64Data);
      const len = binaryStr.length;
      const bytes = new Uint8Array(len);

      for (let i = 0; i < len; i++) {
        bytes[i] = binaryStr.charCodeAt(i);
      }

      const blob = new Blob([bytes], { type: mimeType });
      const blobUrl = URL.createObjectURL(blob);
      const newWin = window.open(blobUrl, "_blank");
      if (!newWin) {
        // Fallback if popup blocked
        window.location.href = blobUrl;
      }
    } catch (e) {
      console.error("Error opening base64 document:", e);
      window.open(formatted, "_blank");
    }
  } else {
    window.open(formatted, "_blank", "noopener,noreferrer");
  }
}
