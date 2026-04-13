<script setup lang="ts">
definePageMeta({ layout: 'default' })
useHead({ title: "Contact | L'Atelier de Beauté" })

const store = useContactStore()
const { form, submitted, submitting } = storeToRefs(store)

const services = [
  'The Atelier Facial', 'Zenith Massage', 'Architectural Brows',
  'Signature HydraFacial', 'Sculpting Gua Sha Facial', 'Deep Tissue Renewal',
  'Vitamin C Brightening Infusion', 'The Atelier Manicure', 'General Inquiry',
]
</script>

<template>
  <!-- Hero -->
  <section class="max-w-7xl mx-auto px-6 md:px-12 pt-16 mb-32">
    <div class="relative grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
      <div class="lg:col-span-7 relative z-10">
        <h1 class="text-6xl md:text-8xl tracking-tight leading-[1.1] mb-8 text-on-surface font-headline">
          Let's start your <br /><span class="italic font-normal">transformation.</span>
        </h1>
        <p class="max-w-md text-lg text-on-surface-variant leading-relaxed mb-12 font-body">
          Experience the art of personalized beauty in our private sanctuary. Whether you have questions about our treatments or wish to secure a residency, our concierge is here to assist.
        </p>
      </div>
      <div class="lg:col-span-5 relative group">
        <div class="aspect-[4/5] overflow-hidden rounded-xl">
          <img
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuA5VklIXt1KzyudLDYMi4zGA_mHA2yBpT9Yh8qBJJ4oVvx5TiMaMfNAkD5laUmzWiI07jJBGePa0nN7GQF62kN64lq36Gs_SCVfWIygdEIbGuL2__0tgVTlE_ZYYqkNLAzNK1xN_FaBvYfADrOp1om3szPtd9u5ZX8XDjlgrBKWJOfvZIzlKImnEBxjDxfKNpMirNUjmk-g-VGTtY6xoynV5pBG-8wZv64ugQKs3UhQgbHU-7MdRTB1AvkwfVcSgzpXC3TzW-XWAlgS"
            alt="L'Atelier Interior"
            class="w-full h-full object-cover grayscale-[20%] group-hover:scale-105 transition-transform duration-700"
          />
        </div>
        <div class="absolute -bottom-8 -left-8 md:-left-16 p-8 bg-surface-container-lowest shadow-2xl rounded-xl max-w-xs hidden md:block">
          <span class="block text-[10px] uppercase tracking-[0.2em] text-outline mb-3 font-semibold">Our Philosophy</span>
          <p class="text-sm italic text-on-surface-variant font-serif">"Beauty is not a procedure, it is a ritual of self-love conducted with precision and grace."</p>
        </div>
      </div>
    </div>
  </section>

  <!-- Contact Form + Details -->
  <section class="max-w-7xl mx-auto px-6 md:px-12 pb-32">
    <!-- Success message -->
    <div v-if="submitted" class="bg-primary/10 border border-primary/20 rounded-xl p-12 text-center mb-12">
      <span class="material-symbols-outlined text-primary text-5xl mb-4 block" style="font-variation-settings: 'FILL' 1;">check_circle</span>
      <h3 class="font-headline text-2xl text-on-surface mb-2">Message Sent!</h3>
      <p class="text-secondary font-body mb-6">Thank you for reaching out. Our concierge will be in touch within 24 hours.</p>
      <button class="px-8 py-3 bg-primary text-on-primary rounded-xl text-xs uppercase tracking-widest font-label" @click="store.resetSubmitted()">Send Another</button>
    </div>

    <div v-else class="grid grid-cols-1 lg:grid-cols-2 gap-24">
      <!-- Left: Contact Form -->
      <div class="bg-surface-container-low p-8 md:p-16 rounded-xl">
        <h2 class="font-headline text-3xl mb-12">Inquiry Form</h2>
        <form class="space-y-12" @submit.prevent="store.submitContact()">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div class="relative">
              <label class="block text-[10px] uppercase tracking-widest text-outline font-semibold mb-2">Full Name *</label>
              <input
                v-model="form.name"
                type="text"
                placeholder="Jean-Luc Picard"
                required
                class="w-full bg-transparent border-0 border-b border-outline-variant/30 py-3 focus:ring-0 focus:border-primary transition-colors text-on-surface placeholder-on-surface-variant/40"
              />
            </div>
            <div class="relative">
              <label class="block text-[10px] uppercase tracking-widest text-outline font-semibold mb-2">Email Address *</label>
              <input
                v-model="form.email"
                type="email"
                placeholder="email@example.com"
                required
                class="w-full bg-transparent border-0 border-b border-outline-variant/30 py-3 focus:ring-0 focus:border-primary transition-colors text-on-surface"
              />
            </div>
          </div>
          <div class="relative">
            <label class="block text-[10px] uppercase tracking-widest text-outline font-semibold mb-2">Service of Interest</label>
            <select
              v-model="form.service"
              class="w-full bg-transparent border-0 border-b border-outline-variant/30 py-3 focus:ring-0 focus:border-primary transition-colors text-on-surface"
            >
              <option v-for="svc in services" :key="svc">{{ svc }}</option>
            </select>
          </div>
          <div class="relative">
            <label class="block text-[10px] uppercase tracking-widest text-outline font-semibold mb-2">Your Message</label>
            <textarea
              v-model="form.message"
              placeholder="Tell us how we can curate your experience..."
              rows="4"
              class="w-full bg-transparent border-0 border-b border-outline-variant/30 py-3 focus:ring-0 focus:border-primary transition-colors text-on-surface resize-none"
            />
          </div>
          <div class="pt-6">
            <button
              type="submit"
              class="group relative inline-flex items-center px-12 py-5 bg-primary text-on-primary rounded-xl overflow-hidden transition-all duration-500 hover:shadow-xl disabled:opacity-50"
              :disabled="submitting"
            >
              <span class="relative z-10 text-sm tracking-widest uppercase font-semibold">
                {{ submitting ? 'Sending…' : 'Submit Request' }}
              </span>
              <div class="absolute inset-0 bg-gradient-to-r from-primary to-primary-container opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </button>
          </div>
        </form>
      </div>

      <!-- Right: Details -->
      <div class="space-y-12">
        <div class="bg-surface-container-high p-8 rounded-xl">
          <h3 class="font-headline text-xl mb-6">Office Hours</h3>
          <div class="space-y-4 font-body text-sm">
            <div class="flex justify-between items-center text-on-surface-variant">
              <span>Monday – Friday</span>
              <span class="text-on-surface font-medium">09:00 – 19:00</span>
            </div>
            <div class="flex justify-between items-center text-on-surface-variant">
              <span>Saturday</span>
              <span class="text-on-surface font-medium">10:00 – 18:00</span>
            </div>
            <div class="flex justify-between items-center text-on-surface-variant">
              <span>Sunday</span>
              <span class="text-on-surface font-medium italic">By Appointment Only</span>
            </div>
          </div>
        </div>
        <div class="p-8 space-y-8">
          <div>
            <h3 class="font-headline text-xl mb-4">The Atelier</h3>
            <p class="text-on-surface-variant leading-relaxed">
              128 Avenue des Champs-Élysées<br />75008 Paris, France
            </p>
          </div>
          <div class="space-y-4">
            <div class="flex items-center gap-4">
              <span class="material-symbols-outlined text-primary">call</span>
              <span class="text-on-surface-variant">+33 1 42 25 00 00</span>
            </div>
            <div class="flex items-center gap-4">
              <span class="material-symbols-outlined text-primary">mail</span>
              <span class="text-on-surface-variant">concierge@latelierbeaute.com</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
