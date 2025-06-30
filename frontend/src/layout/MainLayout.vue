<template>
  <div class="min-h-screen bg-slate-100">
    <header class="bg-white shadow p-4">
      <div class="max-w-7xl mx-auto flex justify-between items-center">
        <h1 class="text-xl font-bold text-blue-700">
          🏥 Bolnički Tiket Sistem
        </h1>

        <div class="flex items-center gap-4">
          <router-link to="/" class="text-sm text-blue-600 hover:underline">
            Početna
          </router-link>

          <button
            v-if="isAuthenticated"
            @click="logout"
            class="text-sm text-white bg-red-600 px-4 py-1.5 rounded hover:bg-red-700"
          >
            🚪 Logout
          </button>
        </div>
      </div>
    </header>

    <main class="max-w-7xl mx-auto px-4 py-6">
      <slot />
    </main>

    <footer class="text-center text-sm text-gray-500 py-4 border-t">
      &copy; {{ new Date().getFullYear() }} Bolnički sistem
    </footer>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";

const isAuthenticated = ref(false);
const router = useRouter();

const checkAuth = () => {
  isAuthenticated.value = !!localStorage.getItem("adminToken");
};

const logout = () => {
  localStorage.removeItem("adminToken");
  isAuthenticated.value = false;
  router.push("/admin-login");
};

onMounted(checkAuth);
</script>
