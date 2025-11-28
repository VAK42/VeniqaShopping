import axios from '@/plugins/axios'
import proxyUrls from '@/constants/proxyUrls'
import type { ActionContext } from 'vuex'
interface CartState { items: any[]; totalPrice: number }
export default {
  namespaced: true,
  state: { items: [], totalPrice: 0 } as CartState,
  mutations: { setCart(state: CartState, cartData: any) { const items = cartData.items || []; state.items = items; state.totalPrice = items.reduce((sum: number, item: any) => { const price = item.product?.price?.amount || 0; return sum + (price * item.counts) }, 0) } },
  actions: {
    async fetchCart({ commit }: ActionContext) { try { const { data } = await axios.get(proxyUrls.getCart); commit('setCart', data) } catch (error) { console.error(error) } },
    async addToCart({ dispatch }: ActionContext, productId: string) { try { await axios.post(proxyUrls.addToCart, { productId: productId }); dispatch('fetchCart') } catch (error) { throw error } },
    async removeFromCart({ dispatch }: ActionContext, productId: string) { try { await axios.delete(proxyUrls.deleteFromCart, { data: { productId: productId } }); dispatch('fetchCart') } catch (error) { throw error } }
  },
  getters: { cartItems: (state: CartState) => state.items, cartTotal: (state: CartState) => state.totalPrice, cartCount: (state: CartState) => state.items.reduce((acc: number, item: any) => acc + item.counts, 0) }
}