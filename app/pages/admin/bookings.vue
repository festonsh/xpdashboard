<script setup lang="ts">
import { SERVICES } from '~/stores/bookings'

definePageMeta({ layout: 'admin', middleware: 'admin-auth' })
useHead({ title: "Bookings | Admin — SH Nails & Beauty" })

const store = useBookingsStore()
const { filteredBookings, filterStatus, filterService, searchQuery, stats, unseenIds, loading, error } = storeToRefs(store)

// Fetch on mount
onMounted(() => store.fetchBookings())

const PAGE_SIZE = 8
const page = ref(1)
const paginatedBookings = computed(() => {
  const start = (page.value - 1) * PAGE_SIZE
  return filteredBookings.value.slice(start, start + PAGE_SIZE)
})
const totalPages = computed(() => Math.ceil(filteredBookings.value.length / PAGE_SIZE))

// New booking modal
const showModal   = ref(false)
const saving      = ref(false)
const saveError   = ref('')
const newForm = reactive({
  clientName: '',
  clientEmail: '',
  clientPhone: '',
  service: SERVICES[0].name,
  date: '',
  time: '',
  notes: '',
})

async function saveNewBooking() {
  saving.value    = true
  saveError.value = ''
  try {
    await store.createBooking({ ...newForm })
    Object.assign(newForm, { clientName: '', clientEmail: '', clientPhone: '', service: SERVICES[0].name, date: '', time: '', notes: '' })
    showModal.value = false
  }
  catch (err: unknown) {
    saveError.value = (err as Error).message ?? 'Failed to save booking'
  }
  finally {
    saving.value = false
  }
}

const statusBadge: Record<string, string> = {
  pending:   'bg-orange-50 text-orange-600',
  confirmed: 'bg-green-50 text-green-600',
  cancelled: 'bg-stone-100 text-stone-400 line-through',
}
</script>

