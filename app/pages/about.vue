<script setup lang="ts">
definePageMeta({ layout: 'default' })
useHead({ title: "About Us | L'Atelier de Beauté" })

const approach = [
  {
    icon: 'auto_awesome',
    title: 'Curated Precision',
    text: 'Every treatment is custom-tailored to your skin\'s biological rhythm, moving beyond generic protocols to bespoke care.',
  },
  {
    icon: 'science',
    title: 'Clean Innovation',
    text: 'We combine ancient botanical wisdom with clinical breakthroughs, ensuring potency without compromise on health.',
  },
  {
    icon: 'spa',
    title: 'Sensory Stillness',
    text: 'Our space is designed to be a sanctuary from the digital noise, a place where time slows down and restoration begins.',
  },
]

const gallery = [
  {
    src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC9_Ip0Tps4QKvfXVw834PNslK9ebJdF9S5ef6tyeiHPm85Emm6Gf7Ly8smKlP1b6ekX6UJGm4Jy8WlUvk9b9GaYTgzdj7zu8Aaf6q8oQ-JF30dLPsus9H37_TuT5vLZdlQH-P87CZLjRAK7Av3KhFoVIJinme3pGnnGkjD8qYPhA-xztBWbwaSnF1Pk1c4DzClYBpYh7ZXK_2eJFjcK1gdyX85iCarEquaX_Hcy5M1bFWqmLjLvaVnzIFI6suE7sLDh-htkE2vHbQy',
    offset: true,
  },
  {
    src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAg0KlC1m8eEAI4uo3yVmyk-bLcVknrNfbKfMX65ClO2Pe4BkQKFKAltVastpqLoiZeslXLd_D6HnpDRM-DBUdcpQk_WcilC12qBz8kIYWtJd60NAVO80JbCVGKLCQXS90rMk-uQaXoDDVhkbU-JEZ3FAI1Fu99FZmFyIScykXBEX8DNf_1m0_mC56HgSrqqu4uk2oKycWx2aRhtpBSUfYQLQzgeHOLtGdgYFB1XPc2t_vyNEpt7rLMARpa882PGPjrLDyD3CzLdHId',
    offset: true,
  },
  {
    src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBwDjulrwQjl8nIq7HO9_dIRu4RhwnLjGQBW5HQEaxkX3kEiNPJXtmNhyF0Wdk1rBXfa7CGXXQ1UrFLKv6a8km_DigylRMvkfV97pEzLz4AdfhdnPekNXsqAlDcXf12be8o50z-NrzK8G58LblNr4utjwwNf7PYh3IMdpxywh8TZ6LwbliO-RvwbAAle5Hs3qBeOWGTjH2aDeJ-NH7CSByO5qMAqFfQnWkRgptvxJ4X2vj49jcvEl1bRZuntXelIM9mqnUa-uB10Xhu',
    offset: false,
  },
  {
    src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBz1k71Q4oIILAt-M1tKxW8lyOYReOE7_Z7WcKV_KvPi5y0jFNglBl8A0NrNQqOgW-fp1mavIoZFBFweoWlgCZQLggekxQBOSjPCdqtwTcRCB6hvE4ARYZL5G26h5_K_hEBBxmt_MrUFxg9DhmTsHpvGrmx_rP9-SwN5gpCUISvGBDW3SnW-xHdVpUbAzwhyfdthbHLnSC-1RqFmGgKtprxOHyMEUttPt0hEW__9ppptVbrowiA_o7cEC9GDRp0KkZlI45gkklqcbnn',
    offset: false,
  },
]
</script>

