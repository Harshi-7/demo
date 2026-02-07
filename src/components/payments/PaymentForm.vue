<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-50 to-purple-50 p-4 md:p-6">
    <!-- Animated Background Elements -->
    <div class="fixed inset-0 overflow-hidden pointer-events-none z-0">
      <div class="absolute top-10 left-10 w-64 h-64 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse-slow"></div>
      <div class="absolute bottom-10 right-10 w-80 h-80 bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse-slow animation-delay-2000"></div>
    </div>

    <div class="relative z-10 max-w-4xl mx-auto">
      <!-- Header -->
      <div class="mb-8">
        <div class="flex items-center gap-4 mb-6">
          <div class="w-14 h-14 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-2xl shadow-xl flex items-center justify-center">
            <svg class="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
          </div>
          <div>
            <h1 class="text-3xl font-bold bg-gradient-to-r from-purple-700 to-indigo-700 bg-clip-text text-transparent">
              Make a Payment
            </h1>
            <p class="text-purple-600">Transfer funds securely to another wallet</p>
          </div>
        </div>

        <!-- Quick Stats -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div class="bg-gradient-to-br from-white to-purple-50 backdrop-blur-sm border border-purple-200 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-sm font-medium text-purple-600">Your Wallet</p>
                <p v-if="userWallet" class="text-2xl font-bold text-gray-900 mt-2">#{{ userWallet.id }}</p>
                <div v-else class="animate-pulse h-7 w-24 bg-gray-200 rounded mt-2"></div>
              </div>
              <div class="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                <svg class="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"/>
                </svg>
              </div>
            </div>
            <div class="mt-4 pt-4 border-t border-purple-100">
              <p class="text-xs text-purple-500">Current wallet</p>
            </div>
          </div>

          <div class="bg-gradient-to-br from-white to-green-50 backdrop-blur-sm border border-green-200 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-sm font-medium text-green-600">Available Balance</p>
                <p v-if="userWallet" class="text-2xl font-bold text-gray-900 mt-2">${{ userWallet.balance.toLocaleString() }}</p>
                <div v-else class="animate-pulse h-7 w-32 bg-gray-200 rounded mt-2"></div>
              </div>
              <div class="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
              </div>
            </div>
            <div class="mt-4 pt-4 border-t border-green-100">
              <p class="text-xs text-green-500">Funds available</p>
            </div>
          </div>

          <div class="bg-gradient-to-br from-white to-blue-50 backdrop-blur-sm border border-blue-200 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-sm font-medium text-blue-600">Recent Payments</p>
                <p class="text-2xl font-bold text-gray-900 mt-2">{{ recentPaymentsCount }}</p>
              </div>
              <div class="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
                </svg>
              </div>
            </div>
            <div class="mt-4 pt-4 border-t border-blue-100">
              <p class="text-xs text-blue-500">Last 30 days</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Payment Form -->
      <div class="bg-white/90 backdrop-blur-sm border border-purple-200 rounded-2xl shadow-xl overflow-hidden">
        <!-- Form Header -->
        <div class="px-6 py-4 border-b border-purple-100 bg-gradient-to-r from-purple-50 to-white">
          <h2 class="text-xl font-bold text-purple-800">Payment Details</h2>
          <p class="text-sm text-purple-600 mt-1">Enter payment information below</p>
        </div>

        <div class="p-6">
          <form @submit.prevent="submitForm" class="space-y-6">
            <!-- Amount Input -->
            <div>
              <label class="block text-sm font-medium text-purple-700 mb-2">
                <span class="flex items-center gap-1">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                  Payment Amount
                </span>
              </label>
              <div class="relative">
                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span class="text-2xl text-purple-500">$</span>
                </div>
                <input v-model="form.amount" type="number" placeholder="0.00" step="0.01" min="0.01"
                       class="block w-full pl-10 pr-4 py-4 bg-white/80 backdrop-blur-sm border border-purple-200 rounded-xl 
                              text-gray-900 placeholder-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent
                              transition-all duration-300 text-lg font-medium"
                       @input="validateAmount">
                <div class="absolute inset-y-0 right-0 pr-3 flex items-center">
                  <span class="text-sm text-gray-500">USD</span>
                </div>
              </div>
              <div class="mt-2 text-sm text-purple-600">
                <span v-if="form.amount > 0">Equivalent: {{ formatEquivalentAmount(form.amount) }}</span>
              </div>
            </div>

            <!-- Wallet ID Input -->
            <div>
              <label class="block text-sm font-medium text-purple-700 mb-2">
                <span class="flex items-center gap-1">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"/>
                  </svg>
                  Destination Wallet ID
                </span>
              </label>
              <div class="relative">
                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span class="text-xl text-purple-500">#</span>
                </div>
                <input v-model="form.walletId" type="number" placeholder="Enter wallet ID" min="1"
                       class="block w-full pl-10 pr-4 py-4 bg-white/80 backdrop-blur-sm border border-purple-200 rounded-xl 
                              text-gray-900 placeholder-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent
                              transition-all duration-300 text-lg font-medium"
                       @input="validateWallet">
              </div>
              <div class="mt-2 text-sm">
                <span v-if="destinationWallet" class="text-green-600">
                  Valid wallet found
                </span>
                <span v-else-if="form.walletId && form.walletId > 0" class="text-yellow-600">
                  Wallet not found in system
                </span>
                <span v-else class="text-purple-600">
                  Enter the wallet ID you want to send money to
                </span>
              </div>
            </div>

            <!-- Payment Summary -->
            <div v-if="form.amount > 0" class="bg-purple-50 border border-purple-200 rounded-xl p-4 animate-fade-in">
              <h3 class="font-bold text-purple-800 mb-3 flex items-center gap-2">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
                Payment Summary
              </h3>
              <div class="space-y-2 text-sm">
                <div class="flex justify-between">
                  <span class="text-gray-600">Amount to send:</span>
                  <span class="font-bold text-gray-900">${{ form.amount.toFixed(2) }}</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-gray-600">Transaction fee:</span>
                  <span class="text-gray-900">${{ transactionFee.toFixed(2) }}</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-gray-600">Total amount:</span>
                  <span class="font-bold text-green-600">${{ totalAmount.toFixed(2) }}</span>
                </div>
                <div v-if="userWallet" class="flex justify-between">
                  <span class="text-gray-600">Remaining balance:</span>
                  <span class="font-bold" :class="remainingBalance >= 0 ? 'text-green-600' : 'text-red-600'">
                    ${{ remainingBalance.toFixed(2) }}
                  </span>
                </div>
              </div>
            </div>

            <!-- Balance Warning -->
            <div v-if="userWallet && form.amount > userWallet.balance" 
                 class="p-4 bg-red-50 border border-red-200 rounded-xl animate-fade-in">
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 bg-red-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <svg class="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.904 16.5c-.77.833.192 2.5 1.732 2.5z"/>
                  </svg>
                </div>
                <div>
                  <h4 class="font-bold text-red-800">Insufficient Funds</h4>
                  <p class="text-sm text-red-700 mt-1">
                    Your available balance is ${{ userWallet.balance.toFixed(2) }}. 
                    Please reduce the payment amount.
                  </p>
                </div>
              </div>
            </div>

            <!-- Error Message -->
            <div v-if="error" 
                 class="p-4 bg-red-50 border border-red-200 rounded-xl animate-fade-in">
              <div class="flex items-center gap-2 text-red-700">
                <svg class="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
                <span>{{ error }}</span>
              </div>
            </div>

            <!-- Success Message -->
            <div v-if="success" 
                 class="p-4 bg-green-50 border border-green-200 rounded-xl animate-fade-in">
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <svg class="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                  </svg>
                </div>
                <div>
                  <h4 class="font-bold text-green-800">Payment Successful!</h4>
                  <p class="text-sm text-green-700 mt-1">
                    Your payment of ${{ lastPaymentAmount }} has been submitted successfully.
                    Transaction ID: #{{ lastPaymentId }}
                  </p>
                  <p class="text-xs text-green-600 mt-2">
                    The payment will be processed within 1-2 business days.
                  </p>
                </div>
              </div>
            </div>

            <!-- Submit Button -->
            <div class="pt-4">
              <button type="submit" :disabled="loading || form.amount <= 0 || (userWallet && form.amount > userWallet.balance)"
                      class="w-full group px-6 py-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold rounded-xl 
                             shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50 hover:scale-[1.02] transform transition-all duration-300 
                             disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100">
                <span v-if="!loading" class="flex items-center justify-center gap-2">
                  <svg class="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/>
                  </svg>
                  Submit Payment
                  <span v-if="form.amount > 0" class="ml-2 text-sm opacity-90">
                    (${{ totalAmount.toFixed(2) }})
                  </span>
                </span>
                <span v-else class="flex items-center justify-center">
                  <svg class="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                </span>
              </button>
            </div>

            <!-- Additional Info -->
            <div class="text-center text-sm text-purple-600 pt-4 border-t border-purple-100">
              <p class="flex items-center justify-center gap-1">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
                Payments are processed within 1-2 business days
              </p>
            </div>
          </form>
        </div>
      </div>

      <!-- Recent Payments -->
      <div v-if="recentPayments.length > 0" class="mt-8">
        <div class="bg-white/90 backdrop-blur-sm border border-purple-200 rounded-2xl shadow-xl overflow-hidden">
          <div class="px-6 py-4 border-b border-purple-100">
            <h2 class="text-xl font-bold text-purple-800">Recent Payments</h2>
            <p class="text-sm text-purple-600 mt-1">Your recent payment history</p>
          </div>
          <div class="p-6">
            <div class="space-y-3">
              <div v-for="payment in recentPayments" :key="payment.id" 
                   class="flex items-center justify-between p-3 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors duration-300">
                <div class="flex items-center gap-3">
                  <div class="w-10 h-10 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-lg flex items-center justify-center">
                    <span class="text-xs font-bold text-white">P</span>
                  </div>
                  <div>
                    <div class="font-medium text-gray-900">To Wallet #{{ payment.walletId }}</div>
                    <div class="text-xs text-gray-500">{{ formatDate(payment.date) }}</div>
                  </div>
                </div>
                <div class="text-right">
                  <div class="font-bold text-gray-900">${{ payment.amount }}</div>
                  <span class="text-xs px-2 py-1 rounded-full"
                        :class="{
                          'bg-yellow-100 text-yellow-800': payment.status === 'PENDING',
                          'bg-blue-100 text-blue-800': payment.status === 'PROCESSING',
                          'bg-green-100 text-green-800': payment.status === 'COMPLETED'
                        }">
                    {{ payment.status }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, computed, onMounted } from 'vue';
