<script setup>
const props = defineProps({ node: Object })

const imageClass = (node) => {
  return {
    'max-h-80': node.type === 'image',
    'border': true,
    'border-gray-300': true,
  }
}
</script>

<template>
  <NuxtLink :to="node.src" target="_blank">
    <img :src="node.src" :class="imageClass(node)" />
  </NuxtLink>
</template>
