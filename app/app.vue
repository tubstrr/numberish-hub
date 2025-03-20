<script setup lang="ts">
useSeoMeta({
  title: "Numberish - Encrypt, Decrypt, and Have Fun!",
  description:
    "Encrypt and decrypt messages with Numberish. Share your encrypted messages with friends and family.",
});
</script>

<template>
  <main>
    <NuxtApp>
      <NuxtContainer class="min-h-screen flex items-center justify-center">
        <NuxtCard>
          <template #header>
            <CardHeader />
          </template>
          <template #default>
            <CardBody />
          </template>
        </NuxtCard>
      </NuxtContainer>
    </NuxtApp>
  </main>
</template>
