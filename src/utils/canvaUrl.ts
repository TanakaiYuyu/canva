const CANVA_URL_PATTERN = /^https:\/\/(www\.)?canva\.com\//i

/**
 * Returns true if the string looks like a valid Canva shareable or embed URL.
 */
export function isValidCanvaUrl(url: string): boolean {
  const trimmed = url.trim()
  if (!trimmed) return false
  try {
    const u = new URL(trimmed)
    return u.protocol === 'https:' && CANVA_URL_PATTERN.test(trimmed)
  } catch {
    return false
  }
}
