<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-50 to-purple-50 p-4 md:p-6">
    <!-- Animated Background Elements -->
    <div class="fixed inset-0 overflow-hidden pointer-events-none z-0">
      <div class="absolute top-10 left-10 w-64 h-64 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse-slow"></div>
      <div class="absolute bottom-10 right-10 w-80 h-80 bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse-slow animation-delay-2000"></div>
    </div>

    <div class="relative z-10">
      <!-- Header -->
      <div class="mb-8">
        <div class="flex items-center justify-between mb-2">
          <div class="flex items-center gap-3">
            <div class="w-12 h-12 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl shadow-lg flex items-center justify-center">
              <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
              </svg>
            </div>
            <div>
              <h1 class="text-3xl font-bold bg-gradient-to-r from-purple-700 to-indigo-700 bg-clip-text text-transparent">
                Finance Dashboard
              </h1>
              <p class="text-purple-600">Monitor users, wallets, and payments in real-time</p>
            </div>
          </div>
          <div class="hidden md:block px-4 py-2 bg-white/80 backdrop-blur-sm border border-purple-200 rounded-xl shadow">
            <p class="text-sm text-purple-700">Last updated: <span class="font-semibold">{{ currentTime }}</span></p>
          </div>
        </div>
      </div>

      <!-- Tabs Navigation -->
      <div class="mb-8">
        <div class="flex flex-wrap gap-2">
          <button 
            v-for="tab in tabs" 
            :key="tab.id"
            @click="activeTab = tab.id"
            :class="[
              'group relative px-6 py-3 rounded-xl font-medium transition-all duration-300',
              activeTab === tab.id 
                ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg shadow-purple-500/30' 
                : 'bg-white/80 backdrop-blur-sm border border-purple-200 text-purple-700 hover:bg-white hover:border-purple-300 hover:shadow-md'
            ]"
          >
            <span class="flex items-center gap-2">
              <span class="text-lg">{{ getTabIcon(tab.id) }}</span>
              {{ tab.name }}
            </span>
            <span v-if="activeTab === tab.id" class="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-12 h-1 bg-gradient-to-r from-purple-400 to-indigo-400 rounded-full"></span>
          </button>
        </div>
      </div>

      <!-- Users Tab -->
      <div v-if="activeTab === 'users'" class="space-y-6 animate-fade-in">
        <!-- Statistics Cards -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div class="bg-gradient-to-br from-white to-purple-50 backdrop-blur-sm border border-purple-200 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-sm font-medium text-purple-600">Total Users</p>
                <p class="text-4xl font-bold text-gray-900 mt-2">{{ users.length }}</p>
              </div>
              <div class="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                <svg class="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/>
                </svg>
              </div>
            </div>
            <div class="mt-4 pt-4 border-t border-purple-100">
              <p class="text-xs text-purple-500">All registered users across the platform</p>
            </div>
          </div>

          <div class="bg-gradient-to-br from-white to-green-50 backdrop-blur-sm border border-green-200 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-sm font-medium text-green-600">Active Customers</p>
                <p class="text-4xl font-bold text-gray-900 mt-2">{{ activeCustomers }}</p>
              </div>
              <div class="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                </svg>
              </div>
            </div>
            <div class="mt-4 pt-4 border-t border-green-100">
              <p class="text-xs text-green-500">Approved and active customer accounts</p>
            </div>
          </div>

          <div class="bg-gradient-to-br from-white to-yellow-50 backdrop-blur-sm border border-yellow-200 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-sm font-medium text-yellow-600">Pending Approvals</p>
                <p class="text-4xl font-bold text-gray-900 mt-2">{{ pendingApprovals }}</p>
              </div>
              <div class="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center">
                <svg class="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
              </div>
            </div>
            <div class="mt-4 pt-4 border-t border-yellow-100">
              <p class="text-xs text-yellow-500">Awaiting admin review</p>
            </div>
          </div>
        </div>

        <!-- Users Table -->
        <div class="bg-white/90 backdrop-blur-sm border border-purple-200 rounded-2xl shadow-xl overflow-hidden">
          <div class="px-6 py-4 border-b border-purple-100">
            <h2 class="text-xl font-bold text-purple-800">All Users</h2>
            <p class="text-sm text-purple-600 mt-1">Manage and monitor user accounts</p>
          </div>
          <div class="overflow-x-auto">
            <table class="w-full">
              <thead class="bg-purple-50">
                <tr>
                  <th v-for="header in userHeaders" :key="header" class="p-4 text-left text-sm font-semibold text-purple-700 uppercase tracking-wider">
                    {{ header }}
                  </th>
                </tr>
              </thead>
              <tbody class="divide-y divide-purple-100">
                <tr v-for="user in users" :key="user.id" class="hover:bg-purple-50/50 transition-colors duration-150">
                  <td class="p-4">
                    <div class="flex items-center">
                      <div class="w-8 h-8 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-lg flex items-center justify-center mr-3">
                        <span class="text-xs font-bold text-white">{{ user.id }}</span>
                      </div>
                      <span class="font-medium text-gray-900">#{{ user.id }}</span>
                    </div>
                  </td>
                  <td class="p-4">
                    <div class="font-medium text-gray-900">{{ user.name }}</div>
                    <div class="text-sm text-gray-500">{{ user.email }}</div>
                  </td>
                  <td class="p-4">
                    <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium"
                      :class="{
                        'bg-purple-100 text-purple-800': user.role === 'ADMIN',
                        'bg-blue-100 text-blue-800': user.role === 'CUSTOMER',
                        'bg-green-100 text-green-800': user.role === 'FINANCE_MANAGER'
                      }">
                      {{ user.role }}
                    </span>
                  </td>
                  <td class="p-4">
                    <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium"
                      :class="{
                        'bg-green-100 text-green-800': user.approvalStatus === 'APPROVED',
                        'bg-yellow-100 text-yellow-800': user.approvalStatus === 'PENDING',
                        'bg-red-100 text-red-800': user.approvalStatus === 'REJECTED'
                      }">
                      {{ user.approvalStatus }}
                    </span>
                  </td>
                  <td class="p-4">
                    <div v-if="user.bankName" class="text-sm">
                      <div class="font-medium text-gray-900">{{ user.bankName }}</div>
                      <div class="text-gray-500">Acc: {{ user.bankAccount }}</div>
                      <div class="text-gray-500">IFSC: {{ user.ifsc }}</div>
                    </div>
                    <span v-else class="text-gray-400 italic">N/A</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <!-- Wallets Tab -->
      <div v-if="activeTab === 'wallets'" class="space-y-6 animate-fade-in">
        <!-- Wallet Statistics -->
        <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div v-for="stat in walletStats" :key="stat.label"
               class="bg-gradient-to-br from-white to-purple-50 backdrop-blur-sm border border-purple-200 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-sm font-medium text-purple-600">{{ stat.label }}</p>
                <p class="text-3xl font-bold text-gray-900 mt-2">{{ stat.value }}</p>
              </div>
              <div class="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                <span class="text-xl">{{ stat.icon }}</span>
              </div>
            </div>
            <div class="mt-4 pt-4 border-t border-purple-100">
              <p class="text-xs text-purple-500">{{ stat.description }}</p>
            </div>
          </div>
        </div>

        <!-- Wallets Table -->
        <div class="bg-white/90 backdrop-blur-sm border border-purple-200 rounded-2xl shadow-xl overflow-hidden">
          <div class="px-6 py-4 border-b border-purple-100">
            <h2 class="text-xl font-bold text-purple-800">All Wallets</h2>
            <p class="text-sm text-purple-600 mt-1">Financial overview across all accounts</p>
          </div>
          <div class="overflow-x-auto">
            <table class="w-full">
              <thead class="bg-purple-50">
                <tr>
                  <th v-for="header in walletHeaders" :key="header" class="p-4 text-left text-sm font-semibold text-purple-700 uppercase tracking-wider">
                    {{ header }}
                  </th>
                </tr>
              </thead>
              <tbody class="divide-y divide-purple-100">
                <tr v-for="wallet in wallets" :key="wallet.id" class="hover:bg-purple-50/50 transition-colors duration-150">
                  <td class="p-4">
                    <div class="flex items-center">
                      <div class="w-8 h-8 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-lg flex items-center justify-center mr-3">
                        <span class="text-xs font-bold text-white">W</span>
                      </div>
                      <span class="font-mono font-medium text-gray-900">#{{ wallet.id }}</span>
                    </div>
                  </td>
                  <td class="p-4">
                    <span class="font-medium text-gray-900">#{{ wallet.userId }}</span>
                  </td>
                  <td class="p-4">
                    <div class="font-medium text-gray-900">{{ getUserName(wallet.userId) || 'Unknown User' }}</div>
                    <div v-if="!getUserName(wallet.userId)" class="text-xs text-gray-400">User not found</div>
                  </td>
                  <td class="p-4">
                    <span class="font-bold text-lg" :class="wallet.balance >= 0 ? 'text-green-600' : 'text-red-600'">
                      ${{ wallet.balance.toLocaleString() }}
                    </span>
                  </td>
                  <td class="p-4">
                    <div class="flex items-center">
                      <div class="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                        <span class="text-sm font-bold text-blue-700">{{ wallet.transactions.length }}</span>
                      </div>
                      <span class="text-gray-700">transactions</span>
                    </div>
                  </td>
                  <td class="p-4">
                    <span v-if="wallet.transactions.length > 0" class="text-sm text-gray-600">
                      {{ formatDate(wallet.transactions[wallet.transactions.length - 1].date) }}
                    </span>
                    <span v-else class="text-gray-400 italic">No transactions</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <!-- Payments Tab -->
      <div v-if="activeTab === 'payments'" class="space-y-6 animate-fade-in">
        <!-- Payment Filters -->
        <div class="bg-white/90 backdrop-blur-sm border border-purple-200 rounded-2xl p-4 shadow-lg">
          <div class="flex flex-wrap gap-2">
            <button 
              v-for="status in paymentStatuses" 
              :key="status"
              @click="paymentFilter = status"
              :class="[
                'group relative px-4 py-2 rounded-lg font-medium transition-all duration-300',
                paymentFilter === status 
                  ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md' 
                  : 'bg-purple-50 text-purple-700 hover:bg-purple-100 hover:shadow-sm'
              ]"
            >
              <span class="flex items-center gap-2">
                <span>{{ getStatusIcon(status) }}</span>
                {{ status }}
                <span v-if="status !== 'ALL'" class="text-xs opacity-75">
                  ({{ getStatusCount(status) }})
                </span>
              </span>
            </button>
          </div>
        </div>

        <!-- Payment Statistics -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div v-for="stat in paymentStats" :key="stat.label"
               class="bg-gradient-to-br from-white to-purple-50 backdrop-blur-sm border border-purple-200 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-sm font-medium text-purple-600">{{ stat.label }}</p>
                <p class="text-3xl font-bold mt-2" :class="stat.color">{{ stat.value }}</p>
              </div>
              <div class="w-12 h-12 rounded-xl flex items-center justify-center" :class="stat.bgColor">
                <span class="text-xl">{{ stat.icon }}</span>
              </div>
            </div>
            <div class="mt-4 pt-4 border-t border-purple-100">
              <p class="text-xs text-purple-500">{{ stat.description }}</p>
            </div>
          </div>
        </div>

        <!-- Payments Table -->
        <div class="bg-white/90 backdrop-blur-sm border border-purple-200 rounded-2xl shadow-xl overflow-hidden">
          <div class="px-6 py-4 border-b border-purple-100">
            <h2 class="text-xl font-bold text-purple-800">
              Payments
              <span v-if="paymentFilter !== 'ALL'" class="text-purple-600"> • {{ paymentFilter }}</span>
            </h2>
            <p class="text-sm text-purple-600 mt-1">Track payment status and transactions</p>
          </div>
          <div class="overflow-x-auto">
            <table class="w-full">
              <thead class="bg-purple-50">
                <tr>
                  <th v-for="header in paymentHeaders" :key="header" class="p-4 text-left text-sm font-semibold text-purple-700 uppercase tracking-wider">
                    {{ header }}
                  </th>
                </tr>
              </thead>
              <tbody class="divide-y divide-purple-100">
                <tr v-for="payment in filteredPayments" :key="payment.id" class="hover:bg-purple-50/50 transition-colors duration-150">
                  <td class="p-4">
                    <div class="flex items-center">
                      <div class="w-8 h-8 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-lg flex items-center justify-center mr-3">
                        <span class="text-xs font-bold text-white">P</span>
                      </div>
                      <span class="font-mono font-medium text-gray-900">#{{ payment.id }}</span>
                    </div>
                  </td>
                  <td class="p-4">
                    <div class="flex items-center">
                      <div class="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                        <span class="text-xs font-bold text-blue-700">W</span>
                      </div>
                      <span class="font-medium text-gray-900">Wallet {{ payment.walletId }}</span>
                    </div>
                  </td>
                  <td class="p-4">
                    <div class="font-bold text-lg text-gray-900">${{ payment.amount.toLocaleString() }}</div>
                  </td>
                  <td class="p-4">
                    <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium"
                      :class="{
                        'bg-yellow-100 text-yellow-800': payment.status === 'PENDING',
                        'bg-blue-100 text-blue-800': payment.status === 'PROCESSING',
                        'bg-green-100 text-green-800': payment.status === 'COMPLETED'
                      }">
                      {{ payment.status }}
                    </span>
                  </td>
                  <td class="p-4">
                    <div class="text-sm text-gray-900">{{ formatDate(payment.date) }}</div>
                  </td>
                  <td class="p-4">
                    <div class="font-medium text-gray-900">{{ getUserNameForWallet(payment.walletId) }}</div>
                  </td>
                </tr>
              </tbody>
            </table>
            <div v-if="filteredPayments.length === 0" class="p-12 text-center">
              <div class="w-24 h-24 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg class="w-12 h-12 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                </svg>
              </div>
              <h3 class="text-lg font-medium text-gray-900 mb-2">No payments found</h3>
              <p class="text-gray-500">Try selecting a different filter or check back later</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useStore } from 'vuex';

