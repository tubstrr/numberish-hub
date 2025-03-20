<script setup>
// Composables
import { decrypt } from "~/composable/encryption";
const route = useRoute();

// Constants
const methods = ["RJ", "ASCII"];
const { query } = route;
const { hash } = query;

// State
const method = ref("RJ");
const message = ref("");
const decrypted = ref("");

// Methods
if (hash) {
  const { data, status, error, refresh, clear } = await useFetch(
    "/api/lookup",
    {
      method: "GET",
      query: { hash },
    },
  );
  if (error.value && import.meta.server) {
    console.error("Error fetching data");
    console.error(error.value);
  } else {
    const { message: dbMessage, method: dbMethod, encrypted } = data.value;
    message.value = encrypted;
    method.value = dbMethod;
    decrypted.value = dbMessage;
  }
}
const handleUpdate = () => {
  const value = message.value;

  if (!value) {
    decrypted.value = "";
    return;
  }

  decrypted.value = decrypt(method.value, value);
};

// Lifecycle
watch(message, handleUpdate);
watch(method, handleUpdate);
</script>

<template>
  <div class="w-full min-h-40">
    <h2 class="text-xl mb-4 mt-2">Decrypt Message</h2>
    <div class="flex gap-4 flex-col">
      <NuxtFormField label="Encrypted Value">
        <NuxtTextarea
          v-model="message"
          placeholder="Enter your message"
          class="w-full"
          autoresize
        />
      </NuxtFormField>
      <NuxtFormField label="Encryption Method">
        <NuxtRadioGroup v-model="method" :items="methods" />
      </NuxtFormField>
      <NuxtFormField label="Decrypted Value">
        <NuxtTextarea
          v-model="decrypted"
          class="w-full text-ellipsis"
          disabled
          autoresize
          placeholder="No message to encrypt"
          variant="soft"
        />
      </NuxtFormField>
    </div>
  </div>
</template>
