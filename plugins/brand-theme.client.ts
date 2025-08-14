export default defineNuxtPlugin(() => {
  const appConfig = useAppConfig()

  const palette = appConfig.brand?.ui?.colors?.brand as Record<string, string>
  if (!palette) return

  const root = document.documentElement

  function hexToRgbTuple(hex: string): [number, number, number] | null {
    const cleaned = hex.replace('#', '')
    const full =
      cleaned.length === 3
        ? cleaned
            .split('')
            .map((c) => c + c)
            .join('')
        : cleaned
    const int = parseInt(full, 16)
    if (Number.isNaN(int)) return null
    return [(int >> 16) & 255, (int >> 8) & 255, int & 255]
  }

  const shadeMap: Record<string, string> = {
    '50': '50',
    '100': '100',
    '200': '200',
    '300': '300',
    '400': '400',
    DEFAULT: '500',
    '600': '600',
    '700': '700',
    '800': '800',
    '900': '900',
  }

  Object.entries(shadeMap).forEach(([key, out]) => {
    const value = palette[key as keyof typeof palette]
    if (!value) return
    // Hex var for direct usage
    root.style.setProperty(`--brand-${out}`, value)
    const rgb = hexToRgbTuple(value)
    if (rgb) {
      root.style.setProperty(
        `--brand-${out}-rgb`,
        `${rgb[0]} ${rgb[1]} ${rgb[2]}`
      )
    }
  })
})
