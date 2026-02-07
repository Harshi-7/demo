<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-50 to-purple-50 p-4 md:p-6">
    <!-- Animated Background Elements -->
    <div class="fixed inset-0 overflow-hidden pointer-events-none z-0">
      <div class="absolute top-10 right-10 w-64 h-64 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse-slow"></div>
      <div class="absolute bottom-10 left-10 w-80 h-80 bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse-slow animation-delay-2000"></div>
    </div>

    <div class="relative z-10 max-w-7xl mx-auto">
      <!-- Header -->
      <div class="mb-8">
        <div class="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
          <div class="flex items-center gap-4">
            <div class="w-14 h-14 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-2xl shadow-xl flex items-center justify-center">
              <svg class="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5 0c-.281 0-.543.038-.794.108m-1.206 2.088a5 5 0 00-10 0m10 0a5 5 0 01-10 0m10 0h6m-6 0H3"/>
              </svg>
            </div>
            <div>
              <h1 class="text-3xl font-bold bg-gradient-to-r from-purple-700 to-indigo-700 bg-clip-text text-transparent">
                User Management
              </h1>
              <p class="text-purple-600">Manage all approved user accounts</p>
            </div>
          </div>
          
          <!-- Action Buttons -->
          <div class="flex flex-wrap gap-3">
            <router-link to="/pending-approvals" 
                        class="group px-6 py-3 bg-gradient-to-r from-yellow-500 to-amber-600 text-white font-semibold rounded-xl 
                               shadow-lg shadow-yellow-500/30 hover:shadow-yellow-500/50 hover:scale-[1.02] transform transition-all duration-300
                               flex items-center gap-2">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
              Pending Approvals
              <span v-if="pendingCount > 0" class="ml-2 px-2 py-1 bg-yellow-800 text-white text-xs rounded-full">
                {{ pendingCount }}
              </span>
            </router-link>
            
            <button @click="addUser" 
                    class="group px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold rounded-xl 
                           shadow-lg shadow-green-500/30 hover:shadow-green-500/50 hover:scale-[1.02] transform transition-all duration-300
                           flex items-center gap-2">
              <svg class="w-5 h-5 transform group-hover:rotate-90 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
              </svg>
              Add User
            </button>
          </div>
        </div>

        <!-- Statistics Cards -->
        <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div class="bg-gradient-to-br from-white to-purple-50 backdrop-blur-sm border border-purple-200 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-sm font-medium text-purple-600">Total Users</p>
                <p class="text-3xl font-bold text-gray-900 mt-2">{{ totalUsers }}</p>
              </div>
              <div class="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                <svg class="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/>
                </svg>
              </div>
            </div>
            <div class="mt-4 pt-4 border-t border-purple-100">
              <p class="text-xs text-purple-500">All approved user accounts</p>
            </div>
          </div>

          <div class="bg-gradient-to-br from-white to-blue-50 backdrop-blur-sm border border-blue-200 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-sm font-medium text-blue-600">Customers</p>
                <p class="text-3xl font-bold text-gray-900 mt-2">{{ customerCount }}</p>
              </div>
              <div class="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                </svg>
              </div>
            </div>
            <div class="mt-4 pt-4 border-t border-blue-100">
              <p class="text-xs text-blue-500">Active customer accounts</p>
            </div>
          </div>

          <div class="bg-gradient-to-br from-white to-purple-50 backdrop-blur-sm border border-purple-200 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-sm font-medium text-purple-600">Admins</p>
                <p class="text-3xl font-bold text-gray-900 mt-2">{{ adminCount }}</p>
              </div>
              <div class="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                <svg class="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
              </div>
            </div>
            <div class="mt-4 pt-4 border-t border-purple-100">
              <p class="text-xs text-purple-500">Administrator accounts</p>
            </div>
          </div>

          <div class="bg-gradient-to-br from-white to-green-50 backdrop-blur-sm border border-green-200 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-sm font-medium text-green-600">Finance Managers</p>
                <p class="text-3xl font-bold text-gray-900 mt-2">{{ financeCount }}</p>
              </div>
              <div class="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
              </div>
            </div>
            <div class="mt-4 pt-4 border-t border-green-100">
              <p class="text-xs text-green-500">Financial staff accounts</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Users Table -->
      <div class="bg-white/90 backdrop-blur-sm border border-purple-200 rounded-2xl shadow-xl overflow-hidden">
        <div class="px-6 py-4 border-b border-purple-100">
          <h2 class="text-xl font-bold text-purple-800">Approved Users</h2>
          <p class="text-sm text-purple-600 mt-1">Manage user accounts and permissions</p>
        </div>
        
        <div class="overflow-x-auto">
          <table class="w-full">
            <thead class="bg-purple-50">
              <tr>
                <th class="p-4 text-left text-sm font-semibold text-purple-700 uppercase tracking-wider">User ID</th>
                <th class="p-4 text-left text-sm font-semibold text-purple-700 uppercase tracking-wider">User Details</th>
                <th class="p-4 text-left text-sm font-semibold text-purple-700 uppercase tracking-wider">Role</th>
                <th class="p-4 text-left text-sm font-semibold text-purple-700 uppercase tracking-wider">Status</th>
                <th class="p-4 text-left text-sm font-semibold text-purple-700 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-purple-100">
              <tr v-for="user in approvedUsers" :key="user.id" 
                  class="hover:bg-purple-50/50 transition-colors duration-150">
                <td class="p-4">
                  <div class="flex items-center">
                    <div class="w-10 h-10 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-lg flex items-center justify-center mr-3">
                      <span class="text-xs font-bold text-white">U</span>
                    </div>
                    <span class="font-medium text-gray-900">#{{ user.id }}</span>
                  </div>
                </td>
                <td class="p-4">
                  <div>
                    <div class="font-medium text-gray-900">{{ user.name }}</div>
                    <div class="text-sm text-gray-500">{{ user.email }}</div>
                    <div v-if="user.bankName" class="text-xs text-gray-400 mt-1">
                      {{ user.bankName }} • ••••{{ user.bankAccount?.slice(-4) }}
                    </div>
                  </div>
                </td>
                <td class="p-4">
                  <span class="inline-flex items-center px-3 py-2 rounded-full text-sm font-medium"
                    :class="{
                      'bg-purple-100 text-purple-800': user.role === 'ADMIN',
                      'bg-blue-100 text-blue-800': user.role === 'CUSTOMER',
                      'bg-green-100 text-green-800': user.role === 'FINANCE_MANAGER'
                    }">
                    <span :class="{
                      'bg-purple-500': user.role === 'ADMIN',
                      'bg-blue-500': user.role === 'CUSTOMER',
                      'bg-green-500': user.role === 'FINANCE_MANAGER'
                    }" class="w-2 h-2 rounded-full mr-2"></span>
                    {{ user.role }}
                  </span>
                </td>
                <td class="p-4">
                  <span class="inline-flex items-center px-3 py-2 rounded-full text-sm font-medium bg-green-100 text-green-800">
                    <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                    </svg>
                    APPROVED
                  </span>
                </td>
                <td class="p-4">
                  <div class="flex items-center gap-2">
                    <button @click="viewUserDetails(user.id)" 
                            class="px-3 py-2 bg-blue-50 text-blue-700 font-medium rounded-lg hover:bg-blue-100 
                                   transition-colors duration-300 text-sm flex items-center gap-1">
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
                      </svg>
                      View
                    </button>
                    <button @click="deleteUser(user.id)" 
                            class="px-3 py-2 bg-red-50 text-red-700 font-medium rounded-lg hover:bg-red-100 
                                   transition-colors duration-300 text-sm flex items-center gap-1">
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                      </svg>
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
          
          <!-- Empty State -->
          <div v-if="approvedUsers.length === 0" class="p-12 text-center">
            <div class="w-24 h-24 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg class="w-12 h-12 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
              </svg>
            </div>
            <h3 class="text-lg font-medium text-gray-900 mb-2">No approved users found</h3>
            <p class="text-gray-500 mb-6">All user accounts are currently pending approval</p>
            <router-link to="/pending-approvals" 
                        class="px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold rounded-xl 
                               shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50 transform transition-all duration-300
                               inline-flex items-center gap-2">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
              Go to Pending Approvals
            </router-link>
          </div>
        </div>
        
        <!-- Summary Footer -->
        <div class="px-6 py-4 bg-purple-50 border-t border-purple-100">
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div class="text-sm text-purple-700">
              Showing {{ approvedUsers.length }} approved users
              <span class="text-gray-400 mx-2">•</span>
              <span class="text-yellow-600">{{ pendingCount }} pending approvals</span>
            </div>
            <div class="flex items-center gap-4">
              <button @click="refreshUsers" 
                      class="px-4 py-2 bg-white border border-purple-300 text-purple-700 font-medium rounded-lg 
                             hover:bg-purple-50 hover:border-purple-400 transition-colors duration-300 text-sm 
                             flex items-center gap-2">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
                </svg>
                Refresh
              </button>
              <button @click="exportUsers" 
                      class="px-4 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-medium rounded-lg 
                             hover:shadow-md transition-shadow duration-300 text-sm">
                Export Users
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, computed } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