const store = useStore();

const activeTab = ref('users');
const paymentFilter = ref('ALL');
const currentTime = ref('');

const tabs = [
  { id: 'users', name: 'Users' },
  { id: 'wallets', name: 'Wallets' },
  { id: 'payments', name: 'Payments' }
];

const paymentStatuses = ['ALL', 'PENDING', 'PROCESSING', 'COMPLETED'];

// Table headers
const userHeaders = ['ID', 'User Details', 'Role', 'Status', 'Bank Details'];
const walletHeaders = ['Wallet ID', 'User ID', 'User Name', 'Balance', 'Transactions', 'Last Transaction'];
const paymentHeaders = ['Payment ID', 'Wallet', 'Amount', 'Status', 'Date', 'User'];

// Helper functions for icons
const getTabIcon = (tabId: string) => {
  switch(tabId) {
    case 'users': return '👥';
    case 'wallets': return '💰';
    case 'payments': return '💳';
    default: return '📊';
  }
};

const getStatusIcon = (status: string) => {
  switch(status) {
    case 'ALL': return '📋';
    case 'PENDING': return '⏳';
    case 'PROCESSING': return '🔄';
    case 'COMPLETED': return '✅';
    default: return '📊';
  }
};

const getStatusCount = (status: string) => {
  if (status === 'ALL') return payments.value.length;
  if (status === 'PENDING') return pendingPaymentsCount.value;
  if (status === 'PROCESSING') return processingPaymentsCount.value;
  if (status === 'COMPLETED') return completedPaymentsCount.value;
  return 0;
};

