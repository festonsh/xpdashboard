<script setup lang="ts">
definePageMeta({ layout: 'default' })
useHead({ title: "L'Atelier de Beauté | Redefining Elegance" })

const featuredServices = [
  {
    name: 'The Atelier Facial',
    price: '$120',
    description: 'A customized deep-cleansing ritual incorporating lymphatic drainage and premium cellular serums.',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB93-0EqpwEO1YdcoexXwE8Vi9MxOM2xTDQ1ZEW0GZ3JMk5alSsAudYw9YIIl8I9Ix-yw0SOzZidTtHQvTEweMjnQ5fnRrFkzqVHEH3WaqNslCE-F-_4Ea2me-BHg4PLH1XDCz826kx6kucrrHv8MxDxSOsGK7_FUslZoyRfTOQPo816AtUtzjOY6DmIaNfZeosuZm9vYz6Imu59vOt8n6mL6s5JJcLP6b7jejUt5aVObrK2jF9-eMefOE5zInw1nYlrRmdUpEEIcnL',
    featured: false,
  },
  {
    name: 'Zenith Massage',
    price: '$150',
    description: 'A holistic full-body experience blending Swedish techniques with aromatherapy to restore balance.',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBsAhs7PweHTDEdl-DsajCOaMFBbXfAhjpMWRNTkdBkyXLDSyQJXx91eSxshFEUg1OA6LfocydljkbO6q6fpKsqD0_tDm_JgVhXyvPkL2YgXgyAQO47Pp6N2WUaMelPy1t-UeK2tm2zFt5G4xf3oxMVvwsVaNki5qqyhqbeV89rrdlzotU2Kc16g3axZHriprpRjqxej8pSEEZArE9ahoPWw4-KuR30xLYXZGula9YX0fa2RRhx8jmLR8szgKvYnHNZKVtrDoFQPqLL',
    featured: true,
  },
  {
    name: 'Architectural Brows',
    price: '$65',
    description: 'Precision shaping and custom-blended tinting to enhance your natural facial architecture.',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD1wPelvqfcg4ezeFEbdiTMgkfbgevnQgAoUIlDrhPpaGPnn_slc_1KKOXTeZxGF3oe6tR3UH-jJ5IMSrQUfp7_YXkrd-k_5otDYRftkwbfsymxmuAUUNRsZjJE4fqmUKBsombo5tmh_MGPamp2vLLuYS6ePP1kYYk4NVGRwWo01EQxzRnUV1y87znx6LP6GW4I8Cfqfay30xog4gnAmLbhAVEQayrCl2nBsZs3FNA85850l20wXJOgN3JZGyFdNHgabWJ9C-3RaG3U',
    featured: false,
  },
]
</script>

