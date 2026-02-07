<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-50 to-purple-50 p-4 md:p-6">
    <!-- Animated Background Elements -->
    <div class="fixed inset-0 overflow-hidden pointer-events-none z-0">
      <div class="absolute top-10 right-10 w-64 h-64 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse-slow"></div>
      <div class="absolute bottom-10 left-10 w-80 h-80 bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse-slow animation-delay-2000"></div>
    </div>

    <div class="relative z-10 max-w-6xl mx-auto">
      <!-- Header with Balance -->
      <div class="mb-8">
        <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div class="flex items-center gap-4">
            <div class="w-14 h-14 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-2xl shadow-xl flex items-center justify-center">
              <svg class="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"/>
              </svg>
            </div>
            <div>
              <h1 class="text-3xl font-bold bg-gradient-to-r from-purple-700 to-indigo-700 bg-clip-text text-transparent">
                My Digital Wallet
              </h1>
              <p class="text-purple-600">Manage your finances securely</p>
            </div>
          </div>
          
          <!-- Balance Card -->
          <div class="bg-gradient-to-br from-white to-purple-50 backdrop-blur-sm border border-purple-200 rounded-2xl p-6 shadow-xl">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-sm font-medium text-purple-600">Available Balance</p>
                <p v-if="wallet" class="text-4xl font-bold text-gray-900 mt-2">
                  ${{ wallet.balance.toLocaleString() }}
                </p>
                <div v-else class="animate-pulse h-10 w-48 bg-gray-200 rounded mt-2"></div>
              </div>
              <div class="w-12 h-12 bg-gradient-to-br from-green-400 to-emerald-500 rounded-xl flex items-center justify-center shadow-lg">
                <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
              </div>
            </div>
            <div class="mt-4 pt-4 border-t border-purple-100">
              <p class="text-xs text-purple-500">Last updated: Just now</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Quick Actions Section -->
      <div class="mb-8">
        <div class="bg-gradient-to-br from-white to-purple-50 backdrop-blur-sm border border-purple-200 rounded-2xl shadow-xl p-6">
          <div class="flex items-center gap-3 mb-6">
            <div class="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center">
              <svg class="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
              </svg>
            </div>
            <div>
              <h2 class="text-xl font-bold text-purple-800">Quick Actions</h2>
              <p class="text-sm text-purple-600">Deposit or withdraw funds instantly</p>
            </div>
          </div>
          
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <!-- Amount Input -->
            <div>
              <label class="block text-sm font-medium text-purple-700 mb-2">Amount</label>
              <div class="relative">
                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span class="text-2xl text-purple-500">$</span>
                </div>
                <input v-model="amount" type="number" placeholder="Enter amount" 
                       class="block w-full pl-10 pr-4 py-4 bg-white/80 backdrop-blur-sm border border-purple-200 rounded-xl 
                              text-gray-900 placeholder-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent
                              transition-all duration-300 text-lg font-medium"
                       min="1" step="0.01">
              </div>
              <p v-if="error" class="mt-2 text-sm text-red-600 flex items-center gap-1">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
                {{ error }}
              </p>
            </div>

            <!-- Action Buttons -->
            <div class="flex flex-col sm:flex-row gap-3">
              <button @click="deposit" 
                      :disabled="!amount || amount <= 0 || loading"
                      class="group flex-1 px-6 py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold rounded-xl 
                             shadow-lg shadow-green-500/30 hover:shadow-green-500/50 hover:scale-[1.02] transform transition-all duration-300 
                             disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100">
                <span v-if="!loading" class="flex items-center justify-center gap-2">
                  <svg class="w-5 h-5 transform group-hover:-translate-y-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"/>
                  </svg>
                  Deposit
                </span>
                <span v-else class="flex items-center justify-center">
                  <svg class="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                </span>
              </button>
              
              <button @click="withdraw" 
                      :disabled="!amount || amount <= 0 || (wallet && amount > wallet.balance) || loading"
                      class="group flex-1 px-6 py-4 bg-gradient-to-r from-red-500 to-pink-600 text-white font-semibold rounded-xl 
                             shadow-lg shadow-red-500/30 hover:shadow-red-500/50 hover:scale-[1.02] transform transition-all duration-300 
                             disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100">
                <span v-if="!loading" class="flex items-center justify-center gap-2">
                  <svg class="w-5 h-5 transform group-hover:-translate-y-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"/>
                  </svg>
                  Withdraw
                </span>
                <span v-else class="flex items-center justify-center">
                  <svg class="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                </span>
              </button>
            </div>
          </div>
          
          <!-- Balance Warning -->
          <div v-if="wallet && amount > wallet.balance" class="mt-4 p-3 bg-red-50 border border-red-200 rounded-xl">
            <div class="flex items-center gap-2 text-red-700">
              <svg class="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
              <p class="text-sm">Insufficient balance. Available: ${{ wallet.balance.toLocaleString() }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Transaction History -->
      <div>
        <div class="flex items-center justify-between mb-6">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center">
              <svg class="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
              </svg>
            </div>
            <div>
              <h2 class="text-xl font-bold text-purple-800">Transaction History</h2>
              <p class="text-sm text-purple-600">All your financial transactions</p>
            </div>
          </div>
          <div v-if="wallet" class="text-sm text-purple-700 bg-purple-50 px-3 py-1 rounded-lg">
            {{ wallet.transactions.length }} transactions
          </div>
        </div>

        <!-- Empty State -->
        <div v-if="!wallet" class="bg-white/90 backdrop-blur-sm border border-purple-200 rounded-2xl shadow-xl p-12 text-center">
          <div class="w-24 h-24 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg class="w-12 h-12 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"/>
            </svg>
          </div>
          <h3 class="text-xl font-bold text-gray-900 mb-2">No Wallet Found</h3>
          <p class="text-gray-600 mb-6">Please contact the administrator to set up your digital wallet.</p>
          <button @click="refreshWallet" class="px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold rounded-xl 
                                                shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50 transform transition-all duration-300">
            Refresh Wallet
          </button>
        </div>

        <!-- No Transactions State -->
        <div v-else-if="wallet.transactions.length === 0" class="bg-white/90 backdrop-blur-sm border border-purple-200 rounded-2xl shadow-xl p-12 text-center">
          <div class="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg class="w-12 h-12 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
          </div>
          <h3 class="text-xl font-bold text-gray-900 mb-2">No Transactions Yet</h3>
          <p class="text-gray-600 mb-6">Make your first deposit to get started with your digital wallet.</p>
          <p class="text-sm text-purple-600">Available Balance: <span class="font-bold text-green-600">${{ wallet.balance.toLocaleString() }}</span></p>
        </div>

        <!-- Transactions List -->
        <div v-else class="bg-white/90 backdrop-blur-sm border border-purple-200 rounded-2xl shadow-xl overflow-hidden">
          <div class="overflow-x-auto">
            <table class="w-full">
              <thead class="bg-purple-50">
                <tr>
                  <th class="p-4 text-left text-sm font-semibold text-purple-700 uppercase tracking-wider">Type</th>
                  <th class="p-4 text-left text-sm font-semibold text-purple-700 uppercase tracking-wider">Details</th>
                  <th class="p-4 text-left text-sm font-semibold text-purple-700 uppercase tracking-wider">Date</th>
                  <th class="p-4 text-left text-sm font-semibold text-purple-700 uppercase tracking-wider">Amount</th>
                  <th class="p-4 text-left text-sm font-semibold text-purple-700 uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-purple-100">
                <tr v-for="tx in wallet.transactions" :key="tx.id" 
                    class="hover:bg-purple-50/50 transition-colors duration-150">
                  <td class="p-4">
                    <div class="flex items-center">
                      <div :class="[
                        'w-10 h-10 rounded-lg flex items-center justify-center mr-3',
                        tx.type === 'DEPOSIT' ? 'bg-green-100' : 'bg-red-100'
                      ]">
                        <svg v-if="tx.type === 'DEPOSIT'" class="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"/>
                        </svg>
                        <svg v-else class="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"/>
                        </svg>
                      </div>
                      <div>
                        <span class="block font-medium text-gray-900">{{ tx.type }}</span>
                        <span class="text-xs text-gray-500">ID: {{ tx.id }}</span>
                      </div>
                    </div>
                  </td>
                  <td class="p-4">
                    <div class="text-sm text-gray-900">{{ getTransactionDescription(tx) }}</div>
                  </td>
                  <td class="p-4">
                    <div class="text-sm text-gray-900">{{ formatDate(tx.date) }}</div>
                    <div class="text-xs text-gray-500">{{ formatTime(tx.date) }}</div>
                  </td>
                  <td class="p-4">
                    <div :class="[
                      'text-lg font-bold',
                      tx.type === 'DEPOSIT' ? 'text-green-600' : 'text-red-600'
                    ]">
                      {{ tx.type === 'DEPOSIT' ? '+' : '-' }}${{ tx.amount.toLocaleString() }}
                    </div>
                  </td>
                  <td class="p-4">
                    <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      <span class="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                      Completed
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          
          <!-- Summary Footer -->
          <div class="px-6 py-4 bg-purple-50 border-t border-purple-100">
            <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div class="text-sm text-purple-700">
                Showing {{ wallet.transactions.length }} of {{ wallet.transactions.length }} transactions
              </div>
              <div class="flex items-center gap-4">
                <div class="text-sm">
                  <span class="text-green-600 font-medium">
                    +${{ getTotalDeposits().toLocaleString() }}
                  </span>
                  <span class="text-gray-400 mx-2">•</span>
                  <span class="text-red-600 font-medium">
                    -${{ getTotalWithdrawals().toLocaleString() }}
                  </span>
                </div>
                <button @click="exportTransactions" 
                        class="px-4 py-2 bg-white border border-purple-300 text-purple-700 font-medium rounded-lg 
                               hover:bg-purple-50 hover:border-purple-400 transition-colors duration-300 text-sm">
                  Export CSV
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { useStore } from 'vuex';

