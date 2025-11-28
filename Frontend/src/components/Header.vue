<template>
  <div v-if="isAuthenticated" class="flex items-center space-x-4">
    <router-link to="/orders" class="text-sm text-gray-600 hover:text-primary">Orders</router-link>
    <router-link to="/profile" class="text-sm text-gray-600 hover:text-primary">Profile</router-link>
    <span class="font-medium text-gray-800">{{ user?.name }}</span>
    <button @click="logout" class="text-sm text-red-500 hover:underline">Logout</button>
  </div>
</template>
<script setup lang="ts">
defineOptions({ name: 'AppHeader' })
import { computed } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
const store = useStore()
const router = useRouter()
const user = computed(() => (store.state as any).auth?.user || (store.state as any).user?.profile || null)
const isAuthenticated = computed(() => Boolean((store.state as any).auth?.token || localStorage.getItem('token')))
const logout = async () => { try { if ((store as any).dispatch) await (store as any).dispatch('auth/logout'); } catch { } localStorage.removeItem('token'); router.push('/login'); }
</script>