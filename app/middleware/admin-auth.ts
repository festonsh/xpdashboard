export default defineNuxtRouteMiddleware((to) => {
  // Only runs on client — auth is stored in localStorage
  if (import.meta.server) return

  const auth = useAuthStore()
  auth.init()

  if (!auth.authenticated) {
    return navigateTo('/admin/login')
  }
})
