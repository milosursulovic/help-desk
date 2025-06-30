<template>
  <div class="min-h-screen bg-slate-100">
    <header class="bg-white shadow p-4">
      <div class="max-w-7xl mx-auto flex justify-between items-center">
        <div class="flex items-center gap-2">
          <img :src="Icon" alt="Ikona" class="w-6 h-6" />
          <h1 class="text-xl font-bold text-blue-700">HelpDesk</h1>
        </div>

        <div class="flex items-center gap-4">
          <router-link to="/" class="text-sm text-blue-600 hover:underline">
            Početna
          </router-link>

          <button
            v-if="isAuthenticated"
            @click="logout"
            class="text-sm text-white bg-red-600 px-4 py-1.5 rounded hover:bg-red-700"
          >
            🚪 Odjavi se
          </button>
        </div>
      </div>
    </header>

    <main class="max-w-7xl mx-auto px-4 py-6">
      <slot />
    </main>

    <footer class="text-center text-sm text-gray-500 py-4 border-t">
      <div>
        &copy; {{ new Date().getFullYear() }} Informacioni sistem Opšte bolnice
        Bor
      </div>
      <div class="mt-1 text-xs text-gray-400">Verzija: {{ appVersion }}</div>
    </footer>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import Icon from "../assets/icons/helpdesk.png";

const isAuthenticated = ref(false);
const router = useRouter();

const appVersion = import.meta.env.VITE_APP_VERSION;

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
