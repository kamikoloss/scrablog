<script setup>
const { indexPerPage } = useAppConfig()

const skip = 0
const limit = indexPerPage
const { data: pages } = await useAsyncData('index', () => {
  return queryContent().sort({ created: -1 }).skip(skip).limit(limit).find()
})
</script>

<template>
  <div>
    <Article v-for="page in pages" :page="page" class="my-32" />
    <Paginator :current-number="0" class="my-32 px-8" />
  </div>
</template>
