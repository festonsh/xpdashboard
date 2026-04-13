<script setup lang="ts">
import { SERVICES, TIME_SLOTS } from '~/stores/bookings'

definePageMeta({ layout: 'default' })
useHead({ title: "Book Appointment | L'Atelier de Beauté" })

const store = useBookingsStore()
const { form, selectedService } = storeToRefs(store)

const submitted = ref(false)
const submitting = ref(false)
const confirmedBooking = ref<ReturnType<typeof store.submitBooking> | null>(null)

// Calendar state
const today = new Date()
const currentMonth = ref(today.getMonth())
const currentYear = ref(today.getFullYear())

const monthName = computed(() => new Date(currentYear.value, currentMonth.value, 1)
  .toLocaleString('en-US', { month: 'long', year: 'numeric' }))

function prevMonth() {
  if (currentMonth.value === 0) { currentMonth.value = 11; currentYear.value-- }
  else currentMonth.value--
}
function nextMonth() {
  if (currentMonth.value === 11) { currentMonth.value = 0; currentYear.value++ }
  else currentMonth.value++
}

const calendarDays = computed(() => {
  const firstDay = new Date(currentYear.value, currentMonth.value, 1).getDay()
  const daysInMonth = new Date(currentYear.value, currentMonth.value + 1, 0).getDate()
  const daysInPrev = new Date(currentYear.value, currentMonth.value, 0).getDate()
  const days: { day: number; current: boolean }[] = []
  // Fill leading empty days from prev month
  for (let i = firstDay - 1; i >= 0; i--) {
    days.push({ day: daysInPrev - i, current: false })
  }
  for (let d = 1; d <= daysInMonth; d++) {
    days.push({ day: d, current: true })
  }
  return days
})

function selectDate(day: number) {
  const d = new Date(currentYear.value, currentMonth.value, day)
  form.value.date = d.toISOString().split('T')[0]
}

function isSelectedDate(day: number) {
  const d = new Date(currentYear.value, currentMonth.value, day)
  return form.value.date === d.toISOString().split('T')[0]
}

function isToday(day: number) {
  return day === today.getDate() && currentMonth.value === today.getMonth() && currentYear.value === today.getFullYear()
}

// Calculate total
const vatRate = 0.2
const subtotal = computed(() => selectedService.value?.price ?? 0)
const vat = computed(() => Math.round(subtotal.value * vatRate * 100) / 100)
const total = computed(() => subtotal.value + vat.value)

const formValid = computed(() =>
  form.value.service &&
  form.value.date &&
  form.value.time &&
  form.value.clientName &&
  form.value.clientEmail
)

async function handleSubmit() {
  if (!formValid.value) return
  submitting.value = true
  await new Promise(r => setTimeout(r, 600))
  confirmedBooking.value = store.submitBooking()
  submitting.value = false
  submitted.value = true
}
</script>

