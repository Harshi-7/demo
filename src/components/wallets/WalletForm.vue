<template>
  <div class="p-6">
    <h2 class="text-xl font-bold mb-4">Create Wallet</h2>
    <form @submit.prevent="submitForm" class="space-y-4">
      <input v-model="form.userId" type="number" placeholder="User ID" class="w-full p-2 border rounded">
      <input v-model="form.initialBalance" type="number" placeholder="Initial Balance" class="w-full p-2 border rounded">
      <button type="submit" class="bg-blue-600 text-white px-4 py-2 rounded">
        Create Wallet
      </button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue';
import { useStore } from 'vuex';

const store = useStore();
const form = reactive({
  userId: 1,
  initialBalance: 0
});

const submitForm = async () => {
  try {
    await store.dispatch('wallet/createWallet', {
      userId: form.userId,
      balance: form.initialBalance
    });
    form.userId = 1;
    form.initialBalance = 0;
    alert('Wallet created successfully!');
  } catch (error) {
    console.error('Error creating wallet:', error);
    alert('Failed to create wallet. Please try again.');
  }
};
</script>