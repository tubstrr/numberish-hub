<template>
  <NuxtContainer>
    <div class="bg-[var(--ui-bg)]">
      <h1 class="text-[var(--ui-text)]">text</h1>
      <h1 class="text-[var(--ui-text-dimmed)]">dimmed</h1>
      <h1 class="text-[var(--ui-text-muted)]">muted</h1>
      <h1 class="text-[var(--ui-text-toned)]">toned</h1>
      <h1 class="text-[var(--ui-text-highlighted)]">highlighted</h1>
    </div>
    <div class="bg-[var(--ui-bg-muted)]">
      <h1>muted</h1>
    </div>
    <div class="bg-[var(--ui-bg-elevated)]">
      <h1>elevated</h1>
    </div>
    <div class="bg-[var(--ui-bg-accented)]">
      <h1>accented</h1>
    </div>
    <div class="bg-[var(--ui-bg-inverted)]">
      <h1 class="text-[var(--ui-text-dimmed)]">inverted</h1>
    </div>
    <div
      class="mt-4 bg-[var(--ui-bg-accented)] border-[var(--ui-border)] border-2 rounded-[var(--ui-radius)]"
    >
      <h1 class="text-[var(--ui-text-dimmed)]">border</h1>
    </div>
    <div
      class="mt-4 bg-[var(--ui-bg-accented)] border-[var(--ui-border-muted)] border-2 rounded-[var(--ui-radius)]"
    >
      <h1 class="text-[var(--ui-text-dimmed)]">muted</h1>
    </div>
    <div
      class="mt-4 bg-[var(--ui-bg-accented)] border-[var(--ui-border-accented)] border-2 rounded-[var(--ui-radius)]"
    >
      <h1 class="text-[var(--ui-text-dimmed)]">accented</h1>
    </div>
    <div
      class="mt-4 bg-[var(--ui-bg-accented)] border-[var(--ui-border-inverted)] border-2 rounded-[var(--ui-radius)]"
    >
      <h1 class="text-[var(--ui-text-dimmed)]">inverted</h1>
    </div>
  </NuxtContainer>
</template>
