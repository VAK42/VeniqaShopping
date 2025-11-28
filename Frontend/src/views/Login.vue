<template>
  <div class="flex justify-center items-center h-[80vh]">
    <div class="bg-white p-8 rounded shadow-md w-full max-w-md">
      <h2 class="text-2xl font-bold mb-6 text-center">Login</h2>
      <form @submit.prevent="handleLogin" class="space-y-4">
        <div>
          <label class="block text-gray-700 mb-1">Email</label>
          <input v-model="email" type="email" class="input-field" required>
        </div>
        <div>
          <label class="block text-gray-700 mb-1">Password</label>
          <input v-model="password" type="password" class="input-field" required>
        </div>
        <button type="submit" class="w-full btn btn-primary">Sign In</button>
      </form>
      <p class="mt-4 text-center text-sm text-gray-600">Don't Have An Account? <router-link to="/signup"
          class="text-blue-500">Sign Up</router-link></p>
    </div>
  </div>
</template>
<script setup lang="ts">
defineOptions({ name: 'LoginPage' })
import { ref } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { notify } from '@kyvg/vue3-notification'
const store = useStore(); const router = useRouter(); const email = ref(''); const password = ref('')
const handleLogin = async () => { try { await store.dispatch('auth/login', { email: email.value, password: password.value }); router.push('/'); notify({ type: 'success', text: 'Welcome Back' }) } catch { notify({ type: 'error', text: 'Invalid Credentials' }) } }
</script>