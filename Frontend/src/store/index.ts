import { createStore } from 'vuex'
import VuexPersistence from 'vuex-persist'
import auth from './modules/auth'
import cart from './modules/cart'
import products from './modules/products'
import user from './modules/user'
const vuexPersistence = new VuexPersistence({ storage: window.localStorage, modules: ['auth', 'cart'] })
export default createStore({ modules: { auth, cart, products, user }, plugins: [vuexPersistence.plugin] })