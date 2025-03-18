<script setup>
const tabs = [
  {
    label: "Encrypt",
    icon: "i-lucide-lock",
    slot: "encrypt",
  },
  {
    label: "Decrypt",
    icon: "i-lucide-unlock",
    slot: "decrypt",
  },
];
</script>

<template>
  <NuxtTabs :items="tabs">
    <template #encrypt>
      <Encrypt />
    </template>
    <template #decrypt>
      <Decrypt />
    </template>
  </NuxtTabs>
</template>
