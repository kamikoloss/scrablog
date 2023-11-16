<script setup>
const route = useRoute()
const { history: currentNumber } = route.params

const { data } = await useAsyncData('project', () => queryContent('project').findOne())
const pages = data.value?.pages
</script>

<template>
  <div>
    <Article v-for="page in pages" :page="page" class="my-32" />
    <Paginator :current-number="currentNumber" class="my-16 px-8" />
  </div>
</template>
