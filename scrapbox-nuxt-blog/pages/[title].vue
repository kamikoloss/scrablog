<script setup>
const appConfig = useAppConfig()

const route = useRoute()
const { title: routeTitle } = route.params
const articleTitle = unescapeArticleTitle(routeTitle)

useHead({
  title: `${appConfig.blogTitle} - ${articleTitle}`,
})

const { data: article } = await useAsyncData(`index-${routeTitle}`, () => {
  return whereNotInTitle(queryContent())
    .where({ title: articleTitle })
    .findOne()
})
</script>

<template>
  <div>
    <Article v-if="article" :article="article" class="my-32" />
    <ArticleNotFound v-else class="my-32" />
  </div>
</template>
