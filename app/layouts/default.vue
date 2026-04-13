<template>
  <div class="bg-background text-on-surface font-body selection:bg-primary-container selection:text-on-primary-container">
    <!-- Marquee banner -->
    <div class="w-full bg-primary text-on-primary py-2 overflow-hidden whitespace-nowrap z-[60] relative">
      <div class="flex animate-marquee">
        <span v-for="n in 6" :key="n" class="font-label text-xs tracking-[0.3em] px-8">
          GRAND OPENING: 20% OFF ALL SERVICES - BOOK NOW
        </span>
      </div>
    </div>

    <!-- Nav sits below marquee -->
    <TopNav />

    <!-- Page content, padded below fixed nav (marquee 32px + nav ~80px) -->
    <main class="pt-[calc(2.5rem+5rem)]">
      <slot />
    </main>

    <SiteFooter />
  </div>
</template>
