<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-50 to-purple-50 p-4 md:p-6">
    <!-- Animated Background Elements -->
    <div class="fixed inset-0 overflow-hidden pointer-events-none z-0">
      <div class="absolute top-10 left-10 w-64 h-64 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse-slow"></div>
      <div class="absolute bottom-10 right-10 w-80 h-80 bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse-slow animation-delay-2000"></div>
    </div>

    <div class="relative z-10 max-w-7xl mx-auto">
      <!-- Header -->
      <div class="mb-8">
        <div class="flex items-center gap-4 mb-6">
          <div class="w-14 h-14 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-2xl shadow-xl flex items-center justify-center">
            <svg class="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"/>
            </svg>
          </div>
          <div>
            <h1 class="text-3xl font-bold bg-gradient-to-r from-purple-700 to-indigo-700 bg-clip-text text-transparent">
              Payment Management
            </h1>
            <p class="text-purple-600">Track and manage payment transactions</p>
          </div>
        </div>

        <!-- Statistics Cards -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div class="bg-gradient-to-br from-white to-purple-50 backdrop-blur-sm border border-purple-200 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-sm font-medium text-purple-600">Total Payments</p>
                <p class="text-3xl font-bold text-gray-900 mt-2">{{ payments.length }}</p>
              </div>
              <div class="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                <svg class="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
              </div>
            </div>
            <div class="mt-4 pt-4 border-t border-purple-100">
              <p class="text-xs text-purple-500">All payment transactions</p>
            </div>
          </div>

          <div class="bg-gradient-to-br from-white to-yellow-50 backdrop-blur-sm border border-yellow-200 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-sm font-medium text-yellow-600">Pending Payments</p>
                <p class="text-3xl font-bold text-gray-900 mt-2">{{ pendingPaymentsCount }}</p>
              </div>
              <div class="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center">
                <svg class="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
              </div>
            </div>
            <div class="mt-4 pt-4 border-t border-yellow-100">
              <p class="text-xs text-yellow-500">Awaiting processing</p>
            </div>
          </div>

          <div class="bg-gradient-to-br from-white to-green-50 backdrop-blur-sm border border-green-200 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-sm font-medium text-green-600">Completed Payments</p>
                <p class="text-3xl font-bold text-gray-900 mt-2">{{ completedPaymentsCount }}</p>
              </div>
              <div class="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                </svg>
              </div>
            </div>
            <div class="mt-4 pt-4 border-t border-green-100">
              <p class="text-xs text-green-500">Successfully processed</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Filter Buttons -->
      <div class="mb-6">
        <div class="bg-white/90 backdrop-blur-sm border border-purple-200 rounded-2xl p-4 shadow-lg">
          <div class="flex flex-wrap gap-2">
            <button 
              v-for="status in statuses" 
              :key="status" 
              @click="filterByStatus(status)"
              :class="[
                'group relative px-5 py-3 rounded-xl font-medium transition-all duration-300',
                filter === status 
                  ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md' 
                  : 'bg-purple-50 text-purple-700 hover:bg-purple-100 hover:shadow-sm'
              ]"
            >
              <span class="flex items-center gap-2">
                <span class="text-lg">{{ getStatusIcon(status) }}</span>
                {{ status }}
                <span v-if="status !== 'ALL'" class="text-xs opacity-75">
                  ({{ getStatusCount(status) }})
                </span>
              </span>
              <span v-if="filter === status" class="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-8 h-1 bg-gradient-to-r from-purple-400 to-indigo-400 rounded-full"></span>
            </button>
          </div>
        </div>
      </div>

      <!-- Payments Table -->
      <div class="bg-white/90 backdrop-blur-sm border border-purple-200 rounded-2xl shadow-xl overflow-hidden">
        <div class="px-6 py-4 border-b border-purple-100">
          <h2 class="text-xl font-bold text-purple-800">
            Payment Transactions
            <span v-if="filter !== 'ALL'" class="text-purple-600"> • {{ filter }}</span>
          </h2>
          <p class="text-sm text-purple-600 mt-1">Showing {{ filteredPayments.length }} payments</p>
        </div>
        
        <div class="overflow-x-auto">
          <table class="w-full">
            <thead class="bg-purple-50">
              <tr>
                <th class="p-4 text-left text-sm font-semibold text-purple-700 uppercase tracking-wider">Payment ID</th>
                <th class="p-4 text-left text-sm font-semibold text-purple-700 uppercase tracking-wider">Amount</th>
                <th class="p-4 text-left text-sm font-semibold text-purple-700 uppercase tracking-wider">Status</th>
                <th class="p-4 text-left text-sm font-semibold text-purple-700 uppercase tracking-wider">Date</th>
                <th class="p-4 text-left text-sm font-semibold text-purple-700 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-purple-100">
              <tr v-for="payment in filteredPayments" :key="payment.id" 
                  class="hover:bg-purple-50/50 transition-colors duration-150">
                <td class="p-4">
                  <div class="flex items-center">
                    <div class="w-10 h-10 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-lg flex items-center justify-center mr-3">
                      <span class="text-xs font-bold text-white">P</span>
                    </div>
                    <span class="font-mono font-medium text-gray-900">#{{ payment.id }}</span>
                  </div>
                </td>
                <td class="p-4">
                  <div class="flex items-center">
                    <div class="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mr-3">
                      <span class="text-lg font-bold text-green-700">$</span>
                    </div>
                    <div>
                      <div class="font-bold text-lg text-gray-900">${{ payment.amount }}</div>
                      <div class="text-xs text-gray-500">Wallet #{{ payment.walletId }}</div>
                    </div>
                  </div>
                </td>
                <td class="p-4">
                  <span class="inline-flex items-center px-3 py-2 rounded-full text-sm font-medium"
                    :class="{
                      'bg-yellow-100 text-yellow-800': payment.status === 'PENDING',
                      'bg-blue-100 text-blue-800': payment.status === 'PROCESSING',
                      'bg-green-100 text-green-800': payment.status === 'COMPLETED'
                    }">
                    <span :class="{
                      'bg-yellow-500': payment.status === 'PENDING',
                      'bg-blue-500': payment.status === 'PROCESSING',
                      'bg-green-500': payment.status === 'COMPLETED'
                    }" class="w-2 h-2 rounded-full mr-2"></span>
                    {{ payment.status }}
                  </span>
                </td>
                <td class="p-4">
                  <div class="text-sm text-gray-900">{{ formatDate(payment.date) }}</div>
                  <div class="text-xs text-gray-500">{{ formatTime(payment.date) }}</div>
                </td>
                <td class="p-4">
                  <div class="relative group">
                    <select @change="updateStatus(payment.id, $event)" 
                            class="appearance-none w-full px-4 py-2 bg-white border border-purple-300 rounded-xl text-gray-700 
                                   focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent
                                   transition-all duration-300 hover:border-purple-400 hover:shadow-sm">
                      <option value="PENDING" :selected="payment.status === 'PENDING'">Pending</option>
                      <option value="PROCESSING" :selected="payment.status === 'PROCESSING'">Processing</option>
                      <option value="COMPLETED" :selected="payment.status === 'COMPLETED'">Completed</option>
                    </select>
                    <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-purple-500">
                      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
                      </svg>
                    </div>
                  </div>
                  <div v-if="showStatusChange(payment)" class="mt-2 text-xs text-purple-600">
                    Click dropdown to update status
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
          
          <!-- Empty State -->
          <div v-if="filteredPayments.length === 0" class="p-12 text-center">
            <div class="w-24 h-24 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg class="w-12 h-12 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
              </svg>
            </div>
            <h3 class="text-lg font-medium text-gray-900 mb-2">No payments found</h3>
            <p class="text-gray-500 mb-6">
              <span v-if="filter !== 'ALL'">No {{ filter.toLowerCase() }} payments available.</span>
              <span v-else>No payments have been made yet.</span>
            </p>
            <button @click="filter = 'ALL'" 
                    class="px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold rounded-xl 
                           shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50 transform transition-all duration-300">
              View All Payments
            </button>
          </div>
        </div>
        
        <!-- Summary Footer -->
        <div class="px-6 py-4 bg-purple-50 border-t border-purple-100">
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div class="text-sm text-purple-700">
              Showing {{ filteredPayments.length }} of {{ payments.length }} payments
              <span v-if="filter !== 'ALL'"> (filtered by {{ filter }})</span>
            </div>
            <div class="flex items-center gap-4">
              <div class="text-sm">
                <span class="text-purple-700">
                  Total: <span class="font-bold">${{ getTotalAmount().toLocaleString() }}</span>
                </span>
              </div>
              <button @click="refreshPayments" 
                      class="px-4 py-2 bg-white border border-purple-300 text-purple-700 font-medium rounded-lg 
                             hover:bg-purple-50 hover:border-purple-400 transition-colors duration-300 text-sm 
                             flex items-center gap-2">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
                </svg>
                Refresh
              </button>
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
const filter = ref<string>('ALL');
const statuses = ['ALL', 'PENDING', 'PROCESSING', 'COMPLETED'];

// Helper functions for icons
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

const showStatusChange = (payment: any) => {
  return payment.status !== 'COMPLETED';
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

const getTotalAmount = () => {
  return filteredPayments.value.reduce((sum: number, payment: any) => sum + payment.amount, 0);
};

onMounted(() => {
  store.dispatch('payment/fetchPayments');
});

// Payments Data
const payments = computed(() => store.state.payment.payments);
const filteredPayments = computed(() => {
  if (filter.value === 'ALL') return payments.value;
  return payments.value.filter((p: any) => p.status === filter.value);
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

const filterByStatus = (status: string) => {
  filter.value = status;
};

const updateStatus = async (id: number, event: Event) => {
  const status = (event.target as HTMLSelectElement).value;
  try {
    await store.dispatch('payment/updatePaymentStatus', { id, status });
    
    // Show notification
    showNotification(`Payment #${id} status updated to ${status}`, 'success');
  } catch (error) {
    console.error('Error updating payment status:', error);
    showNotification('Failed to update payment status', 'error');
  }
};

const refreshPayments = () => {
  store.dispatch('payment/fetchPayments');
  showNotification('Payments refreshed', 'info');
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