import { computed } from 'vue'
import type { Ref } from 'vue'

export const useBackgroundImage = (
  imageUrl: Ref<string>,
  _options: any = {}
) => {
  return computed(() => ({ backgroundImage: `url('${imageUrl.value}')` }))
}
