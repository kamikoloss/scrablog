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
const { data: articles } = await useAsyncData(`history-${currentNumber}`, () => {
  return whereNotInTitle(queryContent())
    .sort({ created: -1 })
    .skip(skip)
    .limit(limit)
    .find()
})
</script>

<template>
  <div>
    <div v-if="appConfig.indexType === indexTypes.BLOG_FULL">
      <Article v-for="article in articles" :article="article" class="my-32" />
    </div>
    <div v-if="appConfig.indexType === indexTypes.BLOG_CARD" class="my-32">
      <Card v-for="article in articles" :article="article" class="my-8" />
    </div>
    <Paginator :current-number="currentNumber" class="my-32" />
  </div>
</template>
