<template>
  <div class="bg-white p-6 rounded shadow">
    <h2 class="text-2xl font-bold mb-4">🔧 Admin Panel</h2>

    <div v-for="ticket in tickets" :key="ticket._id" class="border-b py-2">
      <div class="font-semibold">
        {{ ticket.title }} -
        <span class="text-blue-600">{{ ticket.status }}</span>
      </div>
      <div class="text-sm text-gray-600">
        By: {{ ticket.createdBy }} | IP: {{ ticket.ipAddress }} |
        {{ new Date(ticket.createdAt).toLocaleString() }}
      </div>
      <p class="mt-1">{{ ticket.description }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

const tickets = ref([]);

const fetchTickets = async () => {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/api/tickets`);
  tickets.value = await res.json();
};

onMounted(fetchTickets);
</script>
