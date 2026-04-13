// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  runtimeConfig: {
    public: {
      wpApiUrl: process.env.NUXT_PUBLIC_WP_API_URL ?? 'https://atelier-wp.ddev.site/wp-json/atelier/v1',
      wpApiKey: process.env.NUXT_PUBLIC_WP_API_KEY ?? '',
    },
  },
  modules: [
    '@nuxtjs/tailwindcss',
  ],
  imports: {
    dirs: ['stores'],
    imports: [
      { from: 'pinia', name: 'storeToRefs' },
      { from: 'pinia', name: 'defineStore' },
    ],
  },
  css: ['~/assets/css/main.css'],
  app: {
    head: {
      link: [
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Noto+Serif:ital,wght@0,400;0,700;1,400&family=Inter:wght@300;400;500;600&display=swap',
        },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap',
        },
      ],
    },
  },
})
