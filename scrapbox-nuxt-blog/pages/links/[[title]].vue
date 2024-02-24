<script setup>
const route = useRoute()
const { title: routeTitle } = route.params
const unescapedTitle = unescapeArticleTitle(routeTitle)

const { data: articles } = await useAsyncData('links', () => {
  return whereNotInTitle(queryContent()).find()
})

// title のリンクを持つ記事一覧を取得する
const relatedArticles = []
articles.value.forEach(article => {
  article.links.forEach(linkTitle => {
    const isFirst = !relatedArticles.some(a => a.title === unescapedTitle)
    if (linkTitle === unescapedTitle && isFirst) {
      relatedArticles.push(article)
    }
  })
})
</script>

<template>
  <div class="my-32">
    <div class="text-text-light px-8">
      <h2 class="text-xl font-bold my-2">"{{ unescapedTitle }}" に関連する記事</h2>
      <p class="my-2">{{ relatedArticles.length }} 件見つかりました。</p>
    </div>
    <Card v-for="article in relatedArticles" :article="article" class="my-8" />
  </div>
</template>
