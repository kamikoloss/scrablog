<script setup>
const route = useRoute()
const { title } = route.params

const { data } = await useAsyncData('project', () => queryContent('project').findOne())
const page = data.value?.pages.find(page => page.title === title)
</script>

<template>
  <Article :page="page" class="my-16" />
</template>