import { useStore } from 'vuex';

const store = useStore();

const error = ref('');
const success = ref(false);
const loading = ref(false);
const lastPaymentAmount = ref(0);
const lastPaymentId = ref(0);

const form = reactive({
  amount: 0,
  walletId: 1
});

// Get current user's wallet
const userWallet = computed(() => {
  const userId = store.state.auth.userId;
  if (!userId) return null;
  return store.state.wallet.wallets.find((w: any) => w.userId === userId);
});

// Get destination wallet
const destinationWallet = computed(() => {
  return store.state.wallet.wallets.find((w: any) => w.id === form.walletId);
});

// Get recent payments for current user
const recentPayments = computed(() => {
  const userWalletId = userWallet.value?.id;
  if (!userWalletId) return [];
  
  return store.state.payment.payments
    .filter((p: any) => p.walletId === userWalletId)
    .slice(0, 5);
});

const recentPaymentsCount = computed(() => recentPayments.value.length);

const transactionFee = computed(() => {
  const fee = form.amount * 0.01;
  return Math.max(fee, 0.50);
});

const totalAmount = computed(() => {
  return form.amount + transactionFee.value;
});

const remainingBalance = computed(() => {
  if (!userWallet.value) return 0;
  return userWallet.value.balance - totalAmount.value;
});

