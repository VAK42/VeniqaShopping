import axios from '@/plugins/axios'
import proxyUrls from '@/constants/proxyUrls'
import type { ActionContext } from 'vuex'
interface UserState { addresses: any[]; orders: any[] }
export default {
  namespaced: true,
  state: { addresses: [], orders: [] } as UserState,
  mutations: { setAddresses(state: UserState, addresses: any[]) { state.addresses = addresses; }, setOrders(state: UserState, orders: any[]) { state.orders = orders; } },
  actions: {
    async fetchAddresses({ commit }: ActionContext) { try { const { data } = await axios.get(proxyUrls.address); commit('setAddresses', data) } catch (error) { console.error(error) } },
    async addAddress({ dispatch }: ActionContext, address: any) { try { await axios.post(proxyUrls.address, address); dispatch('fetchAddresses') } catch (error) { throw error } },
    async deleteAddress({ dispatch }: ActionContext, addressId: string) { try { await axios.delete(proxyUrls.address, { data: { _id: addressId } }); dispatch('fetchAddresses') } catch (error) { throw error } },
    async fetchOrderList({ commit }: ActionContext) { try { const { data } = await axios.post(proxyUrls.orderList, {}); commit('setOrders', data) } catch (error) { console.error(error) } }
  },
  getters: { myAddresses: (state: UserState) => state.addresses, myOrders: (state: UserState) => state.orders }
}