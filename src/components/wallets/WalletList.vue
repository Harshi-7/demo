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
        <div class="flex items-center gap-4 mb-6">
          <div class="w-14 h-14 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-2xl shadow-xl flex items-center justify-center">
            <svg class="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"/>
            </svg>
          </div>
          <div>
            <h1 class="text-3xl font-bold bg-gradient-to-r from-purple-700 to-indigo-700 bg-clip-text text-transparent">
              Wallet Management
            </h1>
            <p class="text-purple-600">Overview of all digital wallets in the system</p>
          </div>
        </div>

        <!-- Statistics Cards -->
        <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div class="bg-gradient-to-br from-white to-purple-50 backdrop-blur-sm border border-purple-200 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-sm font-medium text-purple-600">Total Wallets</p>
                <p class="text-3xl font-bold text-gray-900 mt-2">{{ wallets.length }}</p>
              </div>
              <div class="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                <svg class="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"/>
                </svg>
              </div>
            </div>
            <div class="mt-4 pt-4 border-t border-purple-100">
              <p class="text-xs text-purple-500">Active digital wallets</p>
            </div>
          </div>

          <div class="bg-gradient-to-br from-white to-green-50 backdrop-blur-sm border border-green-200 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-sm font-medium text-green-600">Total Balance</p>
                <p class="text-3xl font-bold text-gray-900 mt-2">${{ totalBalance.toLocaleString() }}</p>
              </div>
              <div class="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
              </div>
            </div>
            <div class="mt-4 pt-4 border-t border-green-100">
              <p class="text-xs text-green-500">Combined wallet balance</p>
            </div>
          </div>

          <div class="bg-gradient-to-br from-white to-blue-50 backdrop-blur-sm border border-blue-200 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-sm font-medium text-blue-600">Avg. Balance</p>
                <p class="text-3xl font-bold text-gray-900 mt-2">${{ avgBalance.toLocaleString() }}</p>
              </div>
              <div class="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
                </svg>
              </div>
            </div>
            <div class="mt-4 pt-4 border-t border-blue-100">
              <p class="text-xs text-blue-500">Average per wallet</p>
            </div>
          </div>

          <div class="bg-gradient-to-br from-white to-purple-50 backdrop-blur-sm border border-purple-200 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-sm font-medium text-purple-600">Transactions</p>
                <p class="text-3xl font-bold text-gray-900 mt-2">{{ totalTransactions }}</p>
              </div>
              <div class="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                <svg class="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"/>
                </svg>
              </div>
            </div>
            <div class="mt-4 pt-4 border-t border-purple-100">
              <p class="text-xs text-purple-500">Total transactions</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Wallets Grid -->
      <div>
        <div class="mb-6">
          <h2 class="text-xl font-bold text-purple-800 mb-2">All Digital Wallets</h2>
          <p class="text-sm text-purple-600">{{ wallets.length }} wallets found</p>
        </div>

        <!-- Empty State -->
        <div v-if="wallets.length === 0" class="bg-white/90 backdrop-blur-sm border border-purple-200 rounded-2xl shadow-xl p-12 text-center">
          <div class="w-24 h-24 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg class="w-12 h-12 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"/>
            </svg>
          </div>
          <h3 class="text-xl font-bold text-gray-900 mb-2">No Wallets Found</h3>
          <p class="text-gray-600 mb-6">No digital wallets have been created yet.</p>
          <button @click="createSampleWallet" 
                  class="px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold rounded-xl 
                         shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50 transform transition-all duration-300">
            Create Sample Wallet
          </button>
        </div>

        <!-- Wallets Grid -->
        <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div v-for="wallet in wallets" :key="wallet.id" 
               class="bg-gradient-to-br from-white to-purple-50 backdrop-blur-sm border border-purple-200 rounded-2xl p-6 shadow-lg 
                      hover:shadow-xl hover:scale-[1.02] transform transition-all duration-300 group">
            
            <!-- Wallet Header -->
            <div class="flex items-start justify-between mb-4">
              <div class="flex items-center gap-3">
                <div class="w-12 h-12 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl flex items-center justify-center shadow">
                  <span class="text-lg font-bold text-white">W</span>
                </div>
                <div>
                  <h3 class="font-bold text-lg text-gray-900 group-hover:text-purple-700 transition-colors duration-300">
                    Wallet #{{ wallet.id }}
                  </h3>
                  <p class="text-sm text-gray-500">User ID: {{ wallet.userId }}</p>
                </div>
              </div>
              <div class="text-xs text-purple-600 bg-purple-100 px-2 py-1 rounded">
                {{ wallet.transactions.length }} TX
              </div>
            </div>

            <!-- Balance Display -->
            <div class="mb-4">
              <p class="text-sm font-medium text-purple-600 mb-1">Available Balance</p>
              <div class="flex items-baseline">
                <span class="text-3xl font-bold" :class="wallet.balance >= 0 ? 'text-green-600' : 'text-red-600'">
                  ${{ wallet.balance.toLocaleString() }}
                </span>
                <span v-if="wallet.balance >= 0" class="ml-2 text-xs text-green-600 bg-green-100 px-2 py-1 rounded-full">
                  Active
                </span>
                <span v-else class="ml-2 text-xs text-red-600 bg-red-100 px-2 py-1 rounded-full">
                  Negative
                </span>
              </div>
            </div>

            <!-- Transaction Info -->
            <div class="space-y-3">
              <div class="flex items-center justify-between text-sm">
                <span class="text-gray-600">Transactions:</span>
                <span class="font-medium text-gray-900">{{ wallet.transactions.length }}</span>
              </div>
              
              <div v-if="wallet.transactions.length > 0" class="text-sm">
                <div class="flex items-center justify-between mb-1">
                  <span class="text-gray-600">Last Activity:</span>
                  <span class="font-medium text-gray-900">{{ getLastTransactionDate(wallet) }}</span>
                </div>
                <div class="flex items-center justify-between">
                  <span class="text-gray-600">Type:</span>
                  <span class="font-medium" :class="getLastTransactionType(wallet) === 'DEPOSIT' ? 'text-green-600' : 'text-red-600'">
                    {{ getLastTransactionType(wallet) }}
                  </span>
                </div>
              </div>
              <div v-else class="text-sm text-gray-400 italic">
                No transactions yet
              </div>
            </div>

            <!-- Action Buttons -->
            <div class="mt-6 pt-4 border-t border-purple-100">
              <div class="flex gap-2">
                <button @click="viewWalletDetails(wallet.id)" 
                        class="flex-1 px-3 py-2 bg-purple-50 text-purple-700 font-medium rounded-lg hover:bg-purple-100 
                               transition-colors duration-300 text-sm flex items-center justify-center gap-1">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
                  </svg>
                  View Details
                </button>
                <button @click="refreshWallet(wallet.id)" 
                        class="px-3 py-2 bg-blue-50 text-blue-700 font-medium rounded-lg hover:bg-blue-100 
                               transition-colors duration-300 text-sm flex items-center gap-1">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Footer Info -->
      <div class="mt-8 p-6 bg-white/90 backdrop-blur-sm border border-purple-200 rounded-2xl shadow-lg">
        <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div class="text-sm text-purple-700">
            <p class="font-medium mb-1">Wallet Management Tips:</p>
            <ul class="text-xs text-gray-600 space-y-1">
              <li class="flex items-center gap-1">• Click "View Details" to see transaction history</li>
              <li class="flex items-center gap-1">• Negative balances indicate overdrawn accounts</li>
              <li class="flex items-center gap-1">• Each wallet is linked to a specific user</li>
            </ul>
          </div>
          <div class="flex items-center gap-4">
            <button @click="refreshAllWallets" 
                    class="px-4 py-2 bg-white border border-purple-300 text-purple-700 font-medium rounded-lg 
                           hover:bg-purple-50 hover:border-purple-400 transition-colors duration-300 text-sm 
                           flex items-center gap-2">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
              </svg>
              Refresh All
            </button>
            <button @click="createSampleWallet" 
                    class="px-4 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-medium rounded-lg 
                           hover:shadow-md transition-shadow duration-300 text-sm">
              + Add Sample Wallet
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, computed } from 'vue';
import { useStore } from 'vuex';

