<script setup lang="ts">
useHead({
  title: "Nuxt + Prisma + TRPC",
  meta: [
    {
      name: "description",
      content: "This is a simple Nuxt 3 + Prisma + TRPC application.",
    },
  ],
});

const { $trpc } = useNuxtApp();

const email = ref<string>("");

const user = ref<{
  email: string;
  id: number;
  name: string;
} | null>(null);

async function handleSearch() {
  if (email.value.length > 0) {
    const { data: findByEmail } = await $trpc.users.findByEmail.useQuery({
      email: email.value,
    });
    user.value = findByEmail.value.user;
  }
}
</script>
<template>
  <div>
    <h1 class="text-3xl font-bold underline">Nuxt 3 + Prisma + TRPC!</h1>
    <input
      v-model="email"
      class="text-3xl m-3 border rounded-2xl p-3"
      type="email"
    />
    <button
      class="block text-3xl m-3 p-3 bg-teal-500 rounded-2xl text-white"
      @click="handleSearch"
    >
      Search
    </button>
    <p v-if="user" class="text-2xl m-3">Name: {{ user?.name }}</p>
    <p v-if="user" class="text-2xl m-3">Email: {{ user?.email }}</p>
  </div>
</template>
