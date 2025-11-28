<template>
  <div class="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
    <div class="md:col-span-2 space-y-6">
      <div class="bg-white p-6 rounded shadow">
        <h3 class="text-xl font-bold mb-4">Shipping Address</h3>
        <select v-model="selectedAddressId" class="input-field mb-4">
          <option value="" disabled>Select Address</option>
          <option v-for="addr in addresses" :key="addr._id" :value="addr._id">{{ addr.addressLine1 }}, {{ addr.city }}
          </option>
        </select>
        <router-link to="/profile" class="text-primary text-sm hover:underline">Manage Addresses</router-link>
      </div>
      <div class="bg-white p-6 rounded shadow">
        <h3 class="text-xl font-bold mb-4">Payment Method</h3>
        <div class="p-4 border rounded bg-gray-50">
          <label class="flex items-center"><input type="radio" checked class="mr-2"> Credit Card (Stripe)</label>
        </div>
      </div>
    </div>
    <div class="bg-white p-6 rounded shadow h-fit">
      <h3 class="text-xl font-bold mb-4">Order Summary</h3>
      <div class="flex justify-between mb-2"><span>Subtotal</span><span>${{ total.toFixed(2) }}</span></div>
      <div class="flex justify-between font-bold text-lg border-t pt-2 mt-2"><span>Total</span><span>${{
        total.toFixed(2) }}</span></div>
      <button @click="placeOrder" class="w-full btn btn-primary mt-6" :disabled="!selectedAddressId">Place
        Order</button>
    </div>
  </div>
</template>
<script setup lang="ts">
defineOptions({ name: 'CheckoutPage' })
import { ref, computed, onMounted } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { notify } from '@kyvg/vue3-notification'
import axios from '@/plugins/axios'
import proxyUrls from '@/constants/proxyUrls'
const store = useStore()
const router = useRouter()
const selectedAddressId = ref('')
const addresses = computed(() => store.getters['user/myAddresses'])
const total = computed(() => store.getters['cart/cartTotal'])
onMounted(() => { store.dispatch('user/fetchAddresses'); store.dispatch('cart/fetchCart') })
const placeOrder = async () => { try { const checkoutRes = await axios.post(proxyUrls.createCheckout, { shippingAddressId: selectedAddressId.value, billingAddressId: selectedAddressId.value, paymentMethod: 'STRIPE' }); await axios.post(proxyUrls.completeCheckout, { checkoutId: checkoutRes.data._id }); notify({ type: 'success', text: 'Order Placed Successfully!' }); router.push('/orders') } catch { notify({ type: 'error', text: 'Order Failed' }) } }
</script>