const formatEquivalentAmount = (amount: number) => {
  const conversions = {
    EUR: (amount * 0.85).toFixed(2),
    GBP: (amount * 0.73).toFixed(2),
    INR: (amount * 75.5).toFixed(2)
  };
  return `≈ €${conversions.EUR} • £${conversions.GBP} • ₹${conversions.INR}`;
};

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
};

const validateAmount = () => {
  if (form.amount < 0) {
    form.amount = 0;
  }
};

const validateWallet = () => {
  if (form.walletId < 1) {
    form.walletId = 1;
  }
};

onMounted(() => {
  store.dispatch('wallet/fetchWallets');
  store.dispatch('payment/fetchPayments');
});

const submitForm = async () => {
  if (form.amount <= 0) {
    error.value = 'Amount must be greater than 0';
    return;
  }

  if (userWallet.value && form.amount > userWallet.value.balance) {
    error.value = 'Insufficient funds in your wallet';
    return;
  }

  error.value = '';
  success.value = false;
  loading.value = true;

  try {
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const paymentData = {
      amount: form.amount,
      walletId: form.walletId,
      reference: `PAY${Date.now()}`
    };
    
    await store.dispatch('payment/createPayment', paymentData);
    lastPaymentAmount.value = form.amount;
    lastPaymentId.value = Date.now();
    
    success.value = true;
    form.amount = 0;
    
    store.dispatch('payment/fetchPayments');
    
    setTimeout(() => {
      success.value = false;
    }, 5000);
  } catch (err) {
    error.value = 'Payment failed. Please try again.';
    console.error('Payment error:', err);
  } finally {
    loading.value = false;
  }
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