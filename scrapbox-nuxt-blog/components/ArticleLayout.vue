<script setup>
const appConfig = useAppConfig()
const { color } = appConfig
</script>

<template>
  <article :class="`bg-${color.contentBackground} px-8 py-16`">
    <div class="border-b border-gray-300 mb-16">
      <slot name="header" />
    </div>
    <div>
      <slot name="main" />
    </div>
  </article>
</template>
