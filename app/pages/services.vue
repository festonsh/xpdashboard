<script setup lang="ts">
definePageMeta({ layout: 'default' })
useHead({ title: "Services | L'Atelier de Beauté" })

const services = [
  {
    num: '01',
    name: 'Signature HydraFacial',
    price: '$225',
    duration: '60 min',
    description: 'Our premier resurfacing treatment. Using patented technology to deeply cleanse and nourish the skin with super-serums filled with antioxidants and peptides for an immediate, long-lasting glow.',
    detail: 'Advanced vortex technology to cleanse, extract, and hydrate simultaneously.',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAS4D20uGQMDazxPE3f7onJVM0pWqMx-02O-zTwk3kU-PKP9FBVPtxtA6j60VOxjEpV4SgAGYDx_9UazmySRAz2H54GnSmigbMSVK-RBFoF-a4D1xLFStdCnnIPvF7H5pjTo_fhCg4bT7WUPOAreM6I4TMCL023PRbgVCovuapHUWpD5xmOpyVspjUzPHmPRVG0RXHAtJXqjTyuV_SDp6oRWFCn3K8FU-r68G5uKfiFKucdcrQFi9zXn4eGsRozU-N9StPG4Lraxeh7',
    bg: 'bg-white',
    reverse: false,
  },
  {
    num: '02',
    name: 'Sculpting Gua Sha Facial',
    price: '$185',
    duration: '75 min',
    description: 'An ancestral technique modernized. This facial uses hand-carved stone tools to release facial tension, stimulate lymphatic drainage, and lift the contours of the face for a refined profile.',
    detail: '',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD2VcXdqX16DZnNGx8yuygr_yQN_zvLheZWNKImKI3C6HhM3j5EnUuKefBgDk8VHYZ3uzM1PgjKtPsZsVtaR-_FRK28qMpLmMHzT274XvoLc_uJQi9fkQOWOe2bVPWEL9muHjiY4w18r1TqhH5Q3uqOxC6JTanqacwRB-vTTg177MaFTmBPfZ2vDbkc23LpdPbYWGnTcFCzUJ1nqIQwOY2xmr-P6B1TozDmZRNFrQBw8v0mSknXdGV7bUIRgy-BVHtXsirk5mbzgT3L',
    bg: 'bg-surface-container-low',
    reverse: true,
  },
  {
    num: '03',
    name: 'The Deep Tissue Renewal',
    price: '$160',
    duration: '90 min',
    description: 'Designed for chronic tension and muscle recovery. Our therapists utilize slow, firm strokes and concentrated pressure to reach deeper layers of muscle and connective tissue.',
    detail: '',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDbNsPPjecQq5qEU61mCzngd4F_IhFEHetJX9zuT2s5J32702Q4c9V9VLRDHLuHZd9JiSB-zWw8xPo0qIyBRul_6CAqoI1wOEWtTNhm6eH1aeO9GWCG8Sz5khXWKm2FzD6cZxyMAOa3wyc_eQRcNaa0jIbcihfYEZwFlTsoB_JlSbZIod5Dpsl0nuqjLBD8GlzJ8FWEfJFIfuwXRAxqRsnqJB8QRXQ5LUtm0wzlGO4bJvKu3oL8NcqATOS3JQrRYVhVLGzqAsdap-8z',
    bg: 'bg-white',
    reverse: false,
  },
  {
    num: '04',
    name: 'Vitamin C Brightening Infusion',
    price: '$145',
    duration: '45 min',
    description: 'A high-potency antioxidant treatment that combats environmental damage and dullness. Includes a brightening peel and professional-grade infusion of pure Vitamin C for luminosity.',
    detail: '"The ultimate antidote to urban fatigue."',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuADmWPa2p_ZMBZHyAN57oXSHekz6zL5qqtvatgdlre1nkCe6dtRKvUjO5dLqP3ZZ1cS2Auov7hQh5ioYnxihTqYDwXPsVRQ9vb9BPeF5Fl_LHsA28jR4_-eIaBWGjJtN2-yPQxuDhH-UdqAkaOHabzcIbVjPZ1lAzGSr-T3SHQCiJUGu3pKeaI5gKcfNb8wNsfBqi4ii4Sy_wjvmFA5jJIU1mo9pgKW_lEqcTEloBWtn-y2aud40Q_nItog2IltiiJYOHK-JedZtfIo',
    bg: 'bg-primary/5',
    reverse: true,
  },
  {
    num: '05',
    name: 'The Atelier Manicure',
    price: '$85',
    duration: '60 min',
    description: 'Not just a color service, but a restoration. Our signature manicure includes an organic sugar scrub, deep hydration mask with warm towels, and meticulous cuticle care.',
    detail: '',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBAHmJDaPxfsY2kx45N3b4evEHUrlOPVTGgz3JC6l53ZN3SqwlIT5ZJSrxpkmi9seHSxL1NnI26NNjbffnIYmmax-XgRXToUlRdfpLw311HqmrlO_S-HELcFC0jQs-0taIabOclLbAwAweXVRODm5ozgGGne01MYlTeoLqCCsRZGfhSsJ_0k49y_JTsXwzbTi_L3lURiPxowpMoYFWZeD4K9IFu1EblxTp76ClHTGfRqzM9iFJ9iUMZow8tIephpIoHl01IMU6OQZkY',
    bg: 'bg-white',
    reverse: false,
  },
]
</script>

