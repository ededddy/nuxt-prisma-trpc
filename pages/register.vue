<script setup lang="ts">
import { ref } from "vue";
import { signUp } from "@/lib/authClient";
import { useRouter } from "vue-router";

const name = ref("");
const email = ref("");
const password = ref("");
const router = useRouter();

const register = async () => {
  try {
    const { _data, error } = await signUp.email({
      name: name.value, // required
      email: email.value, // required
      password: password.value, // required
    });
    if (!error) {
      router.push("/");
    } else {
      throw new Error(error.message);
    }
  } catch (error) {
    alert("Register Failed");
    console.error("Error registering:", error);
  }
};
</script>
<template>
  <div
    class="flex items-center justify-center min-h-screen bg-gray-100 font-sans"
  >
    <div class="w-full max-w-md p-8 space-y-4 bg-white rounded shadow-md mx-5">
      <h1 class="text-2xl font-bold text-center">Register</h1>
    </div>
    <div>
      <form class="space-y-6" @submit.prevent="register">
        <input
          v-model="name"
          type="name"
          placeholder="Name"
          required
          class="w-full border rounded focus:ring-2 focus:ring-blue-500"
        />
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
      <button
        class="my-3 w-full text-white bg-blue-500 rounded hover:bg-blue-600"
        @click="router.push('/login')"
      >
        Login
      </button>
    </div>
  </div>
</template>