const store = useStore();
const router = useRouter();

const approvedUsers = computed(() => {
  return store.state.user.users.filter((user: any) => user.approvalStatus === 'APPROVED');
});

const totalUsers = computed(() => approvedUsers.value.length);
const customerCount = computed(() => approvedUsers.value.filter((user: any) => user.role === 'CUSTOMER').length);
const adminCount = computed(() => approvedUsers.value.filter((user: any) => user.role === 'ADMIN').length);
const financeCount = computed(() => approvedUsers.value.filter((user: any) => user.role === 'FINANCE_MANAGER').length);
const pendingCount = computed(() => store.state.user.pendingCount);

onMounted(() => {
  store.dispatch('user/fetchUsers');
});

const addUser = async () => {
  try {
    await store.dispatch('user/addUser', {
      name: 'New User',
      email: `user${Date.now()}@test.com`,
      role: 'CUSTOMER',
      bankAccount: '0000000000',
      bankName: 'Demo Bank',
      ifsc: 'DEMO000000'
    });
    
    showNotification('New user added successfully', 'success');
  } catch (error) {
    console.error('Error adding user:', error);
    showNotification('Failed to add user', 'error');
  }
};

const deleteUser = async (id: number) => {
  if (confirm('Are you sure you want to delete this user? This action cannot be undone.')) {
    try {
      await store.dispatch('user/deleteUser', id);
      showNotification('User deleted successfully', 'info');
    } catch (error) {
      console.error('Error deleting user:', error);
      showNotification('Failed to delete user', 'error');
    }
  }
};

const viewUserDetails = (userId: number) => {
  alert(`Viewing details for user #${userId}`);
};

const refreshUsers = () => {
  store.dispatch('user/fetchUsers');
  showNotification('User list refreshed', 'info');
};

const exportUsers = () => {
  showNotification('Exporting users list...', 'info');
};

const showNotification = (message: string, type: 'success' | 'error' | 'info') => {
  alert(message);
};
</script>

<style scoped>
.animation-delay-2000 {
  animation-delay: 2s;
}
</style>