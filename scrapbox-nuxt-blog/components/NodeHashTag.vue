<script setup>
const props = defineProps({ node: Object })
</script>

<template>
  <NuxtLink :to="`/${node.href}`" class="text-link-text">
    {{ node.raw }}
  </NuxtLink>
</template>
