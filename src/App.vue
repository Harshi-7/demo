<template>
  <div>
    <!-- Glassmorphism Navigation (Hidden on Mobile) -->
    <nav v-if="isAuthenticated" class="hidden md:block sticky top-0 z-50 backdrop-blur-xl bg-gradient-to-r from-purple-900/90 to-indigo-900/90 border-b border-white/10 shadow-2xl shadow-purple-900/20">
      <div class="container mx-auto px-4 md:px-6 py-3">
        <div class="flex items-center justify-between">
          
          <!-- Logo & Brand -->
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl shadow-lg flex items-center justify-center">
              <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
            </div>
            <span class="text-lg md:text-xl font-bold bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
              Digital Wallet
            </span>
          </div>

          <!-- Navigation Links -->
          <div class="flex items-center gap-1">
            <!-- Admin Navigation -->
            <template v-if="isAdmin">
              <router-link 
                v-for="link in adminLinks" 
                :key="link.to"
                :to="link.to"
                class="relative px-3 md:px-4 py-2 rounded-lg text-purple-100 hover:text-white transition-all duration-300 group text-sm md:text-base"
                active-class="bg-white/10 text-white"
              >
                <span class="flex items-center gap-1 md:gap-2">
                  <component :is="link.icon" class="w-4 h-4" />
                  <span class="hidden sm:inline">{{ link.label }}</span>
                </span>
                <span class="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 group-hover:w-6 md:group-hover:w-8 h-0.5 bg-gradient-to-r from-purple-400 to-indigo-400 transition-all duration-300"></span>
              </router-link>
            </template>

            <!-- Customer Navigation -->
            <template v-if="isCustomer">
              <router-link 
                v-for="link in customerLinks" 
                :key="link.to"
                :to="link.to"
                class="relative px-3 md:px-4 py-2 rounded-lg text-purple-100 hover:text-white transition-all duration-300 group text-sm md:text-base"
                active-class="bg-white/10 text-white"
              >
                <span class="flex items-center gap-1 md:gap-2">
                  <component :is="link.icon" class="w-4 h-4" />
                  <span class="hidden sm:inline">{{ link.label }}</span>
                </span>
                <span class="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 group-hover:w-6 md:group-hover:w-8 h-0.5 bg-gradient-to-r from-purple-400 to-indigo-400 transition-all duration-300"></span>
              </router-link>
            </template>

            <!-- Finance Manager Navigation -->
            <template v-if="isFinanceManager">
              <router-link 
                v-for="link in financeLinks" 
                :key="link.to"
                :to="link.to"
                class="relative px-3 md:px-4 py-2 rounded-lg text-purple-100 hover:text-white transition-all duration-300 group text-sm md:text-base"
                active-class="bg-white/10 text-white"
              >
                <span class="flex items-center gap-1 md:gap-2">
                  <component :is="link.icon" class="w-4 h-4" />
                  <span class="hidden sm:inline">{{ link.label }}</span>
                </span>
                <span class="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 group-hover:w-6 md:group-hover:w-8 h-0.5 bg-gradient-to-r from-purple-400 to-indigo-400 transition-all duration-300"></span>
              </router-link>
            </template>
          </div>

          <!-- User Profile & Actions -->
          <div class="flex items-center gap-2 md:gap-4">
            <!-- User Info -->
            <div class="hidden md:flex items-center gap-3 px-4 py-2 bg-white/5 rounded-xl backdrop-blur-sm border border-white/10">
              <div class="w-8 h-8 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-full flex items-center justify-center shadow">
                <span class="text-sm font-semibold text-white">{{ getUserInitials() }}</span>
              </div>
              <div class="text-sm">
                <p class="text-white font-medium truncate max-w-[120px]">{{ userName }}</p>
                <p class="text-purple-300 text-xs capitalize">{{ userRoleFormatted }}</p>
              </div>
            </div>

            <!-- Logout Button -->
            <button @click="logout" 
                    class="group relative px-3 md:px-4 py-2 bg-gradient-to-r from-red-500/20 to-red-600/20 backdrop-blur-sm border border-red-500/30 rounded-xl text-red-100 hover:text-white hover:border-red-400/50 transition-all duration-300 text-sm md:text-base">
              <span class="flex items-center gap-1 md:gap-2">
                <svg class="w-4 h-4 transform group-hover:rotate-12 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/>
                </svg>
                <span class="hidden sm:inline">Sign Out</span>
              </span>
              <span class="absolute inset-0 bg-gradient-to-r from-red-500/10 to-red-600/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
            </button>
          </div>
        </div>
      </div>
    </nav>

    <!-- Mobile Bottom Navigation Bar (Only on Mobile) -->
    <div v-if="isAuthenticated" class="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-gradient-to-t from-purple-900 to-indigo-900 border-t border-white/10 shadow-2xl shadow-purple-900/30">
      <div class="flex justify-around items-center px-2 py-3">
        <!-- Mobile Links based on role -->
        <template v-if="isAdmin">
          <router-link v-for="link in adminLinks" :key="link.to" :to="link.to"
                      class="flex flex-col items-center justify-center p-2 rounded-xl text-purple-100 hover:text-white transition-colors duration-300"
                      active-class="text-white bg-white/10">
            <component :is="link.icon" class="w-6 h-6 mb-1" />
            <span class="text-xs font-medium">{{ link.label.substring(0, 8) }}</span>
          </router-link>
        </template>
        
        <template v-if="isCustomer">
          <router-link v-for="link in customerLinks" :key="link.to" :to="link.to"
                      class="flex flex-col items-center justify-center p-2 rounded-xl text-purple-100 hover:text-white transition-colors duration-300"
                      active-class="text-white bg-white/10">
            <component :is="link.icon" class="w-6 h-6 mb-1" />
            <span class="text-xs font-medium">{{ link.label.substring(0, 8) }}</span>
          </router-link>
        </template>
        
        <template v-if="isFinanceManager">
          <router-link v-for="link in financeLinks" :key="link.to" :to="link.to"
                      class="flex flex-col items-center justify-center p-2 rounded-xl text-purple-100 hover:text-white transition-colors duration-300"
                      active-class="text-white bg-white/10">
            <component :is="link.icon" class="w-6 h-6 mb-1" />
            <span class="text-xs font-medium">{{ link.label.substring(0, 8) }}</span>
          </router-link>
        </template>
        
        <!-- User Profile Button -->
        <button @click="mobileMenuOpen = true"
                class="flex flex-col items-center justify-center p-2 rounded-xl text-purple-100 hover:text-white transition-colors duration-300">
          <div class="w-8 h-8 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-full flex items-center justify-center mb-1">
            <span class="text-xs font-bold text-white">{{ getUserInitials() }}</span>
          </div>
          <span class="text-xs font-medium">Me</span>
        </button>
      </div>
    </div>

    <!-- Mobile User Menu Modal -->
    <div v-if="mobileMenuOpen" class="md:hidden fixed inset-0 z-50">
      <!-- Backdrop -->
      <div class="absolute inset-0 bg-black/70 backdrop-blur-sm" @click="mobileMenuOpen = false"></div>
      
      <!-- Menu Panel -->
      <div class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-purple-900 to-indigo-900 rounded-t-3xl border-t border-white/20 shadow-2xl animate-slide-up">
        <!-- Header -->
        <div class="px-6 py-4 border-b border-white/10">
          <div class="flex items-center gap-3">
            <div class="w-12 h-12 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl flex items-center justify-center">
              <span class="text-sm font-bold text-white">{{ getUserInitials() }}</span>
            </div>
            <div class="flex-1">
              <h3 class="text-white font-bold text-lg">{{ userName }}</h3>
              <p class="text-purple-300 text-sm capitalize">{{ userRoleFormatted }}</p>
            </div>
            <button @click="mobileMenuOpen = false" class="text-white p-2">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
              </svg>
            </button>
          </div>
        </div>
        
        <!-- Menu Options -->
        <div class="p-4">
          <div class="space-y-2">
            <!-- Quick Actions -->
            <div class="mb-4">
              <h4 class="text-purple-300 text-sm font-medium mb-2 px-2">Quick Actions</h4>
              <div class="grid grid-cols-2 gap-2">
                <button @click="refreshApp" class="p-3 bg-white/10 rounded-xl text-white hover:bg-white/20 transition-colors duration-300 flex items-center justify-center gap-2">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
                  </svg>
                  Refresh
                </button>
                <button @click="goToSettings" class="p-3 bg-white/10 rounded-xl text-white hover:bg-white/20 transition-colors duration-300 flex items-center justify-center gap-2">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/>
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                  </svg>
                  Settings
                </button>
              </div>
            </div>
            
            <!-- All Navigation Links -->
            <h4 class="text-purple-300 text-sm font-medium mb-2 px-2">Navigation</h4>
            <div class="space-y-1">
              <template v-if="isAdmin">
                <router-link v-for="link in adminLinks" :key="link.to" :to="link.to"
                            @click="mobileMenuOpen = false"
                            class="flex items-center gap-3 px-4 py-3 rounded-xl text-white hover:bg-white/10 active:bg-white/20 transition-colors duration-300"
                            active-class="bg-white/10">
                  <component :is="link.icon" class="w-5 h-5" />
                  <span class="font-medium">{{ link.label }}</span>
                </router-link>
              </template>
              
              <template v-if="isCustomer">
                <router-link v-for="link in customerLinks" :key="link.to" :to="link.to"
                            @click="mobileMenuOpen = false"
                            class="flex items-center gap-3 px-4 py-3 rounded-xl text-white hover:bg-white/10 active:bg-white/20 transition-colors duration-300"
                            active-class="bg-white/10">
                  <component :is="link.icon" class="w-5 h-5" />
                  <span class="font-medium">{{ link.label }}</span>
                </router-link>
              </template>
              
              <template v-if="isFinanceManager">
                <router-link v-for="link in financeLinks" :key="link.to" :to="link.to"
                            @click="mobileMenuOpen = false"
                            class="flex items-center gap-3 px-4 py-3 rounded-xl text-white hover:bg-white/10 active:bg-white/20 transition-colors duration-300"
                            active-class="bg-white/10">
                  <component :is="link.icon" class="w-5 h-5" />
                  <span class="font-medium">{{ link.label }}</span>
                </router-link>
              </template>
            </div>
          </div>
        </div>
        
        <!-- Logout Button -->
        <div class="p-4 border-t border-white/10">
          <button @click="logout" 
                  class="w-full flex items-center justify-center gap-3 px-4 py-3 bg-gradient-to-r from-red-500/20 to-red-600/20 
                         backdrop-blur-sm border border-red-500/30 rounded-xl text-red-100 hover:text-white 
                         hover:border-red-400/50 active:scale-95 transition-all duration-300">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/>
            </svg>
            <span class="font-medium">Sign Out</span>
          </button>
        </div>
      </div>
    </div>

    <!-- Main Content with Mobile Padding -->
    <div :class="{'pb-16 md:pb-0': isAuthenticated}">
      <router-view />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

