import { defineStore } from 'pinia'

export const useLoginStore = defineStore('login', {
  state: () => ({
    isLoginSuccess: false,
  }),

  actions: {
    setLoginSuccess(status) {
      this.isLoginSuccess = status
    },
  },
})
