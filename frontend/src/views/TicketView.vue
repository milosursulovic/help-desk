<template>
  <MainLayout>
    <div class="bg-white p-6 rounded shadow max-w-2xl mx-auto">
      <h2 class="text-2xl font-bold mb-2">{{ ticket.title }}</h2>
      <p class="text-gray-600 mb-2">{{ ticket.description }}</p>
      <p class="mb-2">
        Status: <strong>{{ ticket.status }}</strong>
      </p>
      <p class="mb-4 text-sm text-gray-500">
        Prijavio {{ ticket.createdBy }} | Napravljeno
        {{ new Date(ticket.createdAt).toLocaleString() }}
      </p>

      <div v-if="ticket.comments?.length">
        <h3 class="font-semibold mb-2">💬 Komentari</h3>
        <div
          v-for="(c, i) in ticket.comments"
          :key="i"
          class="text-sm border-t py-1"
        >
          <strong>{{ c.author }}:</strong> {{ c.message }}
        </div>
      </div>
    </div>
  </MainLayout>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import MainLayout from "../layout/MainLayout.vue";

const route = useRoute();
const ticket = ref({});

onMounted(async () => {
  const res = await fetch(
    `${import.meta.env.VITE_API_URL}/api/tickets/${route.params.id}`,
  );
  if (res.ok) {
    ticket.value = await res.json();
  } else {
    alert("Tiket nije pronađen");
  }
});
</script>
