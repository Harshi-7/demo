<template>
  <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900 p-4">
    <!-- Animated Background Elements -->
    <div class="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
      <div class="absolute top-10 right-10 w-80 h-80 bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse-slow"></div>
      <div class="absolute bottom-10 left-10 w-80 h-80 bg-indigo-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse-slow animation-delay-2000"></div>
    </div>

    <div class="relative w-full max-w-2xl animate-fade-in">
      <!-- Back Button -->
      <router-link to="/login" class="absolute -top-16 left-0 flex items-center gap-2 text-purple-300 hover:text-white transition-colors duration-300 group">
        <svg class="w-5 h-5 transform group-hover:-translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"/>
        </svg>
        Back to Login
      </router-link>

      <!-- Glassmorphism Card -->
      <div class="backdrop-blur-lg bg-white/10 border border-white/20 rounded-2xl shadow-2xl shadow-purple-900/30 overflow-hidden">
        <!-- Header Section -->
        <div class="bg-gradient-to-r from-purple-600/20 to-indigo-600/20 p-6 border-b border-white/10">
          <div class="flex items-center gap-4">
            <div class="w-12 h-12 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl shadow-lg flex items-center justify-center">
              <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"/>
              </svg>
            </div>
            <div>
              <h1 class="text-2xl font-bold text-white">Create Account</h1>
              <p class="text-purple-200">Join our secure financial platform</p>
            </div>
          </div>
        </div>

        <!-- Registration Form -->
        <div class="p-8">
          <form @submit.prevent="register" class="space-y-6">
            <!-- Two Column Layout for Desktop -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <!-- Left Column -->
              <div class="space-y-6">
                <!-- Full Name -->
                <div class="space-y-2">
                  <label class="block text-sm font-medium text-purple-100">Full Name</label>
                  <div class="relative">
                    <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg class="h-5 w-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                      </svg>
                    </div>
                    <input v-model="form.name" required
                           class="block w-full pl-10 pr-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl 
                                  text-white placeholder-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent
                                  transition-all duration-300"
                           placeholder="John Doe">
                  </div>
                </div>

                <!-- Email -->
                <div class="space-y-2">
                  <label class="block text-sm font-medium text-purple-100">Email Address</label>
                  <div class="relative">
                    <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg class="h-5 w-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                      </svg>
                    </div>
                    <input v-model="form.email" type="email" required
                           class="block w-full pl-10 pr-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl 
                                  text-white placeholder-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent
                                  transition-all duration-300"
                           placeholder="you@example.com">
                  </div>
                </div>

                <!-- Password -->
                <div class="space-y-2">
                  <label class="block text-sm font-medium text-purple-100">Password</label>
                  <div class="relative">
                    <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg class="h-5 w-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
                      </svg>
                    </div>
                    <input v-model="form.password" type="password" required
                           class="block w-full pl-10 pr-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl 
                                  text-white placeholder-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent
                                  transition-all duration-300"
                           placeholder="••••••••">
                  </div>
                </div>

                <!-- Confirm Password -->
                <div class="space-y-2">
                  <label class="block text-sm font-medium text-purple-100">Confirm Password</label>
                  <div class="relative">
                    <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg class="h-5 w-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
                      </svg>
                    </div>
                    <input v-model="form.confirmPassword" type="password" required
                           class="block w-full pl-10 pr-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl 
                                  text-white placeholder-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent
                                  transition-all duration-300"
                           placeholder="••••••••">
                  </div>
                </div>
              </div>

              <!-- Right Column -->
              <div class="space-y-6">
                <!-- Bank Account -->
                <div class="space-y-2">
                  <label class="block text-sm font-medium text-purple-100">Bank Account Number</label>
                  <div class="relative">
                    <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg class="h-5 w-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"/>
                      </svg>
                    </div>
                    <input v-model="form.bankAccount" required
                           class="block w-full pl-10 pr-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl 
                                  text-white placeholder-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent
                                  transition-all duration-300"
                           placeholder="1234 5678 9012 3456">
                  </div>
                </div>

                <!-- Bank Name -->
                <div class="space-y-2">
                  <label class="block text-sm font-medium text-purple-100">Bank Name</label>
                  <div class="relative">
                    <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg class="h-5 w-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/>
                      </svg>
                    </div>
                    <input v-model="form.bankName" required
                           class="block w-full pl-10 pr-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl 
                                  text-white placeholder-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent
                                  transition-all duration-300"
                           placeholder="State Bank of India">
                  </div>
                </div>

                <!-- IFSC Code -->
                <div class="space-y-2">
                  <label class="block text-sm font-medium text-purple-100">IFSC Code</label>
                  <div class="relative">
                    <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg class="h-5 w-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2"/>
                      </svg>
                    </div>
                    <input v-model="form.ifsc" required
                           class="block w-full pl-10 pr-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl 
                                  text-white placeholder-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent
                                  transition-all duration-300"
                           placeholder="SBIN0001234">
                  </div>
                </div>

                <!-- Info Box -->
                <div class="p-4 bg-purple-500/10 border border-purple-500/20 rounded-xl backdrop-blur-sm">
                  <div class="flex items-start gap-3">
                    <svg class="w-5 h-5 text-purple-300 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                    <div class="text-sm text-purple-200">
                      <p class="font-medium mb-1">Important Information</p>
                      <p>Your account will be reviewed by an administrator. You'll receive login credentials via email once approved.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Submit Button -->
            <div class="pt-4">
              <button type="submit" :disabled="loading"
                      class="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold py-3 px-4 rounded-xl 
                             shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50 hover:scale-[1.02] transform transition-all duration-300 
                             disabled:opacity-50 disabled:cursor-not-allowed">
                <span v-if="!loading" class="flex items-center justify-center gap-2">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                  Register for Approval
                </span>
                <span v-else class="flex items-center justify-center">
                  <svg class="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                </span>
              </button>
            </div>

            <!-- Messages -->
            <div v-if="error" class="p-4 bg-red-500/20 border border-red-500/30 rounded-xl backdrop-blur-sm animate-slide-up">
              <div class="flex items-center gap-2 text-red-200">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
                <span>{{ error }}</span>
              </div>
            </div>

            <div v-if="success" class="p-4 bg-green-500/20 border border-green-500/30 rounded-xl backdrop-blur-sm animate-slide-up">
              <div class="flex items-center gap-2 text-green-200">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
                <span>{{ success }}</span>
              </div>
            </div>
          </form>

          <!-- Login Link -->
          <div class="mt-8 pt-6 border-t border-white/10">
            <p class="text-center text-purple-200">
              Already have an account?
              <router-link to="/login" class="text-white font-semibold hover:text-purple-300 transition-colors duration-300 ml-1">
                Sign in here
              </router-link>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';

