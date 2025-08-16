import { defineStore, acceptHMRUpdate } from 'pinia'
import { v4 as uuidv4 } from 'uuid'

export const useUserStore = defineStore('user', {
  state: () => {
    return {
      user_id: '',
      fullName: '',
    }
  },
  actions: {
    setUserId(user_id: string) {
      this.user_id = user_id
      if (typeof window !== 'undefined') {
        window.localStorage.setItem('hpl_user_id', user_id)
      }
    },

    setFullName(firstName: string | null, lastName: string | null) {
      this.fullName = `${firstName} ${lastName}`
      console.log('Set Full Name')
    },

    getUserId() {
      if (typeof window !== 'undefined') {
        const user_id = window.localStorage.getItem('hpl_user_id')
        if (user_id) {
          this.user_id = user_id
        } else {
          const newUserId = generateUuid()
          this.setUserId(newUserId)
        }
      }

      return this.user_id
    },
  },
})

function generateUuid() {
  const newUserId = uuidv4()
  return newUserId.toString()
}

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot))
}
