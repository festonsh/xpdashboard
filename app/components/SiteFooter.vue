<template>
  <footer class="bg-stone-100 dark:bg-stone-950 w-full py-16 px-12 border-t border-stone-200 dark:border-stone-800 transition-opacity duration-500">
    <div class="grid grid-cols-1 md:grid-cols-4 gap-12 max-w-7xl mx-auto">
      <div class="col-span-1">
        <div class="font-serif italic text-xl text-stone-800 dark:text-stone-200 mb-6">L'Atelier de Beauté</div>
        <p class="font-sans text-xs tracking-tight text-stone-600 dark:text-stone-400 leading-relaxed">
          Elevating the standard of aesthetic wellness through intentional care and professional artistry.
        </p>
      </div>
      <div>
        <h5 class="font-label text-[10px] uppercase tracking-[0.3em] mb-6 text-primary">Location</h5>
        <ul class="space-y-3 font-sans text-xs tracking-tight text-stone-600 dark:text-stone-400">
          <li>124 Boutique Lane</li>
          <li>Paris District, FR 75001</li>
        </ul>
      </div>
      <div>
        <h5 class="font-label text-[10px] uppercase tracking-[0.3em] mb-6 text-primary">Connect</h5>
        <ul class="space-y-3 font-sans text-xs tracking-tight text-stone-600 dark:text-stone-400">
          <li><a href="#" class="hover:underline decoration-stone-300 transition-opacity duration-500">Instagram</a></li>
          <li><a href="#" class="hover:underline decoration-stone-300 transition-opacity duration-500">Pinterest</a></li>
          <li><a href="#" class="hover:underline decoration-stone-300 transition-opacity duration-500">Facebook</a></li>
        </ul>
      </div>
      <div>
        <h5 class="font-label text-[10px] uppercase tracking-[0.3em] mb-6 text-primary">Concierge</h5>
        <ul class="space-y-3 font-sans text-xs tracking-tight text-stone-600 dark:text-stone-400">
          <li><NuxtLink to="/book" class="hover:underline decoration-stone-300 transition-opacity duration-500">Book Online</NuxtLink></li>
          <li><a href="#" class="hover:underline decoration-stone-300 transition-opacity duration-500">Gift Cards</a></li>
          <li><a href="#" class="hover:underline decoration-stone-300 transition-opacity duration-500">Privacy Policy</a></li>
        </ul>
      </div>
    </div>
    <div class="max-w-7xl mx-auto mt-20 pt-8 border-t border-stone-200/30 flex justify-between items-center">
      <p class="font-sans text-[10px] tracking-tight text-stone-500 dark:text-stone-400">© 2024 L'Atelier de Beauté. All rights reserved.</p>
      <div class="flex space-x-4">
        <span class="material-symbols-outlined text-sm text-stone-400">ac_unit</span>
        <span class="material-symbols-outlined text-sm text-stone-400">eco</span>
      </div>
    </div>
  </footer>
</template>
