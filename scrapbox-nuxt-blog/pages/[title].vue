<script setup>
const appConfig = useAppConfig()

const route = useRoute()
const { title: routeTitle } = route.params
const articleTitle = unescapeArticleTitle(routeTitle)

useHead({
  title: `${appConfig.blogTitle} - ${articleTitle}`,
})

const { data: page } = await useAsyncData(`index-${routeTitle}`, () => {
  return whereNotIn(queryContent(), 'title', appConfig.excludeTitles).findOne()
})
</script>

<template>
  <div>
    <Article v-if="page" :page="page" class="my-32" />
    <ArticleNotFound v-else class="my-32" />
  </div>
</template>
