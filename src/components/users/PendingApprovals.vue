<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-50 to-purple-50 p-4 md:p-6">
    <!-- Animated Background Elements -->
    <div class="fixed inset-0 overflow-hidden pointer-events-none z-0">
      <div class="absolute top-10 left-10 w-64 h-64 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse-slow"></div>
      <div class="absolute bottom-10 right-10 w-80 h-80 bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse-slow animation-delay-2000"></div>
    </div>

    <div class="relative z-10 max-w-6xl mx-auto">
      <!-- Header -->
      <div class="mb-8">
        <div class="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-6">
          <div class="flex items-center gap-4">
            <div class="w-14 h-14 bg-gradient-to-br from-yellow-500 to-amber-600 rounded-2xl shadow-xl flex items-center justify-center">
              <svg class="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
            </div>
            <div>
              <h1 class="text-3xl font-bold bg-gradient-to-r from-yellow-700 to-amber-700 bg-clip-text text-transparent">
                Pending Approvals
              </h1>
              <p class="text-purple-600">Review and approve new user registrations</p>
            </div>
          </div>
          
          <!-- Back Button -->
          <router-link to="/users" 
                      class="px-6 py-3 bg-white border border-purple-300 text-purple-700 font-semibold rounded-xl 
                             hover:bg-purple-50 hover:border-purple-400 hover:shadow-md transition-all duration-300
                             flex items-center gap-2">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"/>
            </svg>
            Back to Users
          </router-link>
        </div>

        <!-- Statistics Cards -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div class="bg-gradient-to-br from-white to-purple-50 backdrop-blur-sm border border-purple-200 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-sm font-medium text-purple-600">Pending Review</p>
                <p class="text-3xl font-bold text-gray-900 mt-2">{{ pendingCount }}</p>
              </div>
              <div class="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center">
                <svg class="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
              </div>
            </div>
            <div class="mt-4 pt-4 border-t border-purple-100">
              <p class="text-xs text-purple-500">Awaiting admin review</p>
            </div>
          </div>

          <div class="bg-gradient-to-br from-white to-green-50 backdrop-blur-sm border border-green-200 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-sm font-medium text-green-600">Recently Approved</p>
                <p class="text-3xl font-bold text-gray-900 mt-2">{{ approvedCount }}</p>
              </div>
              <div class="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                </svg>
              </div>
            </div>
            <div class="mt-4 pt-4 border-t border-green-100">
              <p class="text-xs text-green-500">Approved in this session</p>
            </div>
          </div>

          <div class="bg-gradient-to-br from-white to-red-50 backdrop-blur-sm border border-red-200 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-sm font-medium text-red-600">Rejected</p>
                <p class="text-3xl font-bold text-gray-900 mt-2">{{ rejectedCount }}</p>
              </div>
              <div class="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
                <svg class="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                </svg>
              </div>
            </div>
            <div class="mt-4 pt-4 border-t border-red-100">
              <p class="text-xs text-red-500">Applications rejected</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Approval Cards -->
      <div>
        <!-- Empty State -->
        <div v-if="pendingUsers.length === 0" class="bg-white/90 backdrop-blur-sm border border-purple-200 rounded-2xl shadow-xl p-12 text-center">
          <div class="w-24 h-24 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg class="w-12 h-12 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
          </div>
          <h3 class="text-xl font-bold text-gray-900 mb-2">All Clear!</h3>
          <p class="text-gray-600 mb-6">No pending user approvals at the moment.</p>
          <p class="text-sm text-purple-600">New user registrations will appear here for review.</p>
        </div>

        <!-- Pending Users List -->
        <div v-else class="space-y-6">
          <div v-for="user in pendingUsers" :key="user.id" 
               class="bg-white/90 backdrop-blur-sm border border-purple-200 rounded-2xl shadow-xl overflow-hidden
                      hover:shadow-2xl transition-shadow duration-300">
            <!-- User Header -->
            <div class="px-6 py-4 border-b border-purple-100 bg-gradient-to-r from-purple-50 to-white">
              <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div class="flex items-center gap-4">
                  <div class="w-12 h-12 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl flex items-center justify-center">
                    <span class="text-lg font-bold text-white">{{ getUserInitials(user.name) }}</span>
                  </div>
                  <div>
                    <h3 class="text-lg font-bold text-gray-900">{{ user.name }}</h3>
                    <p class="text-purple-600">{{ user.email }}</p>
                  </div>
                </div>
                <div class="flex items-center gap-2">
                  <span class="px-3 py-1 rounded-full text-xs font-medium"
                        :class="user.approvalStatus === 'PENDING' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'">
                    {{ user.approvalStatus }}
                  </span>
                  <span class="text-xs text-gray-500">ID: #{{ user.id }}</span>
                </div>
              </div>
            </div>

            <!-- User Details -->
            <div class="px-6 py-4">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <!-- Bank Details -->
                <div>
                  <h4 class="text-sm font-semibold text-purple-700 mb-3 flex items-center gap-2">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"/>
                    </svg>
                    Bank Information
                  </h4>
                  <div class="space-y-2">
                    <div class="flex justify-between">
                      <span class="text-sm text-gray-600">Bank Name:</span>
                      <span class="text-sm font-medium text-gray-900">{{ user.bankName }}</span>
                    </div>
                    <div class="flex justify-between">
                      <span class="text-sm text-gray-600">Account Number:</span>
                      <span class="text-sm font-medium text-gray-900 font-mono">{{ user.bankAccount }}</span>
                    </div>
                    <div class="flex justify-between">
                      <span class="text-sm text-gray-600">IFSC Code:</span>
                      <span class="text-sm font-medium text-gray-900 font-mono">{{ user.ifsc }}</span>
                    </div>
                  </div>
                </div>

                <!-- Registration Info -->
                <div>
                  <h4 class="text-sm font-semibold text-purple-700 mb-3 flex items-center gap-2">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                    </svg>
                    Registration Details
                  </h4>
                  <div class="space-y-2">
                    <div class="flex justify-between">
                      <span class="text-sm text-gray-600">Requested Role:</span>
                      <span class="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">CUSTOMER</span>
                    </div>
                    <div class="flex justify-between">
                      <span class="text-sm text-gray-600">Submitted:</span>
                      <span class="text-sm text-gray-900">Just now</span>
                    </div>
                    <div class="flex justify-between">
                      <span class="text-sm text-gray-600">Documents:</span>
                      <span class="text-sm text-gray-900">Bank verification pending</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Action Buttons -->
            <div v-if="user.approvalStatus === 'PENDING'" class="px-6 py-4 border-t border-purple-100 bg-purple-50">
              <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div class="text-sm text-purple-700">
                  Review this user's registration and decide
                </div>
                <div class="flex gap-3">
                  <button @click="rejectUser(user.id)" 
                          class="group px-6 py-3 bg-gradient-to-r from-red-500 to-pink-600 text-white font-semibold rounded-xl 
                                 shadow-lg shadow-red-500/30 hover:shadow-red-500/50 hover:scale-[1.02] transform transition-all duration-300
                                 flex items-center gap-2">
                    <svg class="w-5 h-5 transform group-hover:rotate-12 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                    </svg>
                    Reject
                  </button>
                  <button @click="approveUser(user.id)" 
                          class="group px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold rounded-xl 
                                 shadow-lg shadow-green-500/30 hover:shadow-green-500/50 hover:scale-[1.02] transform transition-all duration-300
                                 flex items-center gap-2">
                    <svg class="w-5 h-5 transform group-hover:rotate-12 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                    </svg>
                    Approve User
                  </button>
                </div>
              </div>
            </div>

            <!-- Approved Credentials -->
            <div v-if="user.approvalStatus === 'APPROVED' && user.password" 
                 class="px-6 py-4 border-t border-green-200 bg-gradient-to-r from-green-50 to-emerald-50 animate-fade-in">
              <div class="flex items-start gap-4">
                <div class="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
                  </svg>
                </div>
                <div class="flex-1">
                  <h4 class="font-bold text-green-800 mb-2 flex items-center gap-2">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
                    </svg>
                    User Approved Successfully
                  </h4>
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p class="text-sm text-green-700 mb-1">Login Credentials:</p>
                      <div class="bg-white border border-green-300 rounded-lg p-3">
                        <div class="flex justify-between items-center mb-2">
                          <span class="text-sm text-gray-600">Email:</span>
                          <span class="text-sm font-medium text-gray-900">{{ user.email }}</span>
                        </div>
                        <div class="flex justify-between items-center">
                          <span class="text-sm text-gray-600">Password:</span>
                          <div class="flex items-center gap-2">
                            <span class="text-sm font-medium text-gray-900 font-mono">{{ user.password }}</span>
                            <button @click="copyPassword(user.password)" 
                                    class="text-green-600 hover:text-green-800 transition-colors duration-300">
                              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"/>
                              </svg>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div>
                      <p class="text-sm text-green-700 mb-1">Next Steps:</p>
                      <div class="text-xs text-green-600 space-y-1">
                        <p class="flex items-center gap-1">
                          <svg class="w-3 h-3 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                          </svg>
                          Share credentials with the user
                        </p>
                        <p class="flex items-center gap-1">
                          <svg class="w-3 h-3 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                          </svg>
                          User can now login to their account
                        </p>
                        <p class="flex items-center gap-1">
                          <svg class="w-3 h-3 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                          </svg>
                          Wallet will be automatically created
                        </p>
                      </div>
                    </div>
                  </div>
                  <p class="text-xs text-green-600 mt-3">
                    <strong>Important:</strong> The user must change their password on first login.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Footer Info -->
      <div class="mt-8 p-6 bg-white/90 backdrop-blur-sm border border-purple-200 rounded-2xl shadow-lg">
        <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div class="text-sm text-purple-700">
            <p class="font-medium mb-1">Approval Guidelines:</p>
            <ul class="text-xs text-gray-600 space-y-1">
              <li class="flex items-center gap-1">• Verify bank details match official documents</li>
              <li class="flex items-center gap-1">• Ensure email format is valid</li>
              <li class="flex items-center gap-1">• Save credentials securely before approving</li>
            </ul>
          </div>
          <div class="flex items-center gap-4">
            <button @click="refreshApprovals" 
                    class="px-4 py-2 bg-white border border-purple-300 text-purple-700 font-medium rounded-lg 
                           hover:bg-purple-50 hover:border-purple-400 transition-colors duration-300 text-sm 
                           flex items-center gap-2">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
              </svg>
              Refresh List
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue';
import { useStore } from 'vuex';

