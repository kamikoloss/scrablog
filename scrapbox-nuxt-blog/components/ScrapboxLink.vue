<script setup>
const props = defineProps({ line: String })

const parseLink = (line) => {
  const pattern = /[\s\[]https:\S*/
  const url = line.match(pattern).filter(r => r !== '')[0].replace(/\[|\]|\s/g, '')
  const title = line.replace(url, '').replace(/\[|\]|\[\s+|\s+\]/g, '')
  return {title, url}
}
const link = parseLink(props.line)
</script>

<template>
  <NuxtLink :to="link.url" target="_blank" class="underline">{{ link.title }}</NuxtLink>
</template>
