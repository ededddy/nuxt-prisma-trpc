<template>
  <div
    class="flex items-center justify-center min-h-screen bg-gray-100 font-sans"
  >
    <div class="w-full max-w-md p-8 space-y-4 bg-white rounded shadow-md mx-5">
      <h1 class="text-2xl font-bold text-center">Login</h1>
    </div>
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
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const email = ref("");
const password = ref("");
const router = useRouter();

const login = async () => {
  try {
    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: email.value, password: password.value }),
    });

    if (response.ok) {
      router.push("/");
    } else {
      alert("Login failed");
    }
  } catch (error) {
    console.error("Error logging in:", error);
  }
};
</script>

