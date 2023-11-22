<script setup>
const route = useRoute()
const { title } = route.params

const { data: page } = await useAsyncData(`index-${title}`, () => {
  return queryContent().where({ title: title.replace(/_/g, ' ') }).findOne()
})
</script>

<template>
  <div>
    <Article v-if="page" :page="page" class="my-32" />
    <ArticleNotFound v-else class="my-32" />
  </div>
</template>
