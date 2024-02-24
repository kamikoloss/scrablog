<script setup>
const props = defineProps({ node: Object })

const { data: allArticles } = await useAsyncData('node-link-relative', () => {
  return whereNotInTitle(queryContent()).find()
})

const articleId = allArticles.value.find(article => article.title === props.node?.href)?.id
const isArticleLink = articleId !== undefined
const linkTo = isArticleLink ? `/${articleId}` : `/links/${props.node?.href}`
const linkText = props.node?.type === 'hashTag' ? props.node?.raw : props.node?.href
</script>

<template>
  <NuxtLink
    :to="linkTo"
    class="text-text-link"
  >
    {{ linkText }}
  </NuxtLink>
</template>