<template>
  <!-- Hero -->
  <section class="relative bg-surface overflow-hidden pt-8">
    <div class="max-w-7xl mx-auto px-12 lg:px-24 grid grid-cols-1 lg:grid-cols-12 items-center gap-12 lg:gap-20 min-h-[600px] py-20">
      <div class="lg:col-span-6 relative z-10">
        <span class="font-label text-xs uppercase tracking-[0.5em] text-primary mb-6 block">The Art of Wellbeing</span>
        <h1 class="font-headline text-5xl md:text-6xl lg:text-7xl text-on-surface leading-[1.05] tracking-tight mb-8">
          Redefining <br /><span class="italic font-normal text-primary">Elegance</span>, One <br />Service at a Time
        </h1>
        <p class="font-body text-secondary text-lg mb-10 max-w-lg">
          Experience a sanctuary where precision meets serenity. Our curated rituals are designed to unveil your natural luminescence.
        </p>
        <div class="flex flex-col sm:flex-row gap-6 items-start">
          <NuxtLink to="/book" class="px-10 py-5 bg-primary text-on-primary font-label tracking-widest text-xs uppercase rounded-xl hover:bg-surface-tint transition-all duration-300 shadow-xl shadow-primary/20">
            Book Now
          </NuxtLink>
          <NuxtLink to="/services" class="px-10 py-5 border border-outline-variant/30 text-on-surface font-label tracking-widest text-xs uppercase rounded-xl hover:bg-surface-container-low transition-all duration-300">
            View Menu
          </NuxtLink>
        </div>
      </div>

      <div class="lg:col-span-6 relative h-[500px] lg:h-[650px] w-full flex items-center justify-center">
        <div class="absolute inset-0 bg-surface-container-low rounded-[100px] -rotate-6 scale-90 opacity-50" />
        <div class="relative w-full h-full overflow-hidden rounded-3xl shadow-2xl">
          <img
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAyidn8kKc1bYsXhi__PCDGyTx26D3I-Ijjc_FEnlbzm8hMmNUUZ76aqYkTSGfqUuHjLDhhufuJ4x0qbSZDowG8Dvf68hJ0msQqOwgURorBTTEb7miQ4HwYznlFQtrsW45U61mFqj4pKmh1ZgqxYPMg5hMXcsjshnGNg_dwYEUCInqeJB4gfq8BbQutjTV3xgWrLno04mlZCvUoIXQjoCzAhdErAayRhV3jOBaFx0TJyhShFkmebO3V4QFPuyQjLkWkCvn0Y2S0jQmA"
            alt="Luxury spa interior"
            class="w-full h-full object-cover"
          />
          <div class="absolute inset-0 bg-gradient-to-t from-background/20 to-transparent" />
        </div>
        <div class="absolute -bottom-8 -left-8 bg-surface-container-lowest p-8 rounded-2xl shadow-xl hidden md:block max-w-[200px] border border-outline-variant/10">
          <span class="material-symbols-outlined text-primary mb-2 block">spa</span>
          <p class="font-headline italic text-sm text-on-surface">"Where soul meets skin."</p>
        </div>
      </div>
    </div>
  </section>

  <!-- Services Grid -->
  <section class="py-32 px-12 max-w-7xl mx-auto">
    <div class="mb-20 flex flex-col md:flex-row justify-between items-end gap-8">
      <div class="max-w-xl">
        <span class="font-label text-xs uppercase tracking-[0.4em] text-primary mb-4 block">Curated Treatments</span>
        <h2 class="font-headline text-4xl md:text-5xl text-on-surface">The Signature Collection</h2>
      </div>
      <p class="font-body text-secondary max-w-xs text-sm leading-relaxed">
        Experience bespoke beauty rituals tailored to your unique essence, using only the finest botanical extracts.
      </p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
      <div
        v-for="svc in featuredServices"
        :key="svc.name"
        class="group flex flex-col h-full p-8 rounded-xl transition-all duration-500 hover:shadow-2xl hover:shadow-stone-200/50"
        :class="svc.featured ? 'bg-surface-container-low md:mt-12' : 'bg-surface-container-lowest'"
      >
        <div class="mb-8 overflow-hidden rounded-md">
          <img :src="svc.img" :alt="svc.name" class="w-full aspect-[4/5] object-cover group-hover:scale-110 transition-transform duration-700" />
        </div>
        <div class="flex-grow">
          <div class="flex justify-between items-baseline mb-4">
            <h3 class="font-headline text-2xl text-on-surface">{{ svc.name }}</h3>
            <span class="font-label text-primary font-medium">{{ svc.price }}</span>
          </div>
          <p class="font-body text-secondary text-sm leading-relaxed mb-8">{{ svc.description }}</p>
        </div>
        <NuxtLink
          to="/book"
          class="w-full py-4 text-center font-label text-xs uppercase tracking-widest rounded-lg transition-all duration-300"
          :class="svc.featured
            ? 'bg-primary text-on-primary hover:bg-primary/90'
            : 'border border-outline-variant/20 hover:border-primary hover:text-primary'"
        >
          Book Treatment
        </NuxtLink>
      </div>
    </div>
  </section>

  <!-- Highlights Bar -->
  <section class="bg-surface-container-high py-20 border-y border-outline-variant/10">
    <div class="max-w-7xl mx-auto px-12 grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-8">
      <div class="flex flex-col items-center text-center">
        <span class="material-symbols-outlined text-primary text-4xl mb-4">auto_awesome</span>
        <h4 class="font-headline text-xl mb-2 text-on-surface">5+ Years Experience</h4>
        <p class="font-body text-secondary text-xs tracking-wide uppercase">Unmatched Professionalism</p>
      </div>
      <div class="flex flex-col items-center text-center border-y md:border-y-0 md:border-x border-outline-variant/20 py-8 md:py-0">
        <span class="material-symbols-outlined text-primary text-4xl mb-4">favorite</span>
        <h4 class="font-headline text-xl mb-2 text-on-surface">1000+ Happy Clients</h4>
        <p class="font-body text-secondary text-xs tracking-wide uppercase">Dedicated to Satisfaction</p>
      </div>
      <div class="flex flex-col items-center text-center">
        <span class="material-symbols-outlined text-primary text-4xl mb-4">workspace_premium</span>
        <h4 class="font-headline text-xl mb-2 text-on-surface">Premium Ingredients</h4>
        <p class="font-body text-secondary text-xs tracking-wide uppercase">Organic &amp; Medical Grade</p>
      </div>
    </div>
  </section>

  <!-- About Preview -->
  <section class="py-32 px-12 overflow-hidden">
    <div class="max-w-7xl mx-auto relative">
      <div class="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
        <div class="md:col-span-7 relative z-0">
          <img
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBM8kageXCOBFqtB3uSaj3zmNujM9EupsvLYKPQkkKUh8e0HLVqlbsNB5eehDCNLF_GqE7BE62wwOqfsdR_7tULp1tlgB1B-htDplkB9AiIGyRy-6kkyj_uP1DfBVAYwgc-dVPXu1DvEUtRXvvGxqfgrY3wIaKzszlhLVqCno7YnIaEgmz2D9VB94klKAYUmNTuggZBp8b3jz3Tv0ERxJHqmnQAniu-JceVoEbxNxKb_upg1USrT_6BHyfEXm_2IhIqtUaDhl9mejaE"
            alt="Founder portrait"
            class="w-full rounded-lg object-cover aspect-video shadow-2xl"
          />
          <div class="absolute -bottom-12 -right-6 md:right-12 bg-surface-container-lowest p-10 md:p-14 shadow-2xl max-w-sm rounded-xl z-20 hidden sm:block">
            <span class="font-label text-primary text-xs uppercase tracking-[0.3em] mb-4 block">Our Vision</span>
            <p class="font-headline italic text-xl text-on-surface leading-relaxed">
              "Beauty is not just about the surface; it's about the feeling of quiet confidence that comes from self-care."
            </p>
          </div>
        </div>
        <div class="md:col-span-5 md:pl-16">
          <h2 class="font-headline text-4xl md:text-6xl mb-8 leading-tight">Meet our <br /><span class="italic font-normal">Artisans</span></h2>
          <p class="font-body text-secondary text-lg leading-loose mb-10">
            Founded by Elena Vance, L'Atelier de Beauté was born from a desire to merge clinical precision with the sensory delight of a luxury spa. Our team of expert practitioners brings over two decades of combined international experience.
          </p>
          <NuxtLink to="/about" class="inline-flex items-center group font-label text-xs uppercase tracking-widest text-primary font-bold">
            Learn More About Us
            <span class="material-symbols-outlined ml-2 transition-transform group-hover:translate-x-2">arrow_right_alt</span>
          </NuxtLink>
        </div>
      </div>
    </div>
  </section>

  <!-- Brand Marquee Strip -->
  <div class="w-full bg-surface-container-highest py-16 overflow-hidden">
    <div class="max-w-7xl mx-auto px-12">
      <p class="text-center font-label text-[10px] tracking-[0.5em] text-outline uppercase mb-12">As Featured In &amp; Partnered With</p>
      <div class="flex flex-wrap justify-center items-center gap-16 md:gap-32 grayscale opacity-50">
        <span class="font-headline text-2xl tracking-tighter italic">VOGUE</span>
        <span class="font-headline text-2xl tracking-widest">ELLE</span>
        <span class="font-headline text-2xl tracking-tighter">Harper's BAZAAR</span>
        <span class="font-headline text-2xl tracking-widest italic">Allure</span>
      </div>
    </div>
  </div>
</template>
