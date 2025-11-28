<template>
  <div class="max-w-4xl mx-auto">
    <h2 class="text-3xl font-bold mb-6">Shopping Cart</h2>
    <div v-if="items.length" class="bg-white rounded shadow p-6">
      <div v-for="item in items" :key="item.product._id"
        class="flex items-center justify-between border-b py-4 last:border-0">
        <div class="flex items-center gap-4">
          <img :src="item.product.thumbnailUrls?.[0]" class="w-20 h-20 object-cover rounded">
          <div>
            <h3 class="font-bold">{{ item.product.name }}</h3>
            <p class="text-gray-500">{{ item.product.brand }}</p>
            <p class="text-blue-500 font-bold">${{ item.product.price.amount }}</p>
          </div>
        </div>
        <div class="flex items-center gap-6">
          <div class="font-semibold">Qty: {{ item.counts }}</div>
          <button @click="removeItem(item.product._id)" class="text-red-500 hover:text-red-700">
            <font-awesome-icon icon="trash" />
          </button>
        </div>
      </div>
      <div class="mt-6 flex justify-between items-center pt-4 border-t-2">
        <span class="text-xl font-bold">Total:</span>
        <span class="text-2xl font-bold text-blue-500">${{ total.toFixed(2) }}</span>
      </div>
      <router-link to="/checkout" class="w-full btn btn-primary mt-6 text-lg block text-center">Checkout</router-link>
    </div>
    <div v-else class="text-center py-12 bg-white rounded shadow">
      <p class="text-gray-500 text-lg">Your Cart Is Empty.</p>
      <router-link to="/" class="btn btn-secondary mt-4 inline-block">Start Shopping</router-link>
    </div>
  </div>
</template>
<script setup lang="ts">
defineOptions({ name: 'ShoppingCart' })
import { computed, onMounted } from 'vue'
import { useStore } from 'vuex'
const store = useStore()
const items = computed(() => store.getters['cart/cartItems'])
const total = computed(() => store.getters['cart/cartTotal'])
onMounted(() => { store.dispatch('cart/fetchCart') })
const removeItem = (id: string) => { store.dispatch('cart/removeFromCart', id) }
</script>