<template>
  <main class="p-12 min-h-screen bg-surface">

    <!-- New bookings banner -->
    <Transition name="slide-down">
      <div
        v-if="unseenIds.length > 0"
        class="mb-8 flex items-center justify-between gap-4 bg-primary/10 border border-primary/20 rounded-xl px-6 py-4"
      >
        <div class="flex items-center gap-3">
          <span class="material-symbols-outlined text-primary" style="font-variation-settings: 'FILL' 1;">notifications_active</span>
          <p class="text-sm font-medium text-on-surface">
            <span class="text-primary font-semibold">{{ unseenIds.length }} new {{ unseenIds.length === 1 ? 'booking' : 'bookings' }}</span>
            from the storefront.
          </p>
        </div>
        <button
          class="text-[10px] uppercase tracking-widest text-primary font-semibold hover:underline shrink-0"
          @click="store.markAllSeen()"
        >Dismiss</button>
      </div>
    </Transition>

    <!-- Error banner -->
    <div v-if="error" class="mb-8 p-4 bg-red-50 text-red-600 text-sm rounded-xl flex items-center gap-3">
      <span class="material-symbols-outlined text-sm">error</span>
      {{ error }}
      <button class="ml-auto text-xs underline" @click="store.fetchBookings()">Retry</button>
    </div>

    <!-- Header -->
    <header class="mb-12">
      <div class="flex justify-between items-end">
        <div>
          <nav class="flex gap-2 text-[10px] uppercase tracking-[0.2em] text-stone-400 mb-4">
            <span>Management</span><span>/</span>
            <span class="text-primary font-semibold">Bookings</span>
          </nav>
          <h2 class="text-4xl font-serif text-stone-900 tracking-tight">Appointment Ledger</h2>
        </div>
        <div class="flex items-center gap-3">
          <button
            class="p-2.5 rounded-xl border border-outline-variant/30 hover:bg-stone-50 text-stone-500 transition-all"
            :class="loading ? 'animate-spin' : ''"
            title="Refresh"
            @click="store.fetchBookings()"
          >
            <span class="material-symbols-outlined text-sm">refresh</span>
          </button>
          <button
            class="px-6 py-2.5 bg-primary text-on-primary rounded-xl text-xs font-medium tracking-wide flex items-center gap-2 hover:bg-surface-tint transition-all"
            @click="showModal = true"
          >
            <span class="material-symbols-outlined text-sm">add</span>
            New Appointment
          </button>
        </div>
      </div>
    </header>

    <div class="space-y-8">

      <!-- Bookings Table -->
      <section class="bg-surface-container-lowest rounded-xl overflow-hidden shadow-sm">
        <div class="p-6 border-b border-stone-100 flex justify-between items-center">
          <h3 class="font-serif text-xl text-stone-800">Appointments</h3>
          <div class="relative">
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Search…"
              class="bg-surface-container-low border-none rounded-xl text-xs py-2 px-10 focus:ring-1 focus:ring-primary-container outline-none w-56"
              @input="page = 1"
            />
            <span class="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-stone-400 text-sm">search</span>
          </div>
        </div>

        <!-- Loading state -->
        <div v-if="loading && filteredBookings.length === 0" class="flex items-center justify-center py-20">
          <span class="material-symbols-outlined text-primary text-3xl animate-spin">autorenew</span>
        </div>

        <div v-else class="overflow-x-auto">
          <table class="w-full text-left">
            <thead class="bg-stone-50/50">
              <tr>
                <th class="px-6 py-4 text-[10px] uppercase tracking-[0.15em] text-stone-400 font-bold">Client</th>
                <th class="px-6 py-4 text-[10px] uppercase tracking-[0.15em] text-stone-400 font-bold">Service</th>
                <th class="px-6 py-4 text-[10px] uppercase tracking-[0.15em] text-stone-400 font-bold">Date</th>
                <th class="px-6 py-4 text-[10px] uppercase tracking-[0.15em] text-stone-400 font-bold">Status</th>
                <th class="px-6 py-4 text-[10px] uppercase tracking-[0.15em] text-stone-400 font-bold text-right">Actions</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-stone-50">
              <tr
                v-for="b in paginatedBookings"
                :key="b.id"
                class="transition-colors"
                :class="unseenIds.includes(b.id)
                  ? 'bg-primary/5 hover:bg-primary/10'
                  : 'hover:bg-stone-50/50'"
              >
                <td class="px-6 py-5">
                  <p class="text-xs font-semibold text-stone-900">{{ b.clientName }}</p>
                  <p class="text-[10px] text-stone-500">{{ b.clientEmail }}</p>
                </td>
                <td class="px-6 py-5 text-xs text-stone-600 italic">{{ b.service }}</td>
                <td class="px-6 py-5">
                  <p class="text-xs text-stone-900">{{ b.date }}</p>
                  <p class="text-[10px] text-stone-400 uppercase">{{ b.time }}</p>
                </td>
                <td class="px-6 py-5">
                  <span
                    class="inline-block px-3 py-1 rounded-full text-[9px] font-bold uppercase tracking-widest"
                    :class="statusBadge[b.status]"
                  >{{ b.status }}</span>
                </td>
                <td class="px-6 py-5 text-right">
                  <div class="flex justify-end gap-2">
                    <button
                      v-if="b.status === 'pending'"
                      class="px-3 py-1.5 bg-primary text-on-primary text-[10px] rounded-lg hover:bg-surface-tint transition-all font-medium"
                      @click="store.confirmBooking(b.id)"
                    >Confirm</button>
                    <button
                      v-if="b.status !== 'cancelled'"
                      class="px-3 py-1.5 border border-outline-variant/30 text-[10px] rounded-lg hover:bg-stone-50 transition-all font-medium text-stone-600"
                      @click="store.cancelBooking(b.id)"
                    >Cancel</button>
                    <button
                      class="p-1.5 hover:bg-stone-100 rounded-lg text-stone-400"
                      @click="store.deleteBooking(b.id)"
                    >
                      <span class="material-symbols-outlined text-sm">delete</span>
                    </button>
                  </div>
                </td>
              </tr>
              <tr v-if="paginatedBookings.length === 0 && !loading">
                <td colspan="5" class="px-6 py-12 text-center text-stone-400 text-sm italic">No bookings match your filters.</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="p-6 bg-stone-50/50 border-t border-stone-100 flex justify-between items-center">
          <p class="text-[10px] text-stone-500">
            Showing {{ paginatedBookings.length }} of {{ filteredBookings.length }} appointments
          </p>
          <div class="flex gap-2">
            <button
              class="w-8 h-8 flex items-center justify-center rounded border border-stone-200 text-stone-400 disabled:opacity-30"
              :disabled="page <= 1"
              @click="page--"
            >
              <span class="material-symbols-outlined text-sm">navigate_before</span>
            </button>
            <button
              class="w-8 h-8 flex items-center justify-center rounded border border-stone-200 text-stone-600 hover:bg-stone-200 disabled:opacity-30"
              :disabled="page >= totalPages"
              @click="page++"
            >
              <span class="material-symbols-outlined text-sm">navigate_next</span>
            </button>
          </div>
        </div>
      </section>

      <!-- Stats + Filters -->
      <section class="grid grid-cols-1 xl:grid-cols-[1.4fr_1fr] gap-8">
        <div class="bg-surface-variant/30 rounded-xl p-8 border border-outline-variant/10">
          <h3 class="font-serif text-lg text-stone-800 mb-6">Overview</h3>
          <div class="grid grid-cols-2 lg:grid-cols-4 xl:grid-cols-2 gap-4">
            <div class="bg-surface-container-lowest p-4 rounded-lg">
              <p class="text-[10px] uppercase tracking-widest text-stone-400">Total</p>
              <p class="text-2xl font-serif text-stone-800 mt-1">{{ stats.total }}</p>
            </div>
            <div class="bg-surface-container-lowest p-4 rounded-lg">
              <p class="text-[10px] uppercase tracking-widest text-stone-400">Confirmed</p>
              <p class="text-2xl font-serif text-stone-800 mt-1">{{ stats.confirmed.toString().padStart(2,'0') }}</p>
            </div>
            <div class="bg-surface-container-lowest p-4 rounded-lg">
              <p class="text-[10px] uppercase tracking-widest text-stone-400">Pending</p>
              <p class="text-2xl font-serif text-stone-800 mt-1">{{ stats.pending.toString().padStart(2,'0') }}</p>
            </div>
            <div class="bg-surface-container-lowest p-4 rounded-lg">
              <p class="text-[10px] uppercase tracking-widest text-stone-400">Est. Revenue</p>
              <p class="text-2xl font-serif text-primary mt-1">€{{ stats.revenue.toLocaleString() }}</p>
            </div>
          </div>
        </div>

        <div class="bg-surface-container-low rounded-xl p-8">
          <h3 class="font-serif text-lg text-stone-800 mb-6">Refine View</h3>
          <div class="space-y-6">
            <div class="space-y-2">
              <label class="text-[10px] uppercase tracking-widest text-stone-500 font-semibold">Service Category</label>
              <select
                v-model="filterService"
                class="w-full bg-surface-container-lowest border-none rounded-xl text-xs py-3 px-4 focus:ring-1 focus:ring-primary-container outline-none"
              >
                <option value="all">All Services</option>
                <option v-for="svc in SERVICES" :key="svc.id" :value="svc.name">{{ svc.name }}</option>
              </select>
            </div>
            <div class="space-y-2">
              <label class="text-[10px] uppercase tracking-widest text-stone-500 font-semibold">Status</label>
              <div class="flex flex-wrap gap-2">
                <button
                  v-for="s in ['all','pending','confirmed','cancelled']"
                  :key="s"
                  type="button"
                  class="px-4 py-2 rounded-full text-[10px] font-medium transition-colors capitalize"
                  :class="filterStatus === s ? 'bg-primary text-on-primary' : 'bg-surface-container-lowest text-stone-600 hover:bg-stone-200'"
                  @click="filterStatus = s as typeof filterStatus.value; page = 1"
                >{{ s }}</button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>

    <!-- New Booking Modal -->
    <Teleport to="body">
      <div v-if="showModal" class="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
        <div class="bg-surface-container-lowest rounded-2xl shadow-2xl w-full max-w-lg p-10 space-y-8">
          <div class="flex justify-between items-center">
            <h3 class="font-serif text-2xl text-stone-900">New Appointment</h3>
            <button class="material-symbols-outlined text-stone-400 hover:text-stone-700" @click="showModal = false">close</button>
          </div>
          <div v-if="saveError" class="p-3 bg-red-50 text-red-600 text-xs rounded-xl">{{ saveError }}</div>
          <form class="space-y-6" @submit.prevent="saveNewBooking">
            <div>
              <label class="block text-[10px] uppercase tracking-widest text-outline font-semibold mb-1">Client Name *</label>
              <input v-model="newForm.clientName" required type="text" placeholder="Full name" class="w-full border-b border-outline-variant/30 bg-transparent py-2 focus:ring-0 focus:border-primary text-on-surface text-sm" />
            </div>
            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="block text-[10px] uppercase tracking-widest text-outline font-semibold mb-1">Email *</label>
                <input v-model="newForm.clientEmail" required type="email" placeholder="email@example.com" class="w-full border-b border-outline-variant/30 bg-transparent py-2 focus:ring-0 focus:border-primary text-on-surface text-sm" />
              </div>
              <div>
                <label class="block text-[10px] uppercase tracking-widest text-outline font-semibold mb-1">Phone</label>
                <input v-model="newForm.clientPhone" type="tel" placeholder="+33…" class="w-full border-b border-outline-variant/30 bg-transparent py-2 focus:ring-0 focus:border-primary text-on-surface text-sm" />
              </div>
            </div>
            <div>
              <label class="block text-[10px] uppercase tracking-widest text-outline font-semibold mb-1">Service</label>
              <select v-model="newForm.service" class="w-full border-b border-outline-variant/30 bg-transparent py-2 focus:ring-0 focus:border-primary text-on-surface text-sm">
                <option v-for="svc in SERVICES" :key="svc.id" :value="svc.name">{{ svc.name }}</option>
              </select>
            </div>
            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="block text-[10px] uppercase tracking-widest text-outline font-semibold mb-1">Date *</label>
                <input v-model="newForm.date" required type="date" class="w-full border-b border-outline-variant/30 bg-transparent py-2 focus:ring-0 focus:border-primary text-on-surface text-sm" />
              </div>
              <div>
                <label class="block text-[10px] uppercase tracking-widest text-outline font-semibold mb-1">Time</label>
                <input v-model="newForm.time" type="time" class="w-full border-b border-outline-variant/30 bg-transparent py-2 focus:ring-0 focus:border-primary text-on-surface text-sm" />
              </div>
            </div>
            <div>
              <label class="block text-[10px] uppercase tracking-widest text-outline font-semibold mb-1">Notes</label>
              <input v-model="newForm.notes" type="text" placeholder="Allergies, preferences…" class="w-full border-b border-outline-variant/30 bg-transparent py-2 focus:ring-0 focus:border-primary text-on-surface text-sm" />
            </div>
            <div class="flex gap-4 pt-4">
              <button type="submit" :disabled="saving"
                class="flex-1 py-4 bg-primary text-on-primary rounded-xl text-xs uppercase tracking-widest font-medium hover:bg-surface-tint transition-all disabled:opacity-50 flex items-center justify-center gap-2">
                <span v-if="saving" class="material-symbols-outlined text-sm animate-spin">autorenew</span>
                {{ saving ? 'Saving…' : 'Save Booking' }}
              </button>
              <button type="button" class="flex-1 py-4 border border-outline-variant/30 rounded-xl text-xs uppercase tracking-widest font-medium hover:bg-stone-50 transition-all" @click="showModal = false">
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </Teleport>
  </main>
</template>

<style scoped>
.slide-down-enter-active, .slide-down-leave-active { transition: all 0.3s ease; }
.slide-down-enter-from, .slide-down-leave-to { opacity: 0; transform: translateY(-8px); }
</style>
