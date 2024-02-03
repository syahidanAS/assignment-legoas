<script setup>
import { RouterLink, RouterView } from 'vue-router'
import Navbar from './components/Navbar.vue';
</script>

<template>
  <main class="bg-slate-200 h-screen sm:block lg:hidden flex flex-row  justify-center items-center mx-auto w-screen ">
    <h1 class="text-2xl">Mohon buka aplikasi ini pada tampilan desktop untuk tampilan yang lebih nyaman!</h1>
  </main>
  <main class="sm:hidden lg:block h-screen bg-slate-200">
    <Navbar />
    <div class=" px-4 py-4">
      <RouterView />
    </div>
  </main>
</template>

