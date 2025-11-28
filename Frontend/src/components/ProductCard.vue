<template>
  <div
    class="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden cursor-pointer"
    @click="goToDetail">
    <img :src="product.thumbnailUrls?.[0] || 'placeholder.jpg'" alt="Product Image" class="w-full h-48 object-cover">
    <div class="p-4">
      <h3 class="text-lg font-semibold text-gray-800 truncate">{{ product.name }}</h3>
      <p class="text-gray-500 text-sm mb-2">{{ product.brand }}</p>
      <div class="flex justify-between items-center">
        <span class="text-blue-500 font-bold text-xl">${{ product.price.amount }}</span>
        <button @click.stop="addToCart" class="btn btn-primary text-sm">Add</button>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { notify } from "@kyvg/vue3-notification"
const props = defineProps<{ product: any }>()
const router = useRouter()
const store = useStore()
const goToDetail = () => { router.push(`/product/${props.product._id || props.product.id}`) }
const addToCart = async () => { try { await store.dispatch('cart/addToCart', props.product._id || props.product.id); notify({ type: 'success', text: 'Added To Cart!' }); } catch { notify({ type: 'error', text: 'Please Login First' }); router.push('/login'); } }
</script>