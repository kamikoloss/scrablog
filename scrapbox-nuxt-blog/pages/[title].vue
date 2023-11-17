<script setup>
const route = useRoute()
const { title } = route.params

const { data: page } = await useAsyncData(`index-${title}`, () => {
  return queryContent().where({ title: title.replace(/_/g, ' ') }).findOne()
})
</script>

<template>
  <Article :page="page" class="my-32" />
</template>
