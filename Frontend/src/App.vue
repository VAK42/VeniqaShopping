<template>
  <div class="min-h-screen bg-gray-50 flex flex-col">
    <AppHeader />
    <main class="flex-grow container mx-auto px-4 py-8"><router-view /></main>
    <notifications position="bottom right" />
  </div>
</template>
<script setup lang="ts">
import AppHeader from '@/components/Header.vue'
import { onMounted } from 'vue'
import { useStore } from 'vuex'
const store = useStore()
onMounted(() => { store.dispatch('auth/checkAuth'); if (store.getters['auth/isAuthenticated']) { store.dispatch('cart/fetchCart') } })
</script>