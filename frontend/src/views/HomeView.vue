<template>
  <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
    <TicketForm @submitted="fetchTickets" />
    <TicketList :tickets="tickets" />
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import TicketForm from "../components/TicketForm.vue";
import TicketList from "../components/TicketList.vue";

const tickets = ref([]);

const fetchTickets = async () => {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/api/tickets/by-ip`);
  const data = await res.json();
  tickets.value = data;
};

onMounted(fetchTickets);
</script>
