<script setup lang="ts">
import { useSession, signOut } from "@/lib/authClient";
import { useRouter } from "vue-router";
const { $trpc } = useNuxtApp();

const { data: session } = await useSession(useFetch);
const router = useRouter();

const protectedProdTest = ref<string>("");

async function queryProtectedProcedure() {
  try {
    const userEmail = session?.value?.user?.email || "";
    const { data: findByEmail, error } = await $trpc.users.findByEmail.useQuery(
      {
        email: userEmail,
      },
    );
    if (error.value) {
      switch (error.value.data.httpStatus) {
        case 401:
          protectedProdTest.value =
            "You must be logged in to access this resource.";
          break;
        default:
          protectedProdTest.value = error.stack;
      }
      return;
    }
    protectedProdTest.value = findByEmail?.value.user.name || "No user found";
  } catch (error) {
    console.error(error);
    protectedProdTest.value = error.message;
  }
}
</script>
<template>
  <div
    class="flex flex-col items-center justify-center min-h-screen font-sans test-bg"
  >
    <h1 class="underline text-4xl font-bold text-center text-blue-600">
      Welcome to Nuxt 3 + Prisma + TRPC!
    </h1>
    <p class="mt-4 text-lg text-center text-gray-700">
      This is the default landing page.
    </p>
    <pre v-if="protectedProdTest">{{ `User Name:${protectedProdTest}` }}</pre>
    <div>
      <button
        class="m-3 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        @click="queryProtectedProcedure()"
      >
        Test Protected TRPC Query
      </button>
      <button
        v-if="!session"
        class="m-3 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        @click="router.push('login')"
      >
        Sign In
      </button>
      <pre>{{ session }}</pre>
      <button
        v-if="session"
        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        @click="signOut()"
      >
        Sign out
      </button>
    </div>
  </div>
</template>
