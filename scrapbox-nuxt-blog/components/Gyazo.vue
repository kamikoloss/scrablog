<script setup>
const props = defineProps({ line: String })
const urlList = props.line.split(']')
const getSrc = (url) => `${url}/max_size/1000`.replaceAll('[', '')
const getClass = (url) => ({'max-h-80': !url.startsWith('[[')})
</script>

<template>
  <div class="flex">
    <div v-for="url in urlList">
      <img v-if="url !== ''" :src="getSrc(url)" :class="getClass(url)" />
    </div>
  </div>
</template>
