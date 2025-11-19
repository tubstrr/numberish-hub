<template>
  <div class="max-w-lg mx-auto relative">
    <h1 class="text-2xl font-bold mr-10 mb-1">Numberish</h1>
    <NuxtPopover mode="hover">
      <span class="text-sm font-bold absolute max-w-10 right-0 top-0"
      >About</span>
      <template #content>
        <div class="p-4">
          <p>
            Numberlish was created by Ryland Knoll, and the webapp by <a
              href="https://jonknoll.dev"
              target="_blank"
              class="text-blue-400 hover:underline"
            >Jon Knoll</a> & <a
              href="https://github.com/matthewrknoll"
              target="_blank"
              class="text-blue-400 hover:underline"
            >Matt Knoll</a>
          </p>
        </div>
      </template>
    </NuxtPopover>
    <p>
      Numberish is a cipher that uses numbers to represent letters. It is a
      simple cipher that can be used to encode and decode messages.
    </p>
  </div>
</template>
