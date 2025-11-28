<template>
  <div>
    <div class="mb-8 text-center">
      <h1 class="text-4xl font-bold text-gray-800 mb-4">New Arrivals</h1>
      <div class="max-w-md mx-auto flex gap-2">
        <input v-model="searchQuery" @keyup.enter="search" type="text" class="input-field"
          placeholder="Search Products...">
        <button @click="search" class="btn btn-primary">Search</button>
      </div>
    </div>
    <div v-if="products.length" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      <ProductCard v-for="prod in products" :key="prod._id" :product="prod" />
    </div>
    <div v-else class="text-center text-gray-500 py-10">No Products Found.</div>
  </div>
</template>
<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useStore } from 'vuex'
import ProductCard from '@/components/ProductCard.vue'
const store = useStore()
const searchQuery = ref('')
const products = computed(() => store.getters['products/allProducts'])
const search = () => { store.dispatch('products/searchProducts', { searchTerm: searchQuery.value }) }
onMounted(() => { search() })
defineOptions({ name: 'HomePage' })
</script>