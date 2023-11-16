<script setup>
const { data: pages } = await useAsyncData('content', () => {
  return queryContent().sort({ created: -1 }).skip(0).limit(5).find()
})
</script>

<template>
  <div>
    <Article v-for="page in pages" :page="page" class="my-32" />
    <Paginator :current-number="0" class="my-16 px-8" />
  </div>
</template>