// Wallet statistics
const walletStats = computed(() => [
  {
    label: 'Total Wallets',
    value: wallets.value.length,
    icon: '👛',
    description: 'Active digital wallets'
  },
  {
    label: 'Total Balance',
    value: `$${totalBalance.value.toLocaleString()}`,
    icon: '💰',
    description: 'Combined wallet balance'
  },
  {
    label: 'Avg. Balance',
    value: `$${avgBalance.value.toLocaleString()}`,
    icon: '📊',
    description: 'Average per wallet'
  },
  {
    label: 'Transactions',
    value: totalTransactions.value,
    icon: '📈',
    description: 'Total transactions'
  }
]);

// Payment statistics
const paymentStats = computed(() => [
  {
    label: 'Pending Payments',
    value: pendingPaymentsCount.value,
    icon: '⏳',
    color: 'text-yellow-600',
    bgColor: 'bg-yellow-100',
    description: 'Awaiting processing'
  },
  {
    label: 'Processing',
    value: processingPaymentsCount.value,
    icon: '🔄',
    color: 'text-blue-600',
    bgColor: 'bg-blue-100',
    description: 'Currently in progress'
  },
  {
    label: 'Completed',
    value: completedPaymentsCount.value,
    icon: '✅',
    color: 'text-green-600',
    bgColor: 'bg-green-100',
    description: 'Successfully processed'
  }
]);

