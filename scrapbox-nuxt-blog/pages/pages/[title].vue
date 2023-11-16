<script setup>
const route = useRoute()
const { title } = route.params

const { data } = await useAsyncData('content', () => {
  return queryContent().where({ title }).findOne()
})
const page = data.value
</script>

<template>
  <Article :page="page" class="my-32" />
</template>
