<template>
  <div class="p-6">
    <h2 class="text-xl font-bold mb-4">Create User</h2>
    <form @submit.prevent="submitForm" class="space-y-4">
      <input v-model="form.name" placeholder="Name" class="w-full p-2 border rounded">
      <input v-model="form.email" placeholder="Email" class="w-full p-2 border rounded">
      <select v-model="form.role" class="w-full p-2 border rounded">
        <option value="CUSTOMER">Customer</option>
        <option value="ADMIN">Admin</option>
      </select>
      <button type="submit" class="bg-blue-600 text-white px-4 py-2 rounded">
        Create User
      </button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue';
import { useStore } from 'vuex';

const store = useStore();
const form = reactive({
  name: '',
  email: '',
  role: 'CUSTOMER'
});

const submitForm = () => {
  store.dispatch('user/addUser', form);
  form.name = '';
  form.email = '';
};
</script>