<template>
  <div class="max-w-4xl mx-auto">
    <h2 class="text-3xl font-bold mb-6">Order History</h2>
    <div v-if="orders.length" class="space-y-4">
      <div v-for="order in orders" :key="order._id" class="bg-white p-6 rounded shadow">
        <div class="flex justify-between border-b pb-2 mb-4">
          <div>
            <span class="font-bold">Order #{{ order._id }}</span>
            <span class="ml-4 text-sm text-gray-500">{{ formatDate(order.createdAt) }}</span>
          </div>
          <div class="font-bold text-primary">{{ order.overallStatus }}</div>
        </div>
        <div class="space-y-2">
          <div v-for="item in order.items" :key="item.product ? item.product._id : item._id"
            class="flex justify-between items-center">
            <div class="flex items-center">
              <img v-if="item.product && item.product.thumbnailUrls" :src="item.product.thumbnailUrls[0]"
                class="w-12 h-12 object-cover rounded mr-4">
              <span>{{ item.product ? item.product.name : 'Product Unavailable' }} (x{{ item.counts }})</span>
            </div>
            <span v-if="item.product">${{ item.product.price.amount }}</span>
          </div>
        </div>
        <div class="mt-4 pt-2 border-t flex justify-end"><span class="font-bold">Total: ${{ calculateTotal(order)
        }}</span></div>
      </div>
    </div>
    <div v-else class="text-center py-12">No Orders Found.</div>
  </div>
</template>
<script setup lang="ts">
defineOptions({ name: 'OrderHistoryPage' })
import { computed, onMounted } from 'vue'
import { useStore } from 'vuex'
import moment from 'moment'
const store = useStore(); const orders = computed(() => store.getters['user/myOrders'])
onMounted(() => { store.dispatch('user/fetchOrderList') })
const formatDate = (date: string) => moment(date).format('MMM Do YYYY')
const calculateTotal = (order: any) => { if (!order.items) return '0.00'; return order.items.reduce((acc: number, item: any) => { const price = item.product && item.product.price ? item.product.price.amount : 0; return acc + (price * item.counts) }, 0).toFixed(2) }
</script>