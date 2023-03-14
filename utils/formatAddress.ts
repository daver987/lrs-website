export function formatAddress(name: string, address: string) {
  return address.includes(name) ? address : `${name}, ${address}`
}