onMounted(() => {
  store.dispatch('user/fetchUsers');
  store.dispatch('wallet/fetchWallets');
  store.dispatch('payment/fetchPayments');
  updateCurrentTime();
  setInterval(updateCurrentTime, 60000);
});

// Users Data
const users = computed(() => store.state.user.users);
const activeCustomers = computed(() => {
  return store.state.user.users.filter((user: any) => 
    user.role === 'CUSTOMER' && 
    user.approvalStatus === 'APPROVED'
  ).length;
});
const pendingApprovals = computed(() => {
  return store.state.user.users.filter((user: any) => user.approvalStatus === 'PENDING').length;
});

// Wallets Data
const wallets = computed(() => store.state.wallet.wallets);
const totalBalance = computed(() => {
  return wallets.value.reduce((sum: number, wallet: any) => sum + wallet.balance, 0);
});
const avgBalance = computed(() => {
  return wallets.value.length > 0 
    ? Math.round(totalBalance.value / wallets.value.length) 
    : 0;
});
const totalTransactions = computed(() => {
  return wallets.value.reduce((sum: number, wallet: any) => sum + wallet.transactions.length, 0);
});

// Payments Data
const payments = computed(() => store.state.payment.payments);
const filteredPayments = computed(() => {
  if (paymentFilter.value === 'ALL') return payments.value;
  return payments.value.filter((p: any) => p.status === paymentFilter.value);
});

const pendingPaymentsCount = computed(() => {
  return payments.value.filter((p: any) => p.status === 'PENDING').length;
});

const processingPaymentsCount = computed(() => {
  return payments.value.filter((p: any) => p.status === 'PROCESSING').length;
});

const completedPaymentsCount = computed(() => {
  return payments.value.filter((p: any) => p.status === 'COMPLETED').length;
});

// Helper Functions
const getUserName = (userId: number) => {
  const user = store.state.user.users.find((u: any) => u.id === userId);
  return user ? user.name : null;
};

const getUserNameForWallet = (walletId: number) => {
  const wallet = store.state.wallet.wallets.find((w: any) => w.id === walletId);
  if (!wallet) return 'Unknown';
  const user = store.state.user.users.find((u: any) => u.id === wallet.userId);
  return user ? user.name : `User ${wallet.userId}`;
};

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
};

const updateCurrentTime = () => {
  const now = new Date();
  currentTime.value = now.toLocaleTimeString('en-US', { 
    hour: '2-digit', 
    minute: '2-digit',
    hour12: true 
  });
};
</script>

<style scoped>
.animation-delay-2000 {
  animation-delay: 2s;
}

.animate-fade-in {
  animation: fadeIn 0.5s ease-in-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>