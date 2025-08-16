import VueTelInput from 'vue-tel-input'

export default defineNuxtPlugin((nuxtApp) => {
  const VueTelInputOptions = {
    mode: 'international',
  }
  //@ts-expect-error - VueTelInput gives a ts error
  nuxtApp.vueApp.use(VueTelInput, VueTelInputOptions)
})
