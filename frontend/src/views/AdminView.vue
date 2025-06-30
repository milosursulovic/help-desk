<template>
  <div class="bg-white p-6 rounded shadow max-w-5xl mx-auto">
    <h2 class="text-2xl font-bold mb-6">🛠️ Admin Panel</h2>

    <div v-for="ticket in tickets" :key="ticket._id" class="border-t py-4">
      <h3 class="text-xl font-semibold">{{ ticket.title }}</h3>
      <p class="text-sm text-gray-600">
        Prijavio {{ ticket.createdBy }} | IP: {{ ticket.ipAddress }} |
        Napravljeno:
        {{ new Date(ticket.createdAt).toLocaleString() }}
      </p>
      <p class="mt-2">{{ ticket.description }}</p>

      <div class="mt-2">
        <label class="font-medium mr-2">Status:</label>
        <select v-model="ticket.status" class="border rounded px-2 py-1">
          <option>Otvoren</option>
          <option>U toku</option>
          <option>Završen</option>
        </select>
      </div>

      <div class="mt-2">
        <label class="font-medium mr-2">Dodaj komentar:</label>
        <input
          v-model="ticket.newComment"
          class="border px-2 py-1 rounded w-2/3"
          placeholder="Komentar (opcionalno)..."
        />
      </div>

      <button
        @click="updateTicket(ticket)"
        class="mt-3 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
      >
        💾 Sačuvaj promene
      </button>

      <div v-if="ticket.comments?.length" class="mt-4 text-sm">
        <p class="font-semibold mb-1">💬 Komentari:</p>
        <ul>
          <li
            v-for="(c, idx) in ticket.comments"
            :key="idx"
            class="text-gray-700"
          >
            • <strong>{{ c.author }}</strong
            >: {{ c.message }}
            <span class="text-gray-400"
              >({{ new Date(c.timestamp).toLocaleString() }})</span
            >
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

const tickets = ref([]);

const fetchTickets = async () => {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/api/tickets`);
  tickets.value = (await res.json()).map((t) => ({ ...t, newComment: "" }));
};

const updateTicket = async (ticket) => {
  const body = {
    status: ticket.status,
  };

  if (ticket.newComment?.trim()) {
    body.comment = ticket.newComment;
    body.author = "Admin";
  }

  const res = await fetch(
    `${import.meta.env.VITE_API_URL}/api/tickets/${ticket._id}`,
    {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    }
  );

  if (res.ok) {
    ticket.newComment = "";
    const updated = await res.json();
    ticket.status = updated.status;
    ticket.comments = updated.comments;
    alert("✅ Tiket izmenjen");
  } else {
    const err = await res.json();
    alert(`❌ Neuspešna izmena tiketa: ${err.error}`);
  }
};

onMounted(fetchTickets);
</script>
