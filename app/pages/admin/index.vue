<script setup lang="ts">
definePageMeta({ layout: 'admin', middleware: 'admin-auth' })
useHead({ title: "Dashboard | Admin — SH Nails & Beauty" })

const store = useBookingsStore()
const { bookings, stats } = storeToRefs(store)

onMounted(() => store.fetchBookings())

const todayStr = new Date().toISOString().split('T')[0]
const todaySchedule = computed(() =>
  bookings.value.filter(b => b.date === todayStr).sort((a, b) => a.time.localeCompare(b.time))
)

const quickStats = computed(() => [
  { icon: 'calendar_month', label: "Today's Bookings", value: todaySchedule.value.length, trend: '+12%', trendUp: true },
  { icon: 'pending_actions', label: 'Upcoming Appts', value: bookings.value.filter(b => b.status !== 'cancelled').length, trend: 'Steady', trendUp: null },
  { icon: 'face', label: 'Total Clients', value: [...new Set(bookings.value.map(b => b.clientEmail))].length, trend: '+5', trendUp: true },
  { icon: 'payments', label: 'Est. Revenue', value: `€${stats.value.revenue.toLocaleString()}`, trend: '+18%', trendUp: true },
])

const recentActivity = computed(() => [
  ...bookings.value.slice(0, 4).map(b => ({
    type: b.status === 'confirmed' ? 'Booking Confirmed' : b.status === 'pending' ? 'New Booking' : 'Booking Cancelled',
    detail: `${b.clientName} — ${b.service}`,
    time: new Date(b.createdAt).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
    dot: b.status === 'confirmed' ? 'bg-primary' : b.status === 'pending' ? 'bg-amber-400' : 'bg-stone-300',
  })),
])

const statusClass: Record<string, string> = {
  confirmed: 'bg-emerald-50 text-emerald-700',
  pending: 'bg-amber-50 text-amber-700',
  cancelled: 'bg-stone-100 text-stone-400',
  arrived: 'bg-stone-100 text-stone-500',
}
</script>

