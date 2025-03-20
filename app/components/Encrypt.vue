<script setup>
// Composables
import { md5 } from "~/composable/md5";
import { encrypt } from "~/composable/encryption";
const toast = useToast();

// Constants
const duration = 3000;
const methods = ["RJ", "ASCII"];
const toastObject = {
  title: "Encrypted value copied 📋",
  description: "The encrypted value has been copied to your clipboard.",
  duration,
};
const toastShare = {
  title: "Shareable link copied 📋",
  description: "The shareable link has been copied to your clipboard.",
  duration,
};

// State
const method = ref("RJ");
const message = ref("");
const encrypted = ref("");
const copied = ref(false);
const debounce = ref(null);
const shareLink = ref("");

// Methods
const copy = () => {
  navigator.clipboard.writeText(encrypted.value);
  copied.value = true;
  toast.add(toastObject);

  setTimeout(() => {
    copied.value = false;
  }, duration);
};

const share = () => {
  navigator.clipboard.writeText(shareLink.value);
  toast.add(toastShare);
};

const handleUpdate = () => {
  const value = message.value;

  if (!value) {
    encrypted.value = "";
    shareLink.value = "";
    return;
  }

  encrypted.value = encrypt(method.value, value);

  if (debounce.value) {
    clearTimeout(debounce.value);
    debounce.value = setTimeout(() => {
      debounce.value = null;
      handleHashPush();
    }, 500);
  } else {
    debounce.value = setTimeout(() => {
      debounce.value = null;
      handleHashPush();
    }, 500);
  }
};

const handleHashPush = async () => {
  const hashValues = {
    method: method.value,
    message: message.value,
    encrypted: encrypted.value,
  };
  const hash = md5(JSON.stringify(hashValues));

  shareLink.value = `${window.location.origin}/?hash=${hash}&tab=decrypt`;

  const response = await $fetch("/api/lookup", {
    method: "POST",
    body: {
      hash,
      ...hashValues,
    },
  });
  console.log("🍤 ~ handleHashPush ~ response:", response);

  console.log("🍤 ~ handleHashPush ~ hash:", hash);
};

// Lifecycle
watch(message, handleUpdate);
watch(method, handleUpdate);
</script>

<template>
  <div class="w-full min-h-40">
    <h2 class="text-xl mb-4 mt-2">Encrypt Message</h2>
    <div class="flex gap-4 flex-col">
      <NuxtFormField label="Message">
        <NuxtTextarea
          v-model="message"
          placeholder="Enter the encrypted message"
          class="w-full"
          autoresize
        />
      </NuxtFormField>
      <NuxtFormField label="Encryption Method">
        <NuxtRadioGroup v-model="method" :items="methods" />
      </NuxtFormField>
      <NuxtFormField label="Encrypted Value">
        <NuxtTextarea
          v-model="encrypted"
          class="w-full text-ellipsis"
          disabled
          autoresize
          placeholder="No message to encrypt"
          variant="soft"
        />
      </NuxtFormField>
      <div class="flex gap-4">
        <!-- Copy Button -->
        <NuxtButton
          :disabled="!encrypted"
          :icon='copied ? "i-lucide-copy-check" : "i-lucide-copy"'
          variant="ghost"
          @click="copy"
        >
          Copy Value
        </NuxtButton>
        <!-- Share Button -->
        <NuxtButton
          :disabled="!shareLink"
          icon="i-lucide-share"
          variant="ghost"
          @click="share"
        >
          Shareable Link
        </NuxtButton>
      </div>
    </div>
  </div>
</template>
