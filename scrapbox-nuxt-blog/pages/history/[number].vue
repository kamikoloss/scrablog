<script setup>
const { indexPerPage } = useAppConfig()

const route = useRoute()
const { number } = route.params
const currentNumber = Number(number)

const skip = currentNumber * indexPerPage
const limit = indexPerPage
const { data: pages } = await useAsyncData(`history-${currentNumber}`, () => {
  return queryContent().sort({ created: -1 }).skip(skip).limit(limit).find()
})
</script>

<template>
  <div>
    <Article v-for="page in pages" :page="page" class="my-32" />
    <Paginator :current-number="currentNumber" class="my-16 px-8" />
  </div>
</template>
