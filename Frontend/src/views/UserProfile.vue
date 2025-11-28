<template>
  <div class="max-w-4xl mx-auto">
    <h2 class="text-3xl font-bold mb-6">My Profile</h2>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div class="bg-white p-6 rounded shadow">
        <h3 class="text-xl font-bold mb-4">Saved Addresses</h3>
        <div v-if="addresses.length === 0" class="text-gray-500">No Addresses Saved.</div>
        <div v-else class="space-y-4">
          <div v-for="addr in addresses" :key="addr._id" class="border p-4 rounded relative">
            <button @click="deleteAddr(addr._id)" class="absolute top-2 right-2 text-red-500"><font-awesome-icon
                icon="trash" /></button>
            <p class="font-bold">{{ addr.fullName }}</p>
            <p>{{ addr.addressLine1 }}</p>
            <p>{{ addr.city }}, {{ addr.state }} {{ addr.zipCode }}</p>
            <p>{{ addr.country }}</p>
            <p>Phone: {{ addr.phoneNumber }}</p>
          </div>
        </div>
      </div>
      <div class="bg-white p-6 rounded shadow">
        <h3 class="text-xl font-bold mb-4">Add New Address</h3>
        <form @submit.prevent="saveAddress" class="space-y-3">
          <input v-model="newAddr.fullName" placeholder="Full Name" class="input-field" required>
          <input v-model="newAddr.phoneNumber" placeholder="Phone Number" class="input-field" required>
          <input v-model="newAddr.addressLine1" placeholder="Address Line 1" class="input-field" required>
          <input v-model="newAddr.addressLine2" placeholder="Address Line 2" class="input-field">
          <div class="grid grid-cols-2 gap-2">
            <input v-model="newAddr.city" placeholder="City" class="input-field" required>
            <input v-model="newAddr.state" placeholder="State" class="input-field" required>
          </div>
          <div class="grid grid-cols-2 gap-2">
            <input v-model="newAddr.zipCode" placeholder="Zip Code" class="input-field" required>
            <input v-model="newAddr.country" placeholder="Country" class="input-field" required>
          </div>
          <button type="submit" class="btn btn-secondary w-full">Save Address</button>
        </form>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { reactive, computed, onMounted } from 'vue'
import { useStore } from 'vuex'
import { notify } from '@kyvg/vue3-notification'
const store = useStore()
const addresses = computed(() => store.getters['user/myAddresses'])
const newAddr = reactive({ fullName: '', phoneNumber: '', addressLine1: '', addressLine2: '', city: '', state: '', zipCode: '', country: '' })
onMounted(() => { store.dispatch('user/fetchAddresses') })
const saveAddress = async () => { try { await store.dispatch('user/addAddress', newAddr); notify({ type: 'success', text: 'Address Saved' }); Object.keys(newAddr).forEach(key => (newAddr as any)[key] = ''); } catch { notify({ type: 'error', text: 'Failed To Save Address' }); } }
const deleteAddr = async (id: string) => { if (confirm('Delete This Address?')) { await store.dispatch('user/deleteAddress', id); } }
defineOptions({ name: 'UserProfilePage' })
</script>