<template>
  <!-- Page Header -->
  <header class="pt-16 pb-24 px-12 max-w-7xl mx-auto">
    <div class="flex flex-col md:flex-row md:items-end justify-between gap-8">
      <div class="max-w-2xl">
        <span class="font-label text-xs uppercase tracking-[0.3em] text-primary mb-4 block">The Art of Care</span>
        <h1 class="text-5xl md:text-7xl font-headline tracking-tight text-on-surface leading-tight">Curated Treatments</h1>
      </div>
      <p class="text-on-surface-variant font-body text-lg max-w-md italic">
        A sanctuary dedicated to the precise harmony of clinical excellence and soulful relaxation.
      </p>
    </div>
  </header>

  <main class="space-y-0 pb-48">
    <section
      v-for="svc in services"
      :key="svc.num"
      :class="[svc.bg, 'py-24']"
    >
      <div class="px-12 max-w-7xl mx-auto">
        <div class="grid grid-cols-1 md:grid-cols-12 gap-16 items-center">

          <!-- Image -->
          <div
            class="relative group"
            :class="svc.reverse ? 'md:col-span-7 md:order-2' : 'md:col-span-7'"
          >
            <div class="aspect-[4/3] overflow-hidden rounded-md bg-surface-variant">
              <img :src="svc.img" :alt="svc.name" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
            </div>
            <div v-if="svc.detail" class="absolute -bottom-8 -right-8 md:right-[-5%] bg-surface-container-lowest p-10 shadow-xl max-w-xs rounded-xl hidden lg:block">
              <span class="block text-[4rem] font-headline text-primary/10 leading-none mb-2">{{ svc.num }}</span>
              <p class="text-on-surface font-body text-sm leading-relaxed tracking-wide">{{ svc.detail }}</p>
            </div>
          </div>

          <!-- Content -->
          <div
            class="space-y-8"
            :class="svc.reverse ? 'md:col-span-5 md:order-1' : 'md:col-span-5'"
          >
            <h2 class="text-4xl font-headline text-on-surface">{{ svc.name }}</h2>
            <p class="text-on-surface-variant leading-loose font-body">{{ svc.description }}</p>
            <div class="flex items-center gap-12 py-6 border-y border-stone-200/50">
              <div>
                <span class="block text-[10px] uppercase tracking-widest text-outline mb-1">Investment</span>
                <span class="text-2xl font-body text-on-surface">{{ svc.price }}</span>
              </div>
              <div>
                <span class="block text-[10px] uppercase tracking-widest text-outline mb-1">Duration</span>
                <span class="text-2xl font-body text-on-surface">{{ svc.duration }}</span>
              </div>
            </div>
            <NuxtLink
              to="/book"
              class="block w-full py-5 bg-primary text-on-primary rounded-xl font-medium tracking-wide hover:bg-primary-container hover:text-on-primary-container transition-all duration-300 uppercase text-xs text-center"
            >
              Book Now
            </NuxtLink>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>
