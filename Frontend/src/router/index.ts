import { createRouter, createWebHistory } from 'vue-router'
import home from '@/views/Home.vue'
import login from '@/views/Login.vue'
import signup from '@/views/Signup.vue'
import productDetail from '@/views/ProductDetail.vue'
import cart from '@/views/Cart.vue'
import checkout from '@/views/Checkout.vue'
import userProfile from '@/views/UserProfile.vue'
import orderHistory from '@/views/OrderHistory.vue'
const routes = [{ path: '/', name: 'Home', component: home }, { path: '/login', name: 'Login', component: login }, { path: '/signup', name: 'Signup', component: signup }, { path: '/product/:id', name: 'ProductDetail', component: productDetail, props: true }, { path: '/cart', name: 'Cart', component: cart, meta: { requiresAuth: true } }, { path: '/checkout', name: 'Checkout', component: checkout, meta: { requiresAuth: true } }, { path: '/profile', name: 'UserProfile', component: userProfile, meta: { requiresAuth: true } }, { path: '/orders', name: 'OrderHistory', component: orderHistory, meta: { requiresAuth: true } }]
const router = createRouter({ history: createWebHistory(), routes })
router.beforeEach((to, from, next) => { const isAuthenticated = localStorage.getItem('token'); if (to.meta.requiresAuth && !isAuthenticated) { next('/login') } else { next() } })
export default router