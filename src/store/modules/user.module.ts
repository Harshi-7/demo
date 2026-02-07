// store/modules/user.module.ts
import { MockApiService } from '../../services/mockApi.service';
import { User } from "../types/user.types";
import { ApprovalStatus } from "../../enums/ApprovalStatus";

export interface UserState {
  users: User[];
  pendingUsers: User[];
  loading: boolean;
  error: string | null;
}

const state: UserState = {
  users: [],
  pendingUsers: [],
  loading: false,
  error: null
};

const getters = {
  getAllUsers: (state: UserState) => state.users,
  getApprovedUsers: (state: UserState) => 
    state.users.filter(user => user.approvalStatus === ApprovalStatus.APPROVED),
  getPendingUsers: (state: UserState) => 
    state.users.filter(user => user.approvalStatus === ApprovalStatus.PENDING),
  getRejectedUsers: (state: UserState) => 
    state.users.filter(user => user.approvalStatus === ApprovalStatus.REJECTED),
  getUserById: (state: UserState) => (id: number) => 
    state.users.find(user => user.id === id),
  isLoading: (state: UserState) => state.loading,
  error: (state: UserState) => state.error,
  pendingCount: (state: UserState) => 
    state.users.filter(user => user.approvalStatus === ApprovalStatus.PENDING).length,
  approvedCount: (state: UserState) => 
    state.users.filter(user => user.approvalStatus === ApprovalStatus.APPROVED).length,
  rejectedCount: (state: UserState) => 
    state.users.filter(user => user.approvalStatus === ApprovalStatus.REJECTED).length
};

const mutations = {
  SET_USERS(state: UserState, users: User[]) {
    state.users = users;
  },
  
  ADD_USER(state: UserState, user: User) {
    state.users.push(user);
  },
  
  UPDATE_USER(state: UserState, updatedUser: User) {
    const index = state.users.findIndex(u => u.id === updatedUser.id);
    if (index !== -1) {
      state.users[index] = updatedUser;
    }
  },
  
  DELETE_USER(state: UserState, userId: number) {
    state.users = state.users.filter(user => user.id !== userId);
  },
  
  SET_LOADING(state: UserState, loading: boolean) {
    state.loading = loading;
  },
  
  SET_ERROR(state: UserState, error: string) {
    state.error = error;
  },
  
  CLEAR_ERROR(state: UserState) {
    state.error = null;
  }
};

const actions = {
  async fetchUsers({ commit }: { commit: any }) {
    try {
      commit('SET_LOADING', true);
      commit('CLEAR_ERROR');
      
      const users = await MockApiService.getUsers();
      commit('SET_USERS', users);
      return users;
    } catch (error: any) {
      commit('SET_ERROR', error.message);
      throw error;
    } finally {
      commit('SET_LOADING', false);
    }
  },
  
  async addUser({ commit }: { commit: any }, userData: Omit<User, 'id' | 'approvalStatus'>) {
    try {
      commit('SET_LOADING', true);
      commit('CLEAR_ERROR');
      
      const newUser: User = {
        ...userData,
        id: Date.now(),
        approvalStatus: userData.role === 'ADMIN' ? ApprovalStatus.APPROVED : ApprovalStatus.PENDING
      };
      
      commit('ADD_USER', newUser);
      return newUser;
    } catch (error: any) {
      commit('SET_ERROR', error.message);
      throw error;
    } finally {
      commit('SET_LOADING', false);
    }
  },
  
  async updateUser({ commit }: { commit: any }, userData: User) {
    try {
      commit('SET_LOADING', true);
      commit('CLEAR_ERROR');
      
      commit('UPDATE_USER', userData);
      return userData;
    } catch (error: any) {
      commit('SET_ERROR', error.message);
      throw error;
    } finally {
      commit('SET_LOADING', false);
    }
  },
  
  async updateApprovalStatus({ commit }: { commit: any }, 
                            payload: { id: number; status: ApprovalStatus; password?: string }) {
    try {
      commit('SET_LOADING', true);
      commit('CLEAR_ERROR');
      
      const response = await MockApiService.updateUserApprovalStatus(
        payload.id, 
        payload.status, 
        payload.password
      );
      
      // Update local state
      commit('UPDATE_USER', {
        id: payload.id,
        approvalStatus: payload.status,
        ...(payload.password && { password: payload.password })
      });
      
      return response;
    } catch (error: any) {
      commit('SET_ERROR', error.message);
      throw error;
    } finally {
      commit('SET_LOADING', false);
    }
  },
  
  async deleteUser({ commit }: { commit: any }, userId: number) {
    try {
      commit('SET_LOADING', true);
      commit('CLEAR_ERROR');
      
      commit('DELETE_USER', userId);
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