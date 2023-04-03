import VueTelInput from 'vue-tel-input'
export default defineNuxtPlugin((nuxtApp) => {
  const VueTelInputOptions = {
    mode: 'international',
  }
  nuxtApp.vueApp.use(VueTelInput, VueTelInputOptions)
})
