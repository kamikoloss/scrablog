<script setup>
const { indexPerPage } = useAppConfig()

const route = useRoute()
const { history } = route.params

const skip = Number(history) * indexPerPage
const limit = indexPerPage
const { data: pages } = await useAsyncData(`history-${history}`, () => {
  return queryContent().sort({ created: -1 }).skip(skip).limit(limit).find()
})
</script>

<template>
  <div>
    <Article v-for="page in pages" :page="page" class="my-32" />
    <Paginator :current-number="Number(history)" class="my-16 px-8" />
  </div>
</template>