const form = reactive({
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
  bankAccount: '',
  bankName: '',
  ifsc: ''
});

const error = ref('');
const success = ref('');
const loading = ref(false);
const router = useRouter();
const store = useStore();

const register = async () => {
  // Reset messages
  error.value = '';
  success.value = '';

  // Validate all fields
  if (!form.name || !form.email || !form.password || !form.confirmPassword || 
      !form.bankAccount || !form.bankName || !form.ifsc) {
    error.value = 'All fields are required';
    return;
  }

  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(form.email)) {
    error.value = 'Please enter a valid email address';
    return;
  }

  // Validate password match
  if (form.password !== form.confirmPassword) {
    error.value = 'Passwords do not match';
    return;
  }

  // Validate password strength
  if (form.password.length < 6) {
    error.value = 'Password must be at least 6 characters long';
    return;
  }

  loading.value = true;

  try {
    // Call Vuex register action
    const response = await store.dispatch('auth/register', {
      name: form.name,
      email: form.email,
      password: form.password
    });

    if (response.success) {
      success.value = response.message || 'Registration successful! Admin will review your application within 24 hours.';
      
      // Reset form
      form.name = '';
      form.email = '';
      form.password = '';
      form.confirmPassword = '';
      form.bankAccount = '';
      form.bankName = '';
      form.ifsc = '';
      
      // Also add to user store with bank details
      store.dispatch('user/addUser', {
        name: form.name,
        email: form.email,
        bankAccount: form.bankAccount,
        bankName: form.bankName,
        ifsc: form.ifsc,
        role: 'CUSTOMER',
        approvalStatus: 'PENDING'
      });
      
      // Redirect after delay
      setTimeout(() => {
        router.push('/login');
      }, 3000);
    } else {
      error.value = response.message || 'Registration failed. Please try again.';
    }
  } catch (err: any) {
    error.value = err.message || 'Registration failed. Please try again.';
    console.error('Registration error:', err);
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
.animation-delay-2000 {
  animation-delay: 2s;
}

.animate-slide-up {
  animation: slideUp 0.3s ease-out;
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in {
  animation: fadeIn 0.5s ease-in-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style>