<template>
  <div class="px-10 mt-8 pb-12 space-y-10">
    <!-- Header -->
    <header class="flex justify-between items-end mb-4">
      <div>
        <nav class="flex gap-2 text-[10px] uppercase tracking-[0.2em] text-stone-400 mb-2">
          <span>Management</span><span>/</span>
          <span class="text-primary font-semibold">Dashboard</span>
        </nav>
        <h2 class="font-serif text-4xl text-stone-900 tracking-tight">Dashboard Overview</h2>
      </div>
      <NuxtLink
        to="/admin/bookings"
        class="px-6 py-2.5 bg-primary text-on-primary rounded-xl text-xs font-medium tracking-wide flex items-center gap-2 hover:bg-surface-tint transition-all"
      >
        <span class="material-symbols-outlined text-sm">add</span>
        New Appointment
      </NuxtLink>
    </header>

    <!-- Quick Stats -->
    <section class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <div
        v-for="stat in quickStats"
        :key="stat.label"
        class="bg-surface-container-lowest p-6 rounded-xl border border-stone-200/20 shadow-sm"
      >
        <div class="flex items-center justify-between mb-4">
          <span class="p-2 bg-stone-100 rounded-lg text-stone-600 material-symbols-outlined">{{ stat.icon }}</span>
          <span
            class="text-[10px] font-bold tracking-widest"
            :class="stat.trendUp === true ? 'text-emerald-600' : stat.trendUp === false ? 'text-red-500' : 'text-stone-400'"
          >{{ stat.trend }}</span>
        </div>
        <p class="text-[10px] text-stone-400 uppercase tracking-widest font-sans">{{ stat.label }}</p>
        <p class="text-3xl font-serif mt-1 text-stone-800">{{ stat.value }}</p>
      </div>
    </section>

    <!-- Main Grid -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-10">
      <!-- Today's Schedule -->
      <section class="lg:col-span-2 space-y-6">
        <div class="flex items-center justify-between">
          <h3 class="font-serif text-xl text-stone-800">Today's Schedule</h3>
          <NuxtLink to="/admin/bookings" class="text-[10px] uppercase tracking-[0.2em] font-semibold text-primary border-b border-primary/20 pb-0.5 hover:border-primary transition-all">
            View All
          </NuxtLink>
        </div>

        <div v-if="todaySchedule.length === 0" class="bg-surface-container-lowest p-8 rounded-xl text-center text-stone-400 text-sm italic">
          No appointments scheduled for today.
        </div>

        <div v-else class="space-y-4">
          <div
            v-for="b in todaySchedule"
            :key="b.id"
            class="group bg-surface-container-lowest p-5 rounded-xl flex items-center gap-6 hover:shadow-lg hover:shadow-stone-200/40 transition-all duration-300"
          >
            <div class="w-16 text-center border-r border-stone-100 pr-4">
              <p class="text-sm font-semibold text-stone-800">{{ b.time.split(':')[0] }}:{{ b.time.split(':')[1] || '00' }}</p>
            </div>
            <div class="flex-1">
              <p class="text-sm font-medium text-stone-900 tracking-tight">{{ b.clientName }}</p>
              <p class="text-[10px] text-stone-500 uppercase tracking-widest mt-0.5">{{ b.service }}</p>
            </div>
            <div class="flex items-center gap-2">
              <span
                class="px-3 py-1 text-[9px] font-bold uppercase tracking-widest rounded-full"
                :class="statusClass[b.status] ?? 'bg-stone-100 text-stone-500'"
              >{{ b.status }}</span>
            </div>
          </div>
        </div>

        <!-- Fallback demo schedule if no bookings today -->
        <template v-if="todaySchedule.length === 0">
          <div class="space-y-4 opacity-40 pointer-events-none">
            <div v-for="demo in ['Elena Moretti — Signature Facial', 'Sophie Dubois — Balayage', 'Marcus Thorne — HydraFacial']" :key="demo"
              class="bg-surface-container-lowest p-5 rounded-xl flex items-center gap-6">
              <div class="w-16 text-center border-r border-stone-100 pr-4">
                <p class="text-sm font-semibold text-stone-800">—:—</p>
              </div>
              <div class="flex-1">
                <p class="text-sm font-medium text-stone-900">{{ demo.split(' — ')[0] }}</p>
                <p class="text-[10px] text-stone-500 uppercase tracking-widest mt-0.5">{{ demo.split(' — ')[1] }}</p>
              </div>
            </div>
          </div>
        </template>
      </section>

      <!-- Activity Feed -->
      <section class="space-y-6">
        <h3 class="font-serif text-xl text-stone-800">Recent Activity</h3>
        <div class="relative pl-6 space-y-8 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-[1px] before:bg-stone-200">
          <div v-for="(act, i) in recentActivity" :key="i" class="relative">
            <div class="absolute -left-[21px] top-1 w-2.5 h-2.5 rounded-full border-2 border-surface-container-low" :class="act.dot" />
            <p class="text-xs font-medium text-stone-900">{{ act.type }}</p>
            <p class="text-[11px] text-stone-500 mt-0.5">{{ act.detail }}</p>
            <p class="text-[9px] text-stone-400 mt-2 font-sans">{{ act.time }}</p>
          </div>
        </div>
        <!-- Insight Card -->
        <div class="mt-12 bg-primary-container/20 p-6 rounded-xl relative overflow-hidden">
          <div class="relative z-10">
            <h4 class="font-serif text-primary text-sm italic">Manager's Insight</h4>
            <p class="text-xs text-on-primary-container mt-2 leading-relaxed">
              {{ stats.confirmed }} confirmed bookings this period. Consider featuring premium add-ons in next week's email digest.
            </p>
          </div>
          <span class="absolute -bottom-6 -right-6 text-primary/5 text-8xl material-symbols-outlined select-none">auto_awesome</span>
        </div>
      </section>
    </div>
  </div>
</template>
