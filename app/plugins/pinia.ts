import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

export default defineNuxtPlugin((nuxtApp) => {
  const pinia = createPinia()
  // Only use localStorage on the client
  if (import.meta.client) {
    pinia.use(piniaPluginPersistedstate)
  }
  nuxtApp.vueApp.use(pinia)
})
