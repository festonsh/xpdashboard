<template>
  <div class="bg-background text-on-background min-h-screen flex">
    <AdminSideNav />
    <div class="ml-64 flex-1 flex flex-col min-h-screen">
      <slot />
      <footer class="bg-stone-100 dark:bg-stone-950 border-t border-stone-200 dark:border-stone-800 py-6 px-10 flex justify-between items-center mt-auto">
        <p class="font-sans text-[10px] tracking-tight text-stone-400 uppercase">© 2024 L'Atelier de Beauté. All rights reserved.</p>
        <div class="flex gap-6">
          <a href="#" class="text-[10px] text-stone-400 uppercase tracking-widest hover:text-primary transition-colors">Support</a>
          <a href="#" class="text-[10px] text-stone-400 uppercase tracking-widest hover:text-primary transition-colors">Documentation</a>
        </div>
      </footer>
    </div>
  </div>
</template>
