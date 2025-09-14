export function useImageFallback() {
  const fallback = '/images/placeholder.svg'
  const onImgError = (e: Event) => {
    const el = e.target as HTMLImageElement | null
    if (!el) return
    if (el.src.endsWith('placeholder.svg')) return
    el.src = fallback
  }
  return { onImgError, fallback }
}
