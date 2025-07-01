<template>
  <MainLayout>
    <div class="flex justify-center items-center min-h-[70vh]">
      <div class="bg-white shadow-xl rounded-2xl p-8 w-full max-w-sm">
        <h2 class="text-2xl font-bold text-center text-blue-700 mb-6 flex items-center justify-center gap-2">
          <img :src="Icon" alt="Admin ikona" class="h-6 w-6" />
          Admin Prijava
        </h2>

        <div class="space-y-4">
          <input
            v-model="username"
            placeholder="Korisničko ime"
            class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          <input
            v-model="password"
            type="password"
            placeholder="Lozinka"
            class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          <button
            @click="login"
            class="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition duration-200"
          >
            Prijavi se
          </button>

          <p v-if="error" class="text-red-600 text-sm text-center">
            {{ error }}
          </p>
        </div>
      </div>
    </div>
  </MainLayout>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import MainLayout from "../layout/MainLayout.vue";
import Icon from "@/assets/icons/helpdesk.png";

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
    error.value = "Pogrešno korisničko ime ili lozinka";
  }
};

onMounted(() => {
  document.title = `Admin Prijava - HelpDesk`;
});
</script>
