<script setup>
const { data } = await useAsyncData('project', () => queryContent('project').findOne())
const pages = data.value?.pages
</script>

<template>
  <Article v-for="page in pages" :page="page" class="my-32" />
</template>
