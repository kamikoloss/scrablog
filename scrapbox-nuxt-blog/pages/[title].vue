<script setup>
const { data } = await useAsyncData('project', () => queryContent('project').findOne())
const page = data.value?.pages.find(page => page.title === title)

const route = useRoute()
const { title } = route.params
</script>

<template>
  <Article :page="page" class="my-32" />
</template>
