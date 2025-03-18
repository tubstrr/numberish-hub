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
            <CardHeader />
          </template>
          <template #default>
            <CardBody />
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
