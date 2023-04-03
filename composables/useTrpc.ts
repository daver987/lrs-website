import { useNuxtApp } from '#app'

export const useTrpc = () => useNuxtApp().$client
