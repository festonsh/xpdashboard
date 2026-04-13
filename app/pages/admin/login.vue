<script setup lang="ts">
definePageMeta({ layout: false })
useHead({ title: "Admin Login | SH Nails & Beauty" })

const auth = useAuthStore()
const router = useRouter()

// Already logged in → go straight to dashboard
onMounted(() => {
  auth.init()
  if (auth.authenticated) router.replace('/admin')
})

const username = ref('')
const password = ref('')
const showPassword = ref(false)
const submitting = ref(false)

async function handleLogin() {
  submitting.value = true
  // Small delay for UX feel
  await new Promise(r => setTimeout(r, 400))
  const ok = auth.login(username.value, password.value)
  submitting.value = false
  if (ok) router.replace('/admin')
}
</script>

<template>
  <div class="h-screen overflow-hidden bg-background flex">
    <!-- Left: decorative panel -->
    <div class="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-on-surface">
      <img
        src="https://images.unsplash.com/photo-1604654894610-df63bc536371?w=900&auto=format&fit=crop"
        alt="Nail art fun"
        class="w-full h-full object-cover object-center opacity-75"
      />
      <div class="absolute inset-0 bg-gradient-to-t from-on-surface/80 via-on-surface/30 to-transparent" />
      <div class="absolute bottom-10 left-10 right-10">
        <p class="font-serif italic text-2xl text-white leading-relaxed mb-3">
          "I came for a manicure. I stayed for the drama. 💅"
        </p>
        <p class="text-white/60 text-xs tracking-[0.3em] uppercase">SH Nails &amp; Beauty — Admin Workspace</p>
      </div>
    </div>

    <!-- Right: login form -->
    <div class="flex-1 flex flex-col items-center justify-center px-8">
      <div class="w-full max-w-sm">
        <!-- Logo -->
        <div class="mb-8 text-center">
          <NuxtLink to="/" class="text-2xl font-bold text-stone-900 tracking-tight">
            <span class="text-primary">SH</span> Nails &amp; Beauty
          </NuxtLink>
          <p class="text-[10px] uppercase tracking-[0.3em] text-stone-400 mt-2">Admin Access</p>
        </div>

        <!-- Form -->
        <form class="space-y-6" @submit.prevent="handleLogin">
          <div class="space-y-2">
            <label class="block text-[10px] uppercase tracking-widest text-outline font-semibold">Username</label>
            <input
              v-model="username"
              type="text"
              placeholder="admin"
              autocomplete="username"
              required
              class="w-full bg-transparent border-0 border-b border-outline-variant/40 py-3 focus:ring-0 focus:border-primary transition-colors text-on-surface placeholder:text-stone-300 text-sm"
            />
          </div>

          <div class="space-y-2">
            <label class="block text-[10px] uppercase tracking-widest text-outline font-semibold">Password</label>
            <div class="relative">
              <input
                v-model="password"
                :type="showPassword ? 'text' : 'password'"
                placeholder="••••••••••"
                autocomplete="current-password"
                required
                class="w-full bg-transparent border-0 border-b border-outline-variant/40 py-3 pr-10 focus:ring-0 focus:border-primary transition-colors text-on-surface placeholder:text-stone-300 text-sm"
              />
              <button
                type="button"
                class="absolute right-0 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-700 transition-colors"
                @click="showPassword = !showPassword"
              >
                <span class="material-symbols-outlined text-sm">{{ showPassword ? 'visibility_off' : 'visibility' }}</span>
              </button>
            </div>
          </div>

          <!-- Error -->
          <Transition name="fade">
            <div v-if="auth.error" class="flex items-center gap-2 text-error text-xs">
              <span class="material-symbols-outlined text-sm">error</span>
              {{ auth.error }}
            </div>
          </Transition>

          <button
            type="submit"
            class="w-full py-4 bg-primary text-on-primary rounded-xl font-label text-xs uppercase tracking-[0.2em] transition-all hover:bg-surface-tint shadow-lg shadow-primary/20 disabled:opacity-50 flex items-center justify-center gap-2"
            :disabled="submitting"
          >
            <span v-if="submitting" class="material-symbols-outlined text-sm animate-spin">progress_activity</span>
            {{ submitting ? 'Signing in…' : 'Sign In' }}
          </button>
        </form>

        <p class="text-center text-[10px] text-stone-400 mt-6">
          <NuxtLink to="/" class="hover:text-primary transition-colors">← Back to website</NuxtLink>
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.fade-enter-active, .fade-leave-active { transition: opacity 0.2s; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
.animate-spin { animation: spin 1s linear infinite; }
@keyframes spin { to { transform: rotate(360deg); } }
</style>
