<script setup>
const props = defineProps({ node: Object })

const appConfig = useAppConfig()
const { color } = appConfig
</script>

<template>
  <NuxtLink
    :to="`/${node.href}`"
    :class="`text-${color.linkText}`"
  >
    {{ node.raw }}
  </NuxtLink>
</template>
