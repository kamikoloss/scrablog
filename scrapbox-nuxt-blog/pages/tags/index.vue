<script setup>
const { data: pages } = await useAsyncData('history', () => {
  return queryContent().sort({ created: -1 }).find()
})

const getTags = (pages) => {
  const tags = []
  pages.forEach(page => {
    page.tags.forEach(tag => {
      if (!tags.includes(tag)) {
        tags.push(tag)
      }
    })
  })
  return tags.sort()
}
const tags = getTags(pages.value)
console.log(tags)
</script>

<template>
  <ArticleLayout class="my-32">
    <template #header>
      <h2 class="text-xl font-bold my-2">TAGS</h2>
    </template>
    <template #main>
      <ul>
        <li v-for="tag of tags" class="my-2">
          <NuxtLink :to="`/tags/${tag}`" class="text-blue-500">{{ tag }}</NuxtLink>
        </li>
      </ul>
    </template>
  </ArticleLayout>
</template>
