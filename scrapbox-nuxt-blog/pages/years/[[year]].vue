<script setup>
const route = useRoute()
const { year } = route.params

const { data: articles } = await useAsyncData('years', () => {
  return whereNotInTitle(queryContent()).sort({ created: -1 }).find()
})
const articlesYearMonth = getArticlesGroupByYearMonth(articles.value)
const articlesYear = articlesYearMonth.year[year]
</script>

<template>
  <div class="my-32">
    <div class="text-text-light px-8">
      <h2 class="text-xl font-bold my-2">"{{ year }}" に書かれた記事</h2>
      <p class="my-2">{{ articlesYear.length }} 件見つかりました。</p>
    </div>
    <Card v-for="article in articlesYear" :article="article" class="my-8" />
  </div>
</template>
