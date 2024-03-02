<script setup>
const route = useRoute()
const { month: routeMonth } = route.params

const { data: articles } = await useAsyncData('months', () => {
  return whereNotInTitle(queryContent()).sort({ created: -1 }).find()
})
const articlesYearMonth = getArticlesGroupByYearMonth(articles.value)
const articlesMonth = articlesYearMonth.month[routeMonth]
</script>

<template>
  <div class="my-32">
    <div class="text-text-light px-8">
      <h2 class="text-xl font-bold my-2">"{{ routeMonth }}" に書かれた記事</h2>
      <p class="my-2">{{ articlesMonth.length }} 件見つかりました。</p>
    </div>
    <Card v-for="article in articlesMonth" :article="article" class="my-8" />
  </div>
</template>
