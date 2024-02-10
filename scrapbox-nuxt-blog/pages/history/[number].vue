<script setup>
import { indexTypes } from '~/scrablog.const';

const appConfig = useAppConfig()

const route = useRoute()
const { number } = route.params
const currentNumber = Number(number)

useHead({
  title: appConfig.blogTitle,
})

const skip = currentNumber * appConfig.articlesPerPage
const limit = appConfig.articlesPerPage
const { data: pages } = await useAsyncData(`history-${currentNumber}`, () => {
  return whereNotIn(queryContent(), 'title', appConfig.excludeTitles)
    .sort({ created: -1 })
    .skip(skip)
    .limit(limit)
    .find()
})
</script>

<template>
  <div>
    <div v-if="appConfig.indexType === indexTypes.BLOG_FULL">
      <Article v-for="page in pages" :page="page" class="my-32" />
    </div>
    <div v-if="appConfig.indexType === indexTypes.BLOG_CARD" class="my-32">
      <Card v-for="page in pages" :page="page" class="my-8" />
    </div>
    <Paginator :current-number="currentNumber" class="my-32 px-8" />
  </div>
</template>
