<template>
  <MainLayout>
    <div class="max-w-sm mx-auto mt-20">
      <h2 class="text-2xl font-bold mb-4 text-center">Admin Prijava</h2>

      <input
        v-model="username"
        placeholder="Korisničko ime"
        class="w-full border border-gray-300 rounded p-2 mb-3"
      />

      <input
        v-model="password"
        type="password"
        placeholder="Lozinka"
        class="w-full border border-gray-300 rounded p-2 mb-3"
      />

      <button
        @click="login"
        class="w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        🔐 Prijavi se
      </button>

      <p v-if="error" class="text-red-600 mt-2 text-sm text-center">
        {{ error }}
      </p>
    </div>
  </MainLayout>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import MainLayout from "../layout/MainLayout.vue";

const username = ref("");
const password = ref("");
const error = ref("");
const router = useRouter();

const login = async () => {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      username: username.value,
      password: password.value,
    }),
  });

  if (res.ok) {
    const { token } = await res.json();
    localStorage.setItem("adminToken", token);
    router.push("/admin");
  } else {
    error.value = "Pogrešano korisničko ili lozinka";
  }
};

onMounted(() => {
  document.title = `Admin Prijava - HelpDesk`;
});
</script>