<template>
  <div class="pt-8 pb-24 px-6 md:px-12 max-w-7xl mx-auto">
    <!-- Success state -->
    <div v-if="submitted" class="min-h-[60vh] flex flex-col items-center justify-center text-center py-24">
      <span class="material-symbols-outlined text-primary text-6xl mb-8" style="font-variation-settings: 'FILL' 1;">check_circle</span>
      <h2 class="font-headline text-4xl text-on-surface mb-4">Booking Confirmed!</h2>
      <p class="font-body text-secondary max-w-md mb-8">
        Thank you, <strong>{{ confirmedBooking?.clientName }}</strong>. Your appointment for <strong>{{ confirmedBooking?.service }}</strong> on <strong>{{ confirmedBooking?.date }}</strong> at <strong>{{ confirmedBooking?.time }}</strong> has been received. We'll be in touch shortly.
      </p>
      <button
        class="px-10 py-4 bg-primary text-on-primary rounded-xl font-label text-xs uppercase tracking-widest hover:bg-surface-tint transition-all"
        @click="submitted = false"
      >
        Book Another
      </button>
    </div>

    <template v-else>
      <div class="mb-16 text-center">
        <h1 class="font-headline text-5xl md:text-6xl text-on-surface mb-4 tracking-tight">Reservations</h1>
        <p class="text-secondary font-body max-w-md mx-auto text-sm tracking-widest uppercase">Secure your moment of serenity</p>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-12 gap-16">
        <!-- Booking Steps -->
        <div class="lg:col-span-8 space-y-24">

          <!-- Step 1: Service Selection -->
          <section>
            <div class="flex items-baseline gap-4 mb-8">
              <span class="font-headline text-3xl italic text-primary">01</span>
              <h2 class="font-headline text-2xl">Select a Service</h2>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <button
                v-for="svc in SERVICES"
                :key="svc.id"
                type="button"
                class="group relative bg-surface-container-lowest p-8 rounded-xl text-left transition-all duration-300 cursor-pointer"
                :class="form.service === svc.name
                  ? 'ring-2 ring-primary'
                  : 'ring-1 ring-outline-variant/10 hover:ring-primary/30'"
                @click="form.service = svc.name"
              >
                <div class="flex justify-between items-start mb-4">
                  <h3 class="font-headline text-xl text-on-surface">{{ svc.name }}</h3>
                  <span class="text-primary font-medium">${{ svc.price }}</span>
                </div>
                <div class="flex items-center gap-2 text-xs uppercase tracking-widest text-outline">
                  <span class="material-symbols-outlined text-sm">schedule</span>
                  {{ svc.duration }}
                </div>
                <div v-if="form.service === svc.name" class="absolute top-4 right-4 h-6 w-6 bg-primary text-on-primary rounded-full flex items-center justify-center">
                  <span class="material-symbols-outlined text-sm" style="font-variation-settings: 'FILL' 1;">check</span>
                </div>
              </button>
            </div>
          </section>

          <!-- Step 2: Date & Time -->
          <section>
            <div class="flex items-baseline gap-4 mb-8">
              <span class="font-headline text-3xl italic text-primary">02</span>
              <h2 class="font-headline text-2xl">Preferred Timing</h2>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-12 bg-surface-container-low p-8 rounded-xl">
              <!-- Calendar -->
              <div class="space-y-6">
                <div class="flex justify-between items-center">
                  <span class="font-headline text-lg">{{ monthName }}</span>
                  <div class="flex gap-2">
                    <button type="button" class="p-2 hover:bg-surface-container-high rounded-full" @click="prevMonth">
                      <span class="material-symbols-outlined">chevron_left</span>
                    </button>
                    <button type="button" class="p-2 hover:bg-surface-container-high rounded-full" @click="nextMonth">
                      <span class="material-symbols-outlined">chevron_right</span>
                    </button>
                  </div>
                </div>
                <div class="grid grid-cols-7 gap-1 text-center text-xs font-medium text-outline uppercase tracking-tighter">
                  <span>Su</span><span>Mo</span><span>Tu</span><span>We</span><span>Th</span><span>Fr</span><span>Sa</span>
                </div>
                <div class="grid grid-cols-7 gap-1">
                  <span
                    v-for="(d, i) in calendarDays"
                    :key="i"
                    class="h-10 flex items-center justify-center text-sm rounded-full"
                    :class="[
                      !d.current ? 'text-outline/30 cursor-default' : 'cursor-pointer hover:bg-primary-container/20',
                      d.current && isSelectedDate(d.day) ? 'bg-primary text-on-primary' : '',
                      d.current && isToday(d.day) && !isSelectedDate(d.day) ? 'ring-1 ring-primary/40' : '',
                    ]"
                    @click="d.current && selectDate(d.day)"
                  >{{ d.day }}</span>
                </div>
              </div>

              <!-- Time Slots -->
              <div class="space-y-6">
                <span class="font-headline text-lg block">Available Slots</span>
                <div class="grid grid-cols-2 gap-3">
                  <button
                    v-for="slot in TIME_SLOTS"
                    :key="slot"
                    type="button"
                    class="py-3 px-4 text-sm rounded-lg transition-all"
                    :class="form.time === slot
                      ? 'bg-primary text-on-primary'
                      : 'ring-1 ring-outline-variant/30 hover:ring-primary'"
                    @click="form.time = slot"
                  >
                    {{ slot }}
                  </button>
                </div>
              </div>
            </div>
          </section>

          <!-- Step 3: Guest Details -->
          <section>
            <div class="flex items-baseline gap-4 mb-8">
              <span class="font-headline text-3xl italic text-primary">03</span>
              <h2 class="font-headline text-2xl">Guest Details</h2>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-10">
              <div class="space-y-2">
                <label class="text-xs uppercase tracking-widest text-secondary font-medium">Full Name *</label>
                <input
                  v-model="form.clientName"
                  type="text"
                  placeholder="Sophie Larousse"
                  class="w-full bg-transparent border-0 border-b border-outline-variant focus:ring-0 focus:border-primary transition-colors py-2 placeholder:text-outline-variant"
                />
              </div>
              <div class="space-y-2">
                <label class="text-xs uppercase tracking-widest text-secondary font-medium">Email Address *</label>
                <input
                  v-model="form.clientEmail"
                  type="email"
                  placeholder="sophie@atelier.com"
                  class="w-full bg-transparent border-0 border-b border-outline-variant focus:ring-0 focus:border-primary transition-colors py-2 placeholder:text-outline-variant"
                />
              </div>
              <div class="space-y-2">
                <label class="text-xs uppercase tracking-widest text-secondary font-medium">Phone Number</label>
                <input
                  v-model="form.clientPhone"
                  type="tel"
                  placeholder="+33 1 23 45 67 89"
                  class="w-full bg-transparent border-0 border-b border-outline-variant focus:ring-0 focus:border-primary transition-colors py-2 placeholder:text-outline-variant"
                />
              </div>
              <div class="space-y-2">
                <label class="text-xs uppercase tracking-widest text-secondary font-medium">Special Notes</label>
                <input
                  v-model="form.notes"
                  type="text"
                  placeholder="Any allergies or preferences?"
                  class="w-full bg-transparent border-0 border-b border-outline-variant focus:ring-0 focus:border-primary transition-colors py-2 placeholder:text-outline-variant"
                />
              </div>
            </div>
          </section>
        </div>

        <!-- Summary Sidebar -->
        <aside class="lg:col-span-4 lg:sticky lg:top-32 h-fit">
          <div class="bg-surface-container-highest p-10 rounded-xl space-y-8 relative overflow-hidden">
            <div class="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16" />
            <h3 class="font-headline text-2xl relative z-10">Booking Summary</h3>

            <div class="space-y-6 relative z-10">
              <!-- Service -->
              <div class="flex justify-between items-start pb-6 border-b border-outline-variant/30">
                <div>
                  <p class="text-xs uppercase tracking-widest text-secondary mb-1">Treatment</p>
                  <p class="font-medium">{{ form.service || '—' }}</p>
                </div>
                <span class="font-headline">${{ subtotal || '—' }}</span>
              </div>
              <!-- Date/Time -->
              <div class="flex justify-between items-start pb-6 border-b border-outline-variant/30">
                <div>
                  <p class="text-xs uppercase tracking-widest text-secondary mb-1">Time</p>
                  <p class="font-medium">{{ form.date || '—' }}</p>
                  <p v-if="form.time" class="text-sm text-secondary">{{ form.time }} <span v-if="selectedService">({{ selectedService.duration }})</span></p>
                </div>
              </div>
              <!-- Totals -->
              <div v-if="subtotal" class="pt-2 space-y-4">
                <div class="flex justify-between text-sm">
                  <span class="text-secondary">Subtotal</span>
                  <span>${{ subtotal.toFixed(2) }}</span>
                </div>
                <div class="flex justify-between text-sm">
                  <span class="text-secondary">VAT (20%)</span>
                  <span>${{ vat.toFixed(2) }}</span>
                </div>
                <div class="flex justify-between items-baseline pt-4">
                  <span class="font-headline text-lg">Total</span>
                  <span class="font-headline text-2xl text-primary">${{ total.toFixed(2) }}</span>
                </div>
              </div>
            </div>

            <button
              class="w-full bg-primary text-on-primary py-5 px-8 rounded-xl font-medium tracking-wide transition-all shadow-xl shadow-primary/10 disabled:opacity-40 disabled:cursor-not-allowed"
              :disabled="!formValid || submitting"
              @click="handleSubmit"
            >
              <span v-if="submitting">Processing…</span>
              <span v-else>Confirm Booking</span>
            </button>

            <p class="text-[10px] text-center text-outline leading-relaxed px-4">
              By confirming, you agree to our 24-hour cancellation policy. A confirmation email will be sent instantly.
            </p>
          </div>
        </aside>
      </div>
    </template>
  </div>
</template>
