// store/index.ts
import { createStore } from 'vuex';
import authModule from './modules/auth.module';
import userModule from './modules/user.module';
import walletModule from './modules/wallet.module';
import paymentModule from './modules/payment.module';

export default createStore({
  modules: {
    auth: authModule,
    user: userModule,
    wallet: walletModule,
    payment: paymentModule
  },
  
  // Global state, mutations, actions, getters (if needed)
  state: {
    loading: false,
    error: null
  },
  
  mutations: {
    SET_LOADING(state: { loading: any; }, loading: any) {
      state.loading = loading;
    },
    SET_ERROR(state: { error: any; }, error: any) {
      state.error = error;
    }
  },
  
  actions: {
    clearError({ commit }) {
      commit('SET_ERROR', null);
    }
  },
  
  getters: {
    isLoading: (state: { loading: any; }) => state.loading,
    getError: (state: { error: any; }) => state.error
  }
});