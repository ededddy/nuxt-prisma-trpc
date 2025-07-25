<template>
  <div
    class="flex items-center justify-center min-h-screen bg-gray-100 font-sans"
  >
    <div class="w-full max-w-md p-8 space-y-4 bg-white rounded shadow-md mx-5">
      <h1 class="text-2xl font-bold text-center">Register</h1>
    </div>
    <form @submit.prevent="register" class="space-y-6">
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
        Register
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

const register = async () => {
  try {
    const response = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: email.value, password: password.value }),
    });

    if (response.ok) {
      router.push("/login");
    } else {
      alert("Registration failed");
    }
  } catch (error) {
    console.error("Error registering:", error);
  }
};
</script>

