import VueTelInput from 'vue-tel-input'
export default defineNuxtPlugin((nuxtApp) => {
  const VueTelInputOptions = {
    mode: 'international',
  }
  //@ts-ignore
  nuxtApp.vueApp.use(VueTelInput, VueTelInputOptions)
})
