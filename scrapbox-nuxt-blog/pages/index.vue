<script setup>
import { indexTypes, defaultArticlesPerPage } from '~/scrablog.const';

const appConfig = useAppConfig()

useHead({
  title: appConfig.blogTitle,
})

const limit = appConfig.articlesPerPage ?? defaultArticlesPerPage
const skip = 0
const { data: articles } = await useAsyncData('index', () => {
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
    <Paginator :current-number="0" class="my-32" />
  </div>
</template>
