<template>
  <div class="flex justify-center items-center h-[80vh]">
    <div class="bg-white p-8 rounded shadow-md w-full max-w-md">
      <h2 class="text-2xl font-bold mb-6 text-center">Create Account</h2>
      <form @submit.prevent="handleSignup" class="space-y-4">
        <div>
          <label class="block text-gray-700 mb-1">Full Name</label>
          <input v-model="form.name" type="text" class="input-field" required>
        </div>
        <div>
          <label class="block text-gray-700 mb-1">Email</label>
          <input v-model="form.email" type="email" class="input-field" required>
        </div>
        <div>
          <label class="block text-gray-700 mb-1">Password</label>
          <input v-model="form.password" type="password" class="input-field" required>
        </div>
        <div>
          <label class="block text-gray-700 mb-1">Confirm Password</label>
          <input v-model="form.confirmPassword" type="password" class="input-field" required>
        </div>
        <button type="submit" class="w-full btn btn-primary">Sign Up</button>
      </form>
      <p class="mt-4 text-center text-sm text-gray-600">Already Have An Account? <router-link to="/login"
          class="text-primary">Login</router-link></p>
    </div>
  </div>
</template>
<script setup lang="ts">
defineOptions({ name: 'SignupPage' })
import { reactive } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { notify } from '@kyvg/vue3-notification'
const store = useStore(); const router = useRouter(); const form = reactive({ name: '', email: '', password: '', confirmPassword: '' })
const handleSignup = async () => { if (form.password !== form.confirmPassword) { notify({ type: 'error', text: 'Passwords Do Not Match' }); return } try { await store.dispatch('auth/signup', { name: form.name, email: form.email, password: form.password }); notify({ type: 'success', text: 'Account Created Please Login' }); router.push('/login') } catch { notify({ type: 'error', text: 'Signup Failed Try Again' }) } }
</script>