<template>
  <!-- Heritage Section -->
  <section class="px-12 py-24 max-w-7xl mx-auto">
    <div class="grid grid-cols-1 md:grid-cols-12 gap-16 items-center">
      <div class="md:col-span-5 order-2 md:order-1">
        <h2 class="text-xs tracking-[0.2em] text-primary mb-8 uppercase font-label">Our Heritage</h2>
        <h1 class="font-serif text-5xl md:text-7xl leading-tight text-on-surface mb-12">The Pursuit of Timeless Elegance.</h1>
        <div class="space-y-6 text-on-surface-variant leading-relaxed text-lg">
          <p>Founded on the belief that beauty is an intimate dialogue between art and science, L'Atelier de Beauté was born in a small, sun-drenched studio with a singular vision: to treat every face like a unique canvas.</p>
          <p>We rejected the industrialization of beauty, choosing instead to return to the meticulous roots of the "atelier" — a workshop where craft is prioritized over speed, and mastery is the only metric of success.</p>
        </div>
      </div>
      <div class="md:col-span-7 order-1 md:order-2 relative">
        <div class="aspect-[4/5] bg-surface-container-low overflow-hidden rounded-lg">
          <img
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBTbSoRIcRbZmDZUe1rIEwLQJpfjRnD_CeqDhhYtPL-BiVH1-NeFzkUf3vVspzAL3tsozKbxycNG877TOfRcXFNuC1VQ8gBo_-nv5NmTQKnMR_fWa0I-9zT1AbopDwfAPYGOj045jWxbMQUgPHfrRHSo5EK9Kn-0cKfwS7YGZ5d5DY6NGBwS6fd7GC_T7mZof8b-J49aSj0s3vMECQRlxLYn8HazRO3oujD1PqKD_6tIKmt6u-gtSN7O0cmlY_wGb-SWMi0ifqta5YH"
            alt="Founder portrait"
            class="w-full h-full object-cover grayscale brightness-105 contrast-90"
          />
        </div>
        <div class="absolute -bottom-8 -left-8 p-12 bg-surface-container-lowest shadow-2xl max-w-xs hidden lg:block">
          <p class="font-serif italic text-2xl text-primary">"Beauty is not a standard, it is an atmosphere."</p>
          <p class="mt-4 text-xs tracking-widest uppercase text-outline">— Elena Vance, Founder</p>
        </div>
      </div>
    </div>
  </section>

  <!-- Approach Section -->
  <section class="bg-surface-container-low py-32">
    <div class="max-w-5xl mx-auto px-12 text-center">
      <h2 class="font-serif text-4xl md:text-5xl mb-16 text-on-surface">The Atelier Approach</h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-12">
        <div v-for="item in approach" :key="item.title" class="space-y-6 group">
          <div class="w-16 h-16 bg-surface-container-highest rounded-full flex items-center justify-center mx-auto transition-colors group-hover:bg-primary-container">
            <span class="material-symbols-outlined text-primary">{{ item.icon }}</span>
          </div>
          <h3 class="font-serif text-xl">{{ item.title }}</h3>
          <p class="text-sm text-on-surface-variant leading-relaxed">{{ item.text }}</p>
        </div>
      </div>
    </div>
  </section>

  <!-- Gallery + Copy Section -->
  <section class="px-12 py-32 max-w-7xl mx-auto">
    <div class="flex flex-col md:flex-row items-center gap-24">
      <div class="w-full md:w-1/2">
        <div class="grid grid-cols-2 gap-4">
          <div class="space-y-4 pt-12">
            <img :src="gallery[0].src" class="w-full h-80 object-cover rounded-lg" alt="Premium skincare" />
            <img :src="gallery[1].src" class="w-full h-64 object-cover rounded-lg" alt="Spa interior" />
          </div>
          <div class="space-y-4">
            <img :src="gallery[2].src" class="w-full h-64 object-cover rounded-lg" alt="Treatment preparation" />
            <img :src="gallery[3].src" class="w-full h-80 object-cover rounded-lg" alt="Facial treatment" />
          </div>
        </div>
      </div>
      <div class="w-full md:w-1/2 space-y-10">
        <h2 class="font-serif text-4xl md:text-5xl text-on-surface leading-tight">Mastering the Art of Radiance.</h2>
        <p class="text-on-surface-variant text-lg leading-relaxed">Our practitioners are more than therapists; they are artisans trained in the delicate balance of touch and technology. Each year, our team travels to the global capitals of beauty — Paris, Seoul, and Tokyo — to bring back the most refined techniques and efficacious formulations.</p>
        <NuxtLink to="/contact" class="inline-flex items-center group text-primary font-medium tracking-widest uppercase text-xs">
          Get in touch
          <span class="material-symbols-outlined ml-2 transition-transform group-hover:translate-x-2">arrow_right_alt</span>
        </NuxtLink>
      </div>
    </div>
  </section>

  <!-- CTA -->
  <section class="bg-primary text-on-primary py-32 text-center">
    <div class="max-w-3xl mx-auto px-6">
      <h3 class="font-serif text-3xl md:text-5xl mb-8">Begin Your Ritual.</h3>
      <p class="mb-12 text-on-primary/80 font-light text-lg">We invite you to experience the difference of intentional beauty. Reserve your session at our flagship atelier.</p>
      <NuxtLink to="/book" class="bg-on-primary text-primary px-10 py-5 rounded-xl font-medium tracking-widest uppercase text-xs hover:bg-primary-container hover:text-on-primary-container transition-all shadow-xl inline-block">
        Book Your Experience
      </NuxtLink>
    </div>
  </section>
</template>
