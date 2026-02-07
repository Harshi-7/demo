// store/modules/payment.module.ts
import { MockApiService } from '../../services/mockApi.service';
import { Payment } from "../types/payment.types";
import { PaymentStatus } from "../../enums/PaymentStatus";

export interface PaymentState {
  payments: Payment[];
  loading: boolean;
  error: string | null;
}

const state: PaymentState = {
  payments: [],
  loading: false,
  error: null
};

const getters = {
  getAllPayments: (state: PaymentState) => state.payments,
  getPaymentById: (state: PaymentState) => (id: number) => 
    state.payments.find(payment => payment.id === id),
  getPaymentsByWallet: (state: PaymentState) => (walletId: number) => 
    state.payments.filter(payment => payment.walletId === walletId),
  getPaymentsByStatus: (state: PaymentState) => (status: PaymentStatus) => 
    state.payments.filter(payment => payment.status === status),
  isLoading: (state: PaymentState) => state.loading,
  error: (state: PaymentState) => state.error,
  pendingPaymentsCount: (state: PaymentState) => 
    state.payments.filter(p => p.status === PaymentStatus.PENDING).length,
  processingPaymentsCount: (state: PaymentState) => 
    state.payments.filter(p => p.status === PaymentStatus.PROCESSING).length,
  completedPaymentsCount: (state: PaymentState) => 
    state.payments.filter(p => p.status === PaymentStatus.COMPLETED).length,
  totalPaymentAmount: (state: PaymentState) => 
    state.payments.reduce((sum, payment) => sum + payment.amount, 0)
};

const mutations = {
  SET_PAYMENTS(state: PaymentState, payments: Payment[]) {
    state.payments = payments;
  },
  
  ADD_PAYMENT(state: PaymentState, payment: Payment) {
    state.payments.push(payment);
  },
  
  UPDATE_PAYMENT(state: PaymentState, updatedPayment: Payment) {
    const index = state.payments.findIndex(p => p.id === updatedPayment.id);
    if (index !== -1) {
      state.payments[index] = updatedPayment;
    }
  },
  
  DELETE_PAYMENT(state: PaymentState, paymentId: number) {
    state.payments = state.payments.filter(payment => payment.id !== paymentId);
  },
  
  UPDATE_PAYMENT_STATUS(state: PaymentState, payload: { id: number; status: PaymentStatus }) {
    const payment = state.payments.find(p => p.id === payload.id);
    if (payment) {
      payment.status = payload.status;
    }
  },
  
  SET_LOADING(state: PaymentState, loading: boolean) {
    state.loading = loading;
  },
  
  SET_ERROR(state: PaymentState, error: string) {
    state.error = error;
  },
  
  CLEAR_ERROR(state: PaymentState) {
    state.error = null;
  }
};

const actions = {
  async fetchPayments({ commit }: { commit: any }) {
    try {
      commit('SET_LOADING', true);
      commit('CLEAR_ERROR');
      
      const payments = await MockApiService.getPayments();
      commit('SET_PAYMENTS', payments);
      return payments;
    } catch (error: any) {
      commit('SET_ERROR', error.message);
      throw error;
    } finally {
      commit('SET_LOADING', false);
    }
  },
  
  async createPayment({ commit }: { commit: any }, 
                     paymentData: { amount: number; walletId: number; reference: string }) {
    try {
      commit('SET_LOADING', true);
      commit('CLEAR_ERROR');
      
      if (paymentData.amount <= 0) {
        throw new Error('Payment amount must be greater than 0');
      }
      
      const newPayment = await MockApiService.createPayment(paymentData);
      commit('ADD_PAYMENT', newPayment);
      return newPayment;
    } catch (error: any) {
      commit('SET_ERROR', error.message);
      throw error;
    } finally {
      commit('SET_LOADING', false);
    }
  },
  
  async updatePaymentStatus({ commit }: { commit: any }, 
                           payload: { id: number; status: PaymentStatus }) {
    try {
      commit('SET_LOADING', true);
      commit('CLEAR_ERROR');
      
      const response = await MockApiService.updatePaymentStatus(payload.id, payload.status);
      
      if (response.success) {
        commit('UPDATE_PAYMENT_STATUS', payload);
        return response;
      } else {
        throw new Error('Failed to update payment status');
      }
    } catch (error: any) {
      commit('SET_ERROR', error.message);
      throw error;
    } finally {
      commit('SET_LOADING', false);
    }
  },
  
  async deletePayment({ commit }: { commit: any }, paymentId: number) {
    try {
      commit('SET_LOADING', true);
      commit('CLEAR_ERROR');
      
      commit('DELETE_PAYMENT', paymentId);
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