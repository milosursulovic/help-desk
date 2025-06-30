<template>
  <form @submit.prevent="submitTicket" class="bg-white p-6 rounded shadow">
    <h2 class="text-xl font-semibold mb-4">📨 Prijavi problem</h2>

    <input
      v-model="title"
      placeholder="Naslov"
      class="w-full border border-gray-300 rounded p-2 mb-3"
      required
    />
    <textarea
      v-model="description"
      placeholder="Opis"
      class="w-full border border-gray-300 rounded p-2 mb-3"
    />
    <input
      v-model="createdBy"
      placeholder="Vaše ime"
      class="w-full border border-gray-300 rounded p-2 mb-3"
      required
    />

    <button class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
      Pošalji
    </button>
  </form>
</template>

<script setup>
import { ref } from "vue";

const title = ref("");
const description = ref("");
const createdBy = ref("");

const emit = defineEmits(["submitted"]);

const submitTicket = async () => {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/api/tickets`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: title.value,
      description: description.value,
      createdBy: createdBy.value,
    }),
  });

  if (res.ok) {
    title.value = "";
    description.value = "";
    createdBy.value = "";
    emit("submitted");
  } else {
    const err = await res.json();
    alert(`Failed to submit ticket: ${err.error}`);
  }
};
</script>
