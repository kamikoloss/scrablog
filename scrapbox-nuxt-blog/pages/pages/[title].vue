<script setup>
const route = useRoute()
const { title } = route.params

const { data: page } = await useAsyncData('pages/title', () => {
  return queryContent().where({ title }).findOne()
})
</script>

<template>
  <Article :page="page" class="my-32" />
</template>
