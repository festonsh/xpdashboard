<script setup lang="ts">
const route = useRoute()
const router = useRouter()
const auth = useAuthStore()
const bookingsStore = useBookingsStore()

const pendingCount = computed(() =>
  bookingsStore.bookings.filter(b => b.status === 'pending').length
)

const navItems = [
  { label: 'Dashboard', to: '/admin', icon: 'dashboard' },
  { label: 'Bookings', to: '/admin/bookings', icon: 'calendar_today', badge: pendingCount },
]

function logout() {
  auth.logout()
  router.push('/admin/login')
}
</script>

<template>
  <aside class="h-screen w-64 fixed left-0 top-0 border-r border-stone-200/50 dark:border-stone-800/50 bg-stone-50 dark:bg-stone-950 flex flex-col py-8 px-4 z-50">
    <div class="mb-12 px-4">
      <NuxtLink to="/" class="text-lg font-bold text-stone-900 dark:text-stone-50 tracking-tight block leading-tight">
        <span class="text-primary">SH</span> Nails &amp; Beauty
      </NuxtLink>
      <p class="font-sans text-[10px] uppercase tracking-widest text-stone-500 mt-1">Admin Workspace</p>
    </div>

    <nav class="flex-1 space-y-1">
      <NuxtLink
        v-for="item in navItems"
        :key="item.to"
        :to="item.to"
        class="flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ease-out font-sans text-xs uppercase tracking-widest"
        :class="route.path === item.to
          ? 'bg-stone-200/50 dark:bg-stone-800/50 text-stone-900 dark:text-stone-50 font-semibold'
          : 'text-stone-500 dark:text-stone-400 hover:bg-stone-100 dark:hover:bg-stone-900'"
      >
        <span class="material-symbols-outlined">{{ item.icon }}</span>
        <span class="flex-1">{{ item.label }}</span>
        <!-- Pending badge -->
        <span
          v-if="item.badge && item.badge.value > 0"
          class="min-w-[1.25rem] h-5 px-1 bg-primary text-on-primary text-[9px] font-bold rounded-full flex items-center justify-center"
        >{{ item.badge.value }}</span>
      </NuxtLink>
    </nav>

    <div class="pt-8 border-t border-stone-200/30">
      <!-- User row + logout -->
      <div class="flex items-center gap-3 px-4 pt-2">
        <div class="w-9 h-9 rounded-full overflow-hidden bg-surface-container-high ring-2 ring-primary-container/20 shrink-0">
          <img
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCkzaBLirQYndYrjPI0jk-K5ISv329yJ2ql0798ZitL1_8NjhUfYuH_qdym3OPWWLx-YfARsA-eUY8IJaoQSY6a-XqjNlYiPEc4Vokeq2lMUliJkuf8zHCvDs8LjhmjF8uY3-x3_-7Aifd5c6aPVzPGhSBVGt1iFmIAYtIeXo2jwDQreVrUPbqqnUnZjLNN3s_zse64I3IfCNewrUp6lEfa9CcVERG_phpBYQxoIvm2lf6f1Fv3I7E9m5HIoUz5PRqvOw6Zv1csiM8r"
            alt="Admin"
            class="w-full h-full object-cover"
          />
        </div>
        <div class="overflow-hidden flex-1">
          <p class="text-xs font-semibold text-stone-900 dark:text-stone-50 truncate">Mme. Vivienne</p>
          <p class="text-[10px] text-stone-500 truncate">Beauty Director</p>
        </div>
        <button
          class="text-stone-400 hover:text-error transition-colors shrink-0"
          title="Sign out"
          @click="logout"
        >
          <span class="material-symbols-outlined text-sm">logout</span>
        </button>
      </div>
    </div>
  </aside>
</template>
