<script setup lang="ts">
useSeoMeta({
  title: "NuxtHub Starter",
  description:
    "A Nuxt template to build your full-stack application on the edge.",
});
</script>

<template>
  <main>
    <NuxtApp>
      <NuxtContainer class="min-h-screen flex items-center justify-center">
        <NuxtCard>
          <template #header>
            <h1 class="text-2xl font-bold">Welcome to NuxtHub Starter</h1>
          </template>
          <template #default>
            <p>
              A Nuxt template to build your full-stack application on the edge.
            </p>
          </template>
          <template #footer>
            <NuxtLink to="/about" class="text-blue-500">
              Learn more
            </NuxtLink>
          </template>
        </NuxtCard>
      </NuxtContainer>
    </NuxtApp>
  </main>
</template>
