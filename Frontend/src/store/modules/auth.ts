import axios from '@/plugins/axios'
import proxyUrls from '@/constants/proxyUrls'
import type { ActionContext } from 'vuex'
interface AuthState { user: any | null; token: string | null; isAuthenticated: boolean }
export default {
	namespaced: true,
	state: { user: null, token: null, isAuthenticated: false } as AuthState,
	mutations: {
		setUser(state: AuthState, user: any) { state.user = user; state.isAuthenticated = !!user },
		setToken(state: AuthState, token: string) { state.token = token; localStorage.setItem('token', token); },
		logout(state: AuthState) { state.user = null; state.token = null; state.isAuthenticated = false; localStorage.removeItem('token'); }
	},
	actions: {
		async login({ commit }: ActionContext, credentials: any) { try { const { data } = await axios.post(proxyUrls.login, credentials); commit('setToken', data.id); commit('setUser', data); return true } catch (error) { throw error } },
		async signup(_: ActionContext, userData: any) { try { const { data } = await axios.post(proxyUrls.signup, userData); return data } catch (error) { throw error } },
		async checkAuth({ commit }: ActionContext) { try { const { data } = await axios.get(proxyUrls.isSessionActive); if (data.user) { commit('setUser', data.user) } } catch { commit('logout') } },
		async logout({ commit }: ActionContext) { commit('logout') }
	},
	getters: { currentUser: (state: AuthState) => state.user, isAuthenticated: (state: AuthState) => state.isAuthenticated }
}