// store/modules/auth.module.ts
export interface UserData {
  name: string;
  email: string;
}

export interface AuthState {
  isAuthenticated: boolean;
  userId: number | null;
  userRole: string | null;
  token: string | null;
  userData: UserData | null;
}

const state: AuthState = {
  isAuthenticated: true, // For demo purposes
  userId: 1,
  userRole: 'ADMIN', // Change to 'CUSTOMER' or 'FINANCE_MANAGER' to test different roles
  token: 'demo-jwt-token',
  userData: {
    name: 'John Doe',
    email: 'john@example.com'
  }
};

const getters = {
  isAuthenticated: (state: AuthState) => state.isAuthenticated,
  userId: (state: AuthState) => state.userId,
  userRole: (state: AuthState) => state.userRole,
  token: (state: AuthState) => state.token,
  userData: (state: AuthState) => state.userData,
  userName: (state: AuthState) => state.userData?.name || 'User',
  userEmail: (state: AuthState) => state.userData?.email || '',
  
  // Role-based getters
  isAdmin: (state: AuthState) => state.userRole === 'ADMIN',
  isCustomer: (state: AuthState) => state.userRole === 'CUSTOMER',
  isFinanceManager: (state: AuthState) => state.userRole === 'FINANCE_MANAGER'
};

const mutations = {
  SET_AUTH(state: AuthState, payload: { 
    userId: number; 
    userRole: string; 
    token: string;
    userData: UserData 
  }) {
    state.isAuthenticated = true;
    state.userId = payload.userId;
    state.userRole = payload.userRole;
    state.token = payload.token;
    state.userData = payload.userData;
  },
  
  LOGOUT(state: AuthState) {
    state.isAuthenticated = false;
    state.userId = null;
    state.userRole = null;
    state.token = null;
    state.userData = null;
  },
  
  UPDATE_USER_DATA(state: AuthState, userData: Partial<UserData>) {
    if (state.userData) {
      state.userData = { ...state.userData, ...userData };
    }
  },
  
  CHANGE_ROLE(state: AuthState, newRole: string) {
    state.userRole = newRole;
  }
};

const actions = {
  async login({ commit }: { commit: any }, credentials: { email: string; password: string; role?: string }) {
    // Demo login - in real app, call API
    const role = credentials.role || 'ADMIN'; // Default to ADMIN for demo
    
    commit('SET_AUTH', {
      userId: 1,
      userRole: role,
      token: 'demo-jwt-token-123456',
      userData: {
        name: credentials.role === 'ADMIN' ? 'Admin User' : 
               credentials.role === 'FINANCE_MANAGER' ? 'Finance Manager' : 'Customer User',
        email: credentials.email
      }
    });
    return true;
  },
  
  async register({ commit }: { commit: any }, userData: { name: string; email: string; password: string; role: string }) {
    // Demo registration
    commit('SET_AUTH', {
      userId: Math.floor(Math.random() * 1000) + 100,
      userRole: userData.role,
      token: 'demo-registration-token',
      userData: {
        name: userData.name,
        email: userData.email
      }
    });
    return true;
  },
  
  logout({ commit }: { commit: any }) {
    commit('LOGOUT');
  },
  
  updateProfile({ commit }: { commit: any }, userData: Partial<UserData>) {
    commit('UPDATE_USER_DATA', userData);
  },
  
  changeRole({ commit }: { commit: any }, newRole: string) {
    commit('CHANGE_ROLE', newRole);
  }
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};