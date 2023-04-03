import { ref } from 'vue'

const ALPHABET =
  'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
const BASE = ALPHABET.length

function encode(quoteNumber: number): string {
  let encoded = ''
  while (quoteNumber > 0) {
    encoded = ALPHABET[quoteNumber % BASE] + encoded
    quoteNumber = Math.floor(quoteNumber / BASE)
  }
  return encoded
}

function decode(shortCode: string): number {
  let decoded = 0
  for (let i = 0; i < shortCode.length; i++) {
    const index = ALPHABET.indexOf(shortCode[i])
    decoded = decoded * BASE + index
  }
  return decoded
}

export function useLinkShortener(domain: string) {
  const shortLink = ref('')

  function createShortLink(quoteNumber: number): string {
    const shortCode = encode(quoteNumber)
    return `${domain}/${shortCode}`
  }

  return {
    shortLink,
    createShortLink,
    decode,
  }
}
