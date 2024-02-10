<script setup>
const appConfig = useAppConfig()

useHead({
  title: `${appConfig.blogTitle} - HISTORY`,
})

const { data: pages } = await useAsyncData('history', () => {
  return whereNotIn(queryContent(), 'title', appConfig.excludeTitles)
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
        <li v-for="page of pages" class="my-2">
          <span class="mr-2">{{ getDateString(page.created, false) }}</span>
          <NuxtLink
            :to="`/${escapeArticleTitle(page.title)}`"
            class="text-text-link"
          >
            {{ page.title }}
          </NuxtLink>
        </li>
      </ul>
    </template>
  </ArticleLayout>
</template>
