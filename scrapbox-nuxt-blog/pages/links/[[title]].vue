<script setup>
const route = useRoute()
const { title } = route.params

const { data: articles } = await useAsyncData('links', () => {
  return whereNotInTitle(queryContent()).find()
})

const relatedArticles = []
articles.value.forEach(article => {
  article.links.forEach(linkTitle => {
    if (linkTitle === title && !relatedArticles.some(a => a.title === title)) {
      relatedArticles.push(article)
    }
  })
})
</script>

<template>
  <div class="my-32">
    <div class="text-text-light">
      <h2 class="text-xl font-bold my-2">"{{ title }}" に関連する記事</h2>
      <p class="my-2">{{ relatedArticles.length }}件見つかりました。</p>
    </div>
    <Card v-for="article in relatedArticles" :article="article" class="my-8" />
  </div>
</template>
