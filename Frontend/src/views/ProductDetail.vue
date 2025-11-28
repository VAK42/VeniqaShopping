<template>
  <div v-if="product" class="bg-white rounded shadow-lg p-6 flex flex-col md:flex-row gap-8">
    <div class="md:w-1/2">
      <img :src="product.detailedImageUrls?.[0]" class="w-full rounded h-96 object-cover">
    </div>
    <div class="md:w-1/2 space-y-4">
      <h1 class="text-3xl font-bold">{{ product.name }}</h1>
      <p class="text-xl text-gray-600">{{ product.brand }}</p>
      <div class="text-2xl font-bold text-blue-500">${{ product.price.amount }}</div>
      <div class="prose max-w-none" v-html="product.detailsHtml"></div>
      <div class="pt-6"><button @click="addToCart" class="btn btn-primary w-full md:w-auto text-lg px-8">Add To
          Cart</button></div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import { notify } from '@kyvg/vue3-notification'
const store = useStore()
const route = useRoute()
const product = computed(() => store.getters['products/productDetail'])
onMounted(() => { store.dispatch('products/getProductDetail', route.params.id) })
const addToCart = async () => { try { await store.dispatch('cart/addToCart', product.value.id || product.value._id); notify({ type: 'success', text: 'Added To Cart' }); } catch { notify({ type: 'error', text: 'Failed To Add' }); } }
defineOptions({ name: 'ProductDetailPage' })
</script>