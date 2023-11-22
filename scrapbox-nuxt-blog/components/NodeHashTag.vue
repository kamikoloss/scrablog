<script setup>
const props = defineProps({ node: Object })
</script>

<template>
  <NuxtLink
    :to="`/${node.href}`"
    class="bg-gray-100 border border-gray-300 px-2 py-1"
  >
    {{ node.raw }}
  </NuxtLink>
</template>