const store = useStore();
const amount = ref(0);
const error = ref('');
const loading = ref(false);

onMounted(() => {
  store.dispatch('wallet/fetchWallets');
});

// Get current user's wallet
const wallet = computed(() => {
  const userId = store.state.auth.userId;
  if (!userId) return null;
  return store.state.wallet.wallets.find((w: any) => w.userId === userId);
});

const deposit = async () => {
  if (amount.value <= 0) {
    error.value = 'Amount must be greater than 0';
    return;
  }
  
  error.value = '';
  loading.value = true;
  
  await new Promise(resolve => setTimeout(resolve, 800));
  
  if (wallet.value) {
    try {
      await store.dispatch('wallet/updateBalance', {
        walletId: wallet.value.id,
        amount: amount.value
      });
      amount.value = 0;
      showNotification('Deposit successful!', 'success');
    } catch (err) {
      error.value = 'Deposit failed. Please try again.';
      console.error('Deposit error:', err);
    }
  }
  
  loading.value = false;
};

const withdraw = async () => {
  if (amount.value <= 0) {
    error.value = 'Amount must be greater than 0';
    return;
  }
  
  if (wallet.value && amount.value > wallet.value.balance) {
    error.value = 'Insufficient balance';
    return;
  }
  
  error.value = '';
  loading.value = true;
  
  await new Promise(resolve => setTimeout(resolve, 800));
  
  if (wallet.value) {
    try {
      await store.dispatch('wallet/updateBalance', {
        walletId: wallet.value.id,
        amount: -amount.value
      });
      amount.value = 0;
      showNotification('Withdrawal successful!', 'success');
    } catch (err) {
      error.value = 'Withdrawal failed. Please try again.';
      console.error('Withdrawal error:', err);
    }
  }
  
  loading.value = false;
};

const refreshWallet = () => {
  store.dispatch('wallet/fetchWallets');
  showNotification('Wallet refreshed', 'info');
};

const getTransactionDescription = (tx: any) => {
  if (tx.type === 'DEPOSIT') {
    return 'Funds added to wallet';
  } else {
    return 'Funds withdrawn from wallet';
  }
};

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
};

const formatTime = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  });
};

const getTotalDeposits = () => {
  if (!wallet.value) return 0;
  return wallet.value.transactions
    .filter((tx: any) => tx.type === 'DEPOSIT')
    .reduce((sum: number, tx: any) => sum + tx.amount, 0);
};

const getTotalWithdrawals = () => {
  if (!wallet.value) return 0;
  return wallet.value.transactions
    .filter((tx: any) => tx.type === 'WITHDRAWAL')
    .reduce((sum: number, tx: any) => sum + tx.amount, 0);
};

const exportTransactions = () => {
  if (!wallet.value) return;
  showNotification('Exporting transactions...', 'info');
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