// Icons - You need to create these components
// For now, let's use simple SVG placeholders
import UsersIcon from './components/icons/UserIcon.vue';
import WalletIcon from './components/icons/WalletIcon.vue';
import ApprovalIcon from './components/icons/ApprovalIcon.vue';
import DashboardIcon from './components/icons/DashboardIcon.vue';
import PaymentIcon from './components/icons/PaymentIcon.vue';
import MakePaymentIcon from './components/icons/MakePaymentIcon.vue';

const store = useStore();
const router = useRouter();
const mobileMenuOpen = ref(false);

// Computed properties from Vuex auth state
const isAuthenticated = computed(() => store.state.auth.isAuthenticated);
const userName = computed(() => store.state.auth.userData?.name || 'User');
const userRole = computed(() => store.state.auth.userRole);
const userRoleFormatted = computed(() => {
  if (!userRole.value) return '';
  return userRole.value.toLowerCase().replace('_', ' ');
});

// Role-based computed properties
const isAdmin = computed(() => userRole.value === 'ADMIN');
const isCustomer = computed(() => userRole.value === 'CUSTOMER');
const isFinanceManager = computed(() => userRole.value === 'FINANCE_MANAGER');

// Navigation configurations
const adminLinks = [
  { to: '/users', label: 'Users', icon: UsersIcon },
  { to: '/wallets', label: 'Wallets', icon: WalletIcon },
  { to: '/pending-approvals', label: 'Approvals', icon: ApprovalIcon }
];

const customerLinks = [
  { to: '/my-wallet', label: 'My Wallet', icon: WalletIcon },
  { to: '/make-payment', label: 'Make Payment', icon: MakePaymentIcon }
];

const financeLinks = [
  { to: '/finance-dashboard', label: 'Dashboard', icon: DashboardIcon },
  { to: '/payments', label: 'Payments', icon: PaymentIcon }
];

const logout = () => {
  store.dispatch('auth/logout');
  router.push('/login');
  mobileMenuOpen.value = false;
};

const getUserInitials = () => {
  const name = userName.value;
  if (!name) return 'U';
  return name
    .split(' ')
    .map(word => word[0])
    .join('')
    .toUpperCase()
    .substring(0, 2);
};

const refreshApp = () => {
  window.location.reload();
  mobileMenuOpen.value = false;
};

const goToSettings = () => {
  alert('Settings page coming soon!');
  mobileMenuOpen.value = false;
};
</script>

<style scoped>
/* Custom animations */
.animate-slide-up {
  animation: slideUp 0.3s ease-out;
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(100%);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.fixed {
  position: fixed;
}
</style>