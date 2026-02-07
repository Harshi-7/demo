// store/modules/wallet.module.ts
import { MockApiService } from '../../services/mockApi.service';
import { Wallet, Transaction } from "../types/wallet.types";

export interface WalletState {
  wallets: Wallet[];
  loading: boolean;
  error: string | null;
}

const state: WalletState = {
  wallets: [],
  loading: false,
  error: null
};

const getters = {
  getAllWallets: (state: WalletState) => state.wallets,
  getWalletById: (state: WalletState) => (id: number) => 
    state.wallets.find(wallet => wallet.id === id),
  getUserWallet: (state: WalletState) => (userId: number) => 
    state.wallets.find(wallet => wallet.userId === userId),
  getWalletsByUser: (state: WalletState) => (userId: number) => 
    state.wallets.filter(wallet => wallet.userId === userId),
  isLoading: (state: WalletState) => state.loading,
  error: (state: WalletState) => state.error,
  totalBalance: (state: WalletState) => 
    state.wallets.reduce((sum, wallet) => sum + wallet.balance, 0),
  averageBalance: (state: WalletState) => 
    state.wallets.length > 0 
      ? Math.round(state.wallets.reduce((sum, wallet) => sum + wallet.balance, 0) / state.wallets.length)
      : 0,
  totalTransactions: (state: WalletState) => 
    state.wallets.reduce((sum, wallet) => sum + wallet.transactions.length, 0)
};

const mutations = {
  SET_WALLETS(state: WalletState, wallets: Wallet[]) {
    state.wallets = wallets;
  },
  
  ADD_WALLET(state: WalletState, wallet: Wallet) {
    state.wallets.push(wallet);
  },
  
  UPDATE_WALLET(state: WalletState, updatedWallet: Wallet) {
    const index = state.wallets.findIndex(w => w.id === updatedWallet.id);
    if (index !== -1) {
      state.wallets[index] = updatedWallet;
    }
  },
  
  DELETE_WALLET(state: WalletState, walletId: number) {
    state.wallets = state.wallets.filter(wallet => wallet.id !== walletId);
  },
  
  UPDATE_WALLET_BALANCE(state: WalletState, payload: { walletId: number; amount: number }) {
    const wallet = state.wallets.find(w => w.id === payload.walletId);
    if (wallet) {
      wallet.balance += payload.amount;
      
      const transaction: Transaction = {
        id: wallet.transactions.length + 1,
        amount: Math.abs(payload.amount),
        type: payload.amount > 0 ? 'DEPOSIT' : 'WITHDRAWAL',
        date: new Date().toISOString(),
        description: payload.amount > 0 ? 'Deposit' : 'Withdrawal'
      };
      
      wallet.transactions.push(transaction);
    }
  },
  
  ADD_TRANSACTION(state: WalletState, payload: { walletId: number; transaction: Transaction }) {
    const wallet = state.wallets.find(w => w.id === payload.walletId);
    if (wallet) {
      if (payload.transaction.type === 'DEPOSIT') {
        wallet.balance += payload.transaction.amount;
      } else if (payload.transaction.type === 'WITHDRAWAL') {
        wallet.balance -= payload.transaction.amount;
      }
      wallet.transactions.push(payload.transaction);
    }
  },
  
  SET_LOADING(state: WalletState, loading: boolean) {
    state.loading = loading;
  },
  
  SET_ERROR(state: WalletState, error: string) {
    state.error = error;
  },
  
  CLEAR_ERROR(state: WalletState) {
    state.error = null;
  }
};

const actions = {
  async fetchWallets({ commit }: { commit: any }) {
    try {
      commit('SET_LOADING', true);
      commit('CLEAR_ERROR');
      
      const wallets = await MockApiService.getWallets();
      commit('SET_WALLETS', wallets);
      return wallets;
    } catch (error: any) {
      commit('SET_ERROR', error.message);
      throw error;
    } finally {
      commit('SET_LOADING', false);
    }
  },
  
  async createWallet({ commit }: { commit: any }, 
                    walletData: { userId: number; initialBalance: number }) {
    try {
      commit('SET_LOADING', true);
      commit('CLEAR_ERROR');
      
      const newWallet = await MockApiService.createWallet(walletData);
      commit('ADD_WALLET', newWallet);
      return newWallet;
    } catch (error: any) {
      commit('SET_ERROR', error.message);
      throw error;
    } finally {
      commit('SET_LOADING', false);
    }
  },
  
  async updateBalance({ commit }: { commit: any }, 
                     payload: { walletId: number; amount: number }) {
    try {
      commit('SET_LOADING', true);
      commit('CLEAR_ERROR');
      
      const response = await MockApiService.updateWalletBalance(payload.walletId, payload.amount);
      
      if (response.success) {
        commit('UPDATE_WALLET_BALANCE', payload);
        return response;
      } else {
        throw new Error('Failed to update wallet balance');
      }
    } catch (error: any) {
      commit('SET_ERROR', error.message);
      throw error;
    } finally {
      commit('SET_LOADING', false);
    }
  },
  
  async deposit({ commit }: { commit: any }, 
               payload: { walletId: number; amount: number }) {
    if (payload.amount <= 0) {
      throw new Error('Deposit amount must be greater than 0');
    }
    return actions.updateBalance({ commit }, payload);
  },
  
  async withdraw({ commit, state }: { commit: any; state: WalletState }, 
                payload: { walletId: number; amount: number }) {
    if (payload.amount <= 0) {
      throw new Error('Withdrawal amount must be greater than 0');
    }
    
    const wallet = state.wallets.find(w => w.id === payload.walletId);
    if (wallet && wallet.balance < payload.amount) {
      throw new Error('Insufficient balance');
    }
    
    return actions.updateBalance({ commit }, { 
      walletId: payload.walletId, 
      amount: -payload.amount 
    });
  },
  
  async addTransaction({ commit }: { commit: any }, 
                      payload: { walletId: number; transaction: Transaction }) {
    try {
      commit('SET_LOADING', true);
      commit('CLEAR_ERROR');
      
      commit('ADD_TRANSACTION', payload);
      return payload.transaction;
    } catch (error: any) {
      commit('SET_ERROR', error.message);
      throw error;
    } finally {
      commit('SET_LOADING', false);
    }
  },
  
  async deleteWallet({ commit }: { commit: any }, walletId: number) {
    try {
      commit('SET_LOADING', true);
      commit('CLEAR_ERROR');
      
      commit('DELETE_WALLET', walletId);
      return true;
    } catch (error: any) {
      commit('SET_ERROR', error.message);
      throw error;
    } finally {
      commit('SET_LOADING', false);
    }
  }
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};