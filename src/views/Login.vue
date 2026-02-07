<template>
  <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900 p-4">
    <!-- Animated Background Elements -->
    <div class="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
      <div class="absolute top-20 left-10 w-72 h-72 bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse-slow"></div>
      <div class="absolute bottom-20 right-10 w-72 h-72 bg-indigo-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse-slow animation-delay-2000"></div>
      <div class="absolute top-1/2 left-1/3 w-64 h-64 bg-violet-600 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse-slow animation-delay-4000"></div>
    </div>

    <div class="relative w-full max-w-md animate-fade-in">
      <!-- Glassmorphism Card -->
      <div class="backdrop-blur-lg bg-white/10 border border-white/20 rounded-2xl shadow-2xl shadow-purple-900/30 p-8">
        <!-- Logo/Header -->
        <div class="text-center mb-8">
          <div class="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-2xl shadow-lg mb-4">
            <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
            </svg>
          </div>
          <h1 class="text-3xl font-bold text-white mb-2">Digital Wallet</h1>
          <p class="text-purple-200">Secure financial management platform</p>
        </div>

        <!-- Login Form -->
        <form @submit.prevent="handleLogin" class="space-y-6">
          <div class="space-y-2">
            <label class="block text-sm font-medium text-purple-100">Email Address</label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg class="h-5 w-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                </svg>
              </div>
              <input v-model="email" type="email" required
                     class="block w-full pl-10 pr-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl 
                            text-white placeholder-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent
                            transition-all duration-300"
                     placeholder="you@example.com">
            </div>
          </div>

          <div class="space-y-2">
            <label class="block text-sm font-medium text-purple-100">Password</label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg class="h-5 w-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
                </svg>
              </div>
              <input v-model="password" type="password" required
                     class="block w-full pl-10 pr-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl 
                            text-white placeholder-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent
                            transition-all duration-300"
                     placeholder="••••••••">
            </div>
          </div>

          <button type="submit" :disabled="!email || !password || loading"
                  class="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold py-3 px-4 rounded-xl 
                         shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50 hover:scale-[1.02] transform transition-all duration-300 
                         disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100">
            <span v-if="!loading" class="flex items-center justify-center gap-2">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"/>
              </svg>
              Sign In
            </span>
            <span v-else class="flex items-center justify-center">
              <svg class="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            </span>
          </button>

          <div v-if="error" class="mt-4 p-4 bg-red-500/20 border border-red-500/30 rounded-xl backdrop-blur-sm">
            <div class="flex items-center gap-2 text-red-200">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
              <span>{{ error }}</span>
            </div>
          </div>
        </form>

        <!-- Registration Link -->
        <div class="mt-8 pt-6 border-t border-white/10">
          <p class="text-center text-purple-200">
            New to Digital Wallet?
            <router-link to="/register" class="text-white font-semibold hover:text-purple-300 transition-colors duration-300 ml-1">
              Create an account
            </router-link>
          </p>
        </div>

        <!-- Demo Credentials -->
        <div class="mt-6 p-4 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10">
          <h3 class="text-sm font-semibold text-purple-100 mb-2 flex items-center gap-2">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
            Demo Credentials
          </h3>
          <div class="space-y-1 text-sm text-purple-300">
            <div class="flex justify-between">
              <span class="text-purple-200">Admin:</span>
              <span class="font-mono">admin@test.com / admin123</span>
            </div>
            <div class="flex justify-between">
              <span class="text-purple-200">Customer:</span>
              <span class="font-mono">john@test.com / customer123</span>
            </div>
            <div class="flex justify-between">
              <span class="text-purple-200">Finance:</span>
              <span class="font-mono">finance@test.com / finance123</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';

const email = ref('admin@test.com');
const password = ref('admin123');
const error = ref('');
const loading = ref(false);
const router = useRouter();
const store = useStore();

// Initialize auth from localStorage on component mount
onMounted(() => {
  store.dispatch('auth/initAuth');
});

const handleLogin = async () => {
  error.value = '';
  loading.value = true;
  
  try {
    // Call Vuex auth action
    const response = await store.dispatch('auth/login', {
      email: email.value,
      password: password.value
    });
    
    if (response) {
      // Add success animation delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Redirect based on role
      const userRole = store.state.auth.userRole;
      switch (userRole) {
        case 'ADMIN':
          router.push('/users');
          break;
        case 'CUSTOMER':
          router.push('/my-wallet');
          break;
        case 'FINANCE_MANAGER':
          router.push('/finance-dashboard');
          break;
        default:
          error.value = 'Invalid user role';
          return;
      }
    } else {
      error.value = 'Invalid credentials or account not approved';
    }
  } catch (err: any) {
    error.value = err.message || 'Login failed. Please try again.';
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
.animation-delay-2000 {
  animation-delay: 2s;
}
.animation-delay-4000 {
  animation-delay: 4s;
}

.animate-fade-in {
  animation: fadeIn 0.5s ease-in-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>