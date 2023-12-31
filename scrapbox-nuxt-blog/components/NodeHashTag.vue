<script setup>
const props = defineProps({ node: Object })
</script>

<template>
  <NuxtLink :to="`/${node.href}`" class="text-text-link">
    {{ node.raw }}
  </NuxtLink>
</template>