const store = useStore();

onMounted(() => {
  store.dispatch('wallet/fetchWallets');
});

const wallets = computed(() => store.state.wallet.wallets);

const totalBalance = computed(() => {
  return wallets.value.reduce((sum: number, wallet: any) => sum + wallet.balance, 0);
});

const avgBalance = computed(() => {
  return wallets.value.length > 0 ? Math.round(totalBalance.value / wallets.value.length) : 0;
});

const totalTransactions = computed(() => {
  return wallets.value.reduce((sum: number, wallet: any) => sum + wallet.transactions.length, 0);
});

const getLastTransactionDate = (wallet: any) => {
  if (wallet.transactions.length === 0) return 'N/A';
  const lastTx = wallet.transactions[wallet.transactions.length - 1];
  return new Date(lastTx.date).toLocaleDateString('en-US', { 
    month: 'short', 
    day: 'numeric' 
  });
};

const getLastTransactionType = (wallet: any) => {
  if (wallet.transactions.length === 0) return 'N/A';
  const lastTx = wallet.transactions[wallet.transactions.length - 1];
  return lastTx.type;
};

const viewWalletDetails = (walletId: number) => {
  alert(`Viewing details for Wallet #${walletId}`);
};

const refreshWallet = (walletId: number) => {
  alert(`Refreshing Wallet #${walletId}`);
};

const refreshAllWallets = () => {
  store.dispatch('wallet/fetchWallets');
  alert('All wallets refreshed!');
};

const createSampleWallet = async () => {
  try {
    await store.dispatch('wallet/createWallet', {
      userId: Math.floor(Math.random() * 1000) + 1,
      balance: Math.floor(Math.random() * 10000) + 1000
    });
    alert('Sample wallet created successfully!');
  } catch (error) {
    console.error('Error creating wallet:', error);
    alert('Failed to create sample wallet.');
  }
};
</script>

<style scoped>
.animation-delay-2000 {
  animation-delay: 2s;
}
</style>