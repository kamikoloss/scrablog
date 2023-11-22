<script setup>
const props = defineProps({ node: Object })
</script>

<template>
  <NuxtLink :to="`/${node.href}`" class="text-blue-500">{{ node.raw }}</NuxtLink>
</template>
