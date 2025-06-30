<template>
  <div class="bg-white p-6 rounded shadow">
    <h2 class="text-xl font-semibold mb-4">🎫 All Tickets</h2>
    <div v-for="ticket in tickets" :key="ticket._id" class="border-b py-2">
      <router-link
        :to="`/tickets/${ticket._id}`"
        class="text-blue-600 hover:underline"
      >
        {{ ticket.title }} - {{ ticket.status }}
      </router-link>
      <div class="text-sm text-gray-600">By: {{ ticket.createdBy }}</div>
    </div>
  </div>
</template>

<script setup>
defineProps(["tickets"]);
</script>
