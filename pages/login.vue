<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { signIn } from "@/lib/authClient"; // Adjust the import path as necessary

const email = ref("");
const password = ref("");
const router = useRouter();

const login = async () => {
  try {
    const { _data, error } = await signIn.email({
      email: email.value,
      password: password.value,
    });

    if (!error) {
      router.push("/");
    } else {
      throw new Error(error.message);
    }
  } catch (error) {
    alert("Login failed");
    console.error("Error logging in:", error);
  }
};
</script>
<template>
  <div
    class="flex items-center justify-center min-h-screen bg-gray-100 font-sans"
  >
    <div class="w-full max-w-md p-8 space-y-4 bg-white rounded shadow-md mx-5">
      <h1 class="text-2xl font-bold text-center">Login</h1>
    </div>
    <div>
      <form @submit.prevent="login" class="space-y-6">
        <input
          v-model="email"
          type="email"
          placeholder="Email"
          required
          class="w-full border rounded focus:ring-2 focus:ring-blue-500"
        />
        <input
          v-model="password"
          type="password"
          placeholder="Password"
          required
          class="w-full border rounded focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          class="w-full text-white bg-blue-500 rounded hover:bg-blue-600"
        >
          Login
        </button>
      </form>
      <button
        class="my-3 w-full text-white bg-blue-500 rounded hover:bg-blue-600"
        @click="router.push('/register')"
      >
        Sign Up
      </button>
    </div>
  </div>
</template>
