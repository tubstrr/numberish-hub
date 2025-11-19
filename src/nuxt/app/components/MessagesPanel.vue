<script setup>
const { data: messages, refresh } = await useFetch("/api/lookup");
const newMessage = ref("");

async function sendMessage() {
  if (!newMessage.value.trim()) return;
  await $fetch("/api/lookup", {
    method: "POST",
    body: {
      hash: newMessage.value,
    },
  });
  newMessage.value = "";
  await refresh();
}
</script>

<template>
  <div>
    <h3>Messages</h3>
    <form @submit.prevent="sendMessage">
      <input v-model="newMessage" placeholder="Type a message" />
      <button type="submit">
        Send
      </button>
    </form>
    <p v-for="message of messages" :key="message.id">
      {{ message.hash }} - {{
        new Date(message.created_at).toLocaleString("fr-FR")
      }}
    </p>
    <p v-if="!messages?.length">
      No messages yet
    </p>
  </div>
</template>
