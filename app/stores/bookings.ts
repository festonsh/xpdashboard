import { defineStore } from 'pinia'

export interface Booking {
  id: string
  clientName: string
  clientEmail: string
  clientPhone: string
  service: string
  serviceId?: string
  date: string
  time: string
  notes: string
  price?: number
  duration?: string
  status: 'pending' | 'confirmed' | 'cancelled'
  createdAt: string
}

export interface BookingForm {
  service: string
  date: string
  time: string
  clientName: string
  clientEmail: string
  clientPhone: string
  notes: string
}

export const SERVICES = [
  { id: 'signature-facial',   name: 'Signature Facial',              price: 120, duration: '60 min' },
  { id: 'zenith-massage',     name: 'Zenith Massage',                 price: 150, duration: '90 min' },
  { id: 'architectural-brows',name: 'Architectural Brows',            price: 65,  duration: '45 min' },
  { id: 'hydrafacial',        name: 'Signature HydraFacial',          price: 225, duration: '60 min' },
  { id: 'gua-sha',            name: 'Sculpting Gua Sha Facial',       price: 185, duration: '75 min' },
  { id: 'deep-tissue',        name: 'Deep Tissue Renewal',            price: 160, duration: '90 min' },
  { id: 'vitamin-c',          name: 'Vitamin C Brightening Infusion', price: 145, duration: '45 min' },
  { id: 'atelier-manicure',   name: 'The Atelier Manicure',           price: 85,  duration: '60 min' },
  { id: 'arome-massage',      name: 'Arôme Massage',                  price: 145, duration: '90 min' },
  { id: 'stone-therapy',      name: 'Stone Therapy',                  price: 160, duration: '75 min' },
  { id: 'luminance-peel',     name: 'Luminance Peel',                 price: 95,  duration: '45 min' },
]

export const TIME_SLOTS = [
  '09:00 AM', '10:30 AM', '12:00 PM', '01:30 PM',
  '03:00 PM', '04:30 PM',
]

export const useBookingsStore = defineStore('bookings', () => {
  const config = useRuntimeConfig()

  const bookings        = ref<Booking[]>([])
  const loading         = ref(false)
  const error           = ref<string | null>(null)
  // IDs seen by admin — persisted locally so the "new" banner survives refresh
  const seenIds         = ref<string[]>([])

  const form = ref<BookingForm>({
    service: '', date: '', time: '',
    clientName: '', clientEmail: '', clientPhone: '', notes: '',
  })

  const filterStatus  = ref<'all' | 'pending' | 'confirmed' | 'cancelled'>('all')
  const filterService = ref('all')
  const searchQuery   = ref('')

  /* ── Helpers ──────────────────────────────────────────────── */
  function wpHeaders() {
    return {
      'Content-Type':  'application/json',
      'X-Atelier-Key': config.public.wpApiKey as string,
    }
  }

  /* ── Derived ──────────────────────────────────────────────── */
  const unseenIds = computed(() =>
    bookings.value
      .filter(b => !seenIds.value.includes(b.id))
      .map(b => b.id)
  )

  const selectedService = computed(() =>
    SERVICES.find(s => s.name === form.value.service || s.id === form.value.service)
  )

  const filteredBookings = computed(() =>
    bookings.value.filter(b => {
      const matchStatus  = filterStatus.value === 'all' || b.status === filterStatus.value
      const matchService = filterService.value === 'all' || b.service === filterService.value
      const q            = searchQuery.value.toLowerCase()
      const matchSearch  = !q ||
        b.clientName.toLowerCase().includes(q)  ||
        b.clientEmail.toLowerCase().includes(q) ||
        b.service.toLowerCase().includes(q)
      return matchStatus && matchService && matchSearch
    })
  )

  const stats = computed(() => ({
    total:     bookings.value.length,
    confirmed: bookings.value.filter(b => b.status === 'confirmed').length,
    pending:   bookings.value.filter(b => b.status === 'pending').length,
    cancelled: bookings.value.filter(b => b.status === 'cancelled').length,
    revenue:   bookings.value
      .filter(b => b.status === 'confirmed')
      .reduce((sum, b) => {
        const svc = SERVICES.find(s => s.name === b.service)
        return sum + (b.price ?? svc?.price ?? 0)
      }, 0),
  }))

  /* ── Fetch from WordPress ─────────────────────────────────── */
  async function fetchBookings() {
    if (!import.meta.client) return
    if (!config.public.wpApiUrl) {
      error.value = 'WordPress API URL not configured. Set NUXT_PUBLIC_WP_API_URL in Vercel.'
      return
    }
    loading.value = true
    error.value   = null
    try {
      const data = await $fetch<Booking[]>(
        `${config.public.wpApiUrl}/bookings`,
        { headers: wpHeaders() }
      )
      bookings.value = data
    }
    catch (err: unknown) {
      error.value = (err as Error).message ?? 'Failed to fetch bookings'
    }
    finally {
      loading.value = false
    }
  }

  /* ── Admin: create booking ────────────────────────────────── */
  async function createBooking(payload: {
    clientName: string; clientEmail: string; clientPhone: string
    service: string; date: string; time: string; notes: string
  }) {
    const svc    = SERVICES.find(s => s.name === payload.service)
    const result = await $fetch<Booking>(
      `${config.public.wpApiUrl}/bookings`,
      {
        method:  'POST',
        headers: wpHeaders(),
        body:    {
          ...payload,
          serviceId: svc?.id ?? '',
          price:     svc?.price ?? 0,
          duration:  svc?.duration ?? '',
        },
      }
    )
    bookings.value.unshift(result)
    seenIds.value.push(result.id)  // admin created it, mark as seen
    return result
  }

  /* ── Admin: status changes ────────────────────────────────── */
  async function confirmBooking(id: string) {
    await $fetch(`${config.public.wpApiUrl}/bookings/${id}/status`, {
      method:  'PATCH',
      headers: wpHeaders(),
      body:    { status: 'confirmed' },
    })
    const b = bookings.value.find(b => b.id === id)
    if (b) b.status = 'confirmed'
  }

  async function cancelBooking(id: string) {
    await $fetch(`${config.public.wpApiUrl}/bookings/${id}/status`, {
      method:  'PATCH',
      headers: wpHeaders(),
      body:    { status: 'cancelled' },
    })
    const b = bookings.value.find(b => b.id === id)
    if (b) b.status = 'cancelled'
  }

  async function deleteBooking(id: string) {
    await $fetch(`${config.public.wpApiUrl}/bookings/${id}`, {
      method:  'DELETE',
      headers: wpHeaders(),
    })
    bookings.value = bookings.value.filter(b => b.id !== id)
  }

  /* ── Mark all current bookings as seen ───────────────────── */
  function markAllSeen() {
    seenIds.value = bookings.value.map(b => b.id)
  }

  function resetForm() {
    form.value = {
      service: '', date: '', time: '',
      clientName: '', clientEmail: '', clientPhone: '', notes: '',
    }
  }

  return {
    bookings,
    loading,
    error,
    seenIds,
    unseenIds,
    form,
    filterStatus,
    filterService,
    searchQuery,
    filteredBookings,
    selectedService,
    stats,
    fetchBookings,
    createBooking,
    confirmBooking,
    cancelBooking,
    deleteBooking,
    markAllSeen,
    resetForm,
  }
}, {
  persist: {
    // Only persist the seen-IDs list locally — everything else comes from WordPress
    pick: ['seenIds'],
  },
})
