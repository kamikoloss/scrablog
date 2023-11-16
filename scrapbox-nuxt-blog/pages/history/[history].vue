<script setup>
const route = useRoute()
const { history } = route.params

const { data } = await useAsyncData('content', () => {
  return queryContent().sort({ created: -1 }).skip(0).limit(5).find()
})
const pages = data.value
</script>

<template>
  <div>
    <Article v-for="page in pages" :page="page" class="my-32" />
    <Paginator :current-number="history" class="my-16 px-8" />
  </div>
</template>
