<script setup lang="ts">
const route = useRoute()
const mobileOpen = ref(false)

const links = [
  { label: 'Services', to: '/services' },
  { label: 'Book Appointment', to: '/book' },
  { label: 'About Us', to: '/about' },
  { label: 'Contact', to: '/contact' },
]
</script>

<template>
  <nav class="fixed top-0 w-full z-50 bg-stone-50/80 dark:bg-stone-900/80 backdrop-blur-xl shadow-sm shadow-stone-200/20 dark:shadow-stone-950/40">
    <div class="flex justify-between items-center px-12 py-6 w-full max-w-[1920px] mx-auto">
      <NuxtLink to="/" class="font-serif text-2xl tracking-tighter text-stone-900 dark:text-stone-50">
        L'Atelier de Beauté
      </NuxtLink>

      <div class="hidden md:flex items-center space-x-12">
        <NuxtLink
          v-for="link in links"
          :key="link.to"
          :to="link.to"
          class="font-serif tracking-wide text-sm transition-colors duration-300 ease-in-out"
          :class="route.path === link.to
            ? 'text-stone-900 dark:text-stone-50 border-b border-stone-400 dark:border-stone-500 pb-0.5'
            : 'text-stone-500 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100'"
        >
          {{ link.label }}
        </NuxtLink>
      </div>

      <div class="flex items-center space-x-6">
        <button class="text-stone-700 dark:text-stone-300 hover:text-stone-900 transition-colors">
          <span class="material-symbols-outlined">language</span>
        </button>
        <button class="md:hidden text-stone-700" @click="mobileOpen = !mobileOpen">
          <span class="material-symbols-outlined">{{ mobileOpen ? 'close' : 'menu' }}</span>
        </button>
      </div>
    </div>

    <!-- Mobile menu -->
    <div v-if="mobileOpen" class="md:hidden bg-stone-50 dark:bg-stone-900 border-t border-stone-200/20 px-6 pb-6 space-y-4">
      <NuxtLink
        v-for="link in links"
        :key="link.to"
        :to="link.to"
        class="block font-serif text-sm text-stone-700 dark:text-stone-300 py-2"
        @click="mobileOpen = false"
      >
        {{ link.label }}
      </NuxtLink>
    </div>
  </nav>
</template>
