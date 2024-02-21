<script setup>
const appConfig = useAppConfig()

useHead({
  title: `${appConfig.blogTitle} - HISTORY`,
})

const { data: articles } = await useAsyncData('history', () => {
  return whereNotInTitle(queryContent())
    .sort({ created: -1 })
    .find()
})
</script>

<template>
  <ArticleLayout class="my-32">
    <template #header>
      <h2 class="text-xl font-bold my-2">HISTORY</h2>
    </template>
    <template #main>
      <ul>
        <li v-for="article of articles" class="my-2">
          <Dot />
          <span>{{ getDateString(article.created, false) }}</span>
          <span>&nbsp;</span>
          <NuxtLink
            :to="`/${article.id}`"
            class="text-text-link"
          >
            {{ article.title }}
          </NuxtLink>
        </li>
      </ul>
    </template>
  </ArticleLayout>
</template>
