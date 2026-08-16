/**
 * Opens an external URL from a click handler.
 *
 * Anchors with target="_blank" are occasionally refused on mobile Safari,
 * which leaves a tap doing nothing at all. Trying the new tab explicitly and
 * falling back to navigating in place means one tap always goes somewhere.
 */
export function openExternal(event: React.MouseEvent, url: string) {
  event.preventDefault()
  const opened = window.open(url, '_blank', 'noopener,noreferrer')
  if (!opened) window.location.href = url
}
