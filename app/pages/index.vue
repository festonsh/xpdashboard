<script setup lang="ts">
definePageMeta({ layout: false })

const router = useRouter()
onMounted(() => router.replace('/admin/login'))
</script>

<template>
  <div class="min-h-screen bg-background flex items-center justify-center">
    <span class="material-symbols-outlined text-primary text-3xl" style="animation:spin 1s linear infinite">autorenew</span>
  </div>
</template>

<style>
@keyframes spin { to { transform: rotate(360deg); } }
</style>
