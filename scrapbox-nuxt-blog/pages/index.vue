<script setup>
const { indexPerPage, indexType } = useAppConfig()

const skip = 0
const limit = indexPerPage
const { data: pages } = await useAsyncData('index', () => {
  return queryContent().sort({ created: -1 }).skip(skip).limit(limit).find()
})
</script>

<template>
  <div>
    <div v-if="indexType === 1">
      <Article v-for="page in pages" :page="page" class="my-32" />
    </div>
    <div v-if="indexType === 2" class="my-32">
      <Card v-for="page in pages" :page="page" class="my-8" />
    </div>
    <Paginator :current-number="0" class="my-32 px-8" />
  </div>
</template>
