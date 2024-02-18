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
const { data: surroundArticles } = await useAsyncData(`index-${routeTitle}-surround`, () => {
  return whereNotInTitle(queryContent())
    .sort({ created: -1 })
    .findSurround(`/${article.value.id}`)
})
</script>

<template>
  <div>
    <Article
      v-if="article"
      :article="article"
      :surround="surroundArticles"
      class="my-32"
    />
    <ArticleNotFound v-else class="my-32" />
  </div>
</template>
