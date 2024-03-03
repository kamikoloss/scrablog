<script setup>
const appConfig = useAppConfig()

const route = useRoute()
const { id } = route.params

const { data: article } = await useAsyncData(`index-${id}`, () => {
  return queryContent().where({ id }).findOne()
})
const { data: surround } = await useAsyncData(`index-${id}-surround`, () => {
  return whereNotInTitle(queryContent()).sort({ created: -1 }).findSurround(`/${id}`)
})

useHead({
  title: `${appConfig.blogTitle} - ${article.value.title}`,
})
</script>

<template>
  <Article
    :article="article"
    :surround="surround"
    class="my-32"
  />
</template>
