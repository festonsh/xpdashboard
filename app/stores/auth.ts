import { defineStore } from 'pinia'

const ADMIN_USER = 'admin'
const ADMIN_PASS = 'festonshkd'
const STORAGE_KEY = 'atelier_admin_auth'

export const useAuthStore = defineStore('auth', () => {
  const authenticated = ref(false)
  const error = ref('')

  // Restore from localStorage on client boot
  function init() {
    if (import.meta.client) {
      authenticated.value = localStorage.getItem(STORAGE_KEY) === '1'
    }
  }

  function login(username: string, password: string): boolean {
    error.value = ''
    if (username.trim() === ADMIN_USER && password === ADMIN_PASS) {
      authenticated.value = true
      if (import.meta.client) {
        localStorage.setItem(STORAGE_KEY, '1')
      }
      return true
    }
    error.value = 'Invalid username or password.'
    return false
  }

  function logout() {
    authenticated.value = false
    if (import.meta.client) {
      localStorage.removeItem(STORAGE_KEY)
    }
  }

  return { authenticated, error, init, login, logout }
})
