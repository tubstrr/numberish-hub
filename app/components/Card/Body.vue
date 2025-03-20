<script setup>
const route = useRoute();

let startTab = "0";
if (route.query.tab) {
  const tab = route.query.tab;
  if (tab === "encrypt") {
    startTab = "0";
  } else {
    startTab = "1";
  }
}

const tab = ref(startTab);

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
  <NuxtTabs :items="tabs" v-model="tab">
    <template #encrypt>
      <Encrypt />
    </template>
    <template #decrypt>
      <Decrypt />
    </template>
  </NuxtTabs>
</template>
