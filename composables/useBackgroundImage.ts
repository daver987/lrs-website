import { computed, Ref } from 'vue'
export const useBackgroundImage = (
  $img: Function,
  imageUrl: Ref<string>,
  options: any = { width: '100%' }
) => {
  const backgroundImage = computed(() => {
    const imgUrl = $img(imageUrl.value, options)
    return { backgroundImage: `url('${imgUrl}')` }
  })
  return ref(backgroundImage)
}