// Use Vuex store
const store = useStore();

// Computed properties mapping to Vuex state
const pendingUsers = computed(() => {
  return store.state.user.pendingUsers;
});

const pendingCount = computed(() => {
  return store.state.user.pendingCount;
});

const approvedCount = computed(() => {
  return store.state.user.approvedCount;
});

const rejectedCount = computed(() => {
  return store.state.user.rejectedCount;
});

const generatePassword = () => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let password = '';
  for (let i = 0; i < 8; i++) {
    password += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return password;
};

const getUserInitials = (name: string) => {
  if (!name) return 'U';
  return name
    .split(' ')
    .map(word => word[0])
    .join('')
    .toUpperCase()
    .substring(0, 2);
};

const approveUser = async (id: number) => {
  if (confirm('Are you sure you want to approve this user? This action cannot be undone.')) {
    const password = generatePassword();
    try {
      await store.dispatch('user/updateApprovalStatus', {
        id,
        status: 'APPROVED',
        password
      });
      
      const userEmail = store.state.user.pendingUsers.find((u: any) => u.id === id)?.email;
      alert(`User Approved Successfully!\n\nEmail: ${userEmail}\nPassword: ${password}\n\nPlease save these credentials and share with the user.`);
    } catch (error) {
      console.error('Error approving user:', error);
      alert('Failed to approve user. Please try again.');
    }
  }
};

const rejectUser = async (id: number) => {
  if (confirm('Are you sure you want to reject this user? This action cannot be undone.')) {
    try {
      await store.dispatch('user/updateApprovalStatus', {
        id,
        status: 'REJECTED'
      });
      alert('User has been rejected.');
    } catch (error) {
      console.error('Error rejecting user:', error);
      alert('Failed to reject user. Please try again.');
    }
  }
};

const copyPassword = (password: string) => {
  navigator.clipboard.writeText(password).then(() => {
    alert('Password copied to clipboard!');
  }).catch(err => {
    console.error('Failed to copy password:', err);
  });
};

const refreshApprovals = () => {
  store.dispatch('user/fetchPendingUsers');
  alert('Approvals list refreshed!');
};

// Fetch pending users on component mount
onMounted(() => {
  store.dispatch('user/fetchPendingUsers');
});
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