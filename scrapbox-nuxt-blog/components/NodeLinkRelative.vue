<script setup>
const props = defineProps({ node: Object })

const { data: articles } = await useAsyncData('node-link-relative', () => {
  return queryContent().find()
})

const articleId = articles.value.find(article => article.title === props.node?.href)?.id
const isArticleLink = articleId !== undefined
const linkTo = isArticleLink
  ?`/${articleId}`
  : `/links/${escapeArticleTitle(props.node?.href)}`
const linkText = props.node?.type === 'hashTag'
  ? props.node?.raw
  : props.node?.href
</script>

<template>
  <NuxtLink
    :to="linkTo"
    class="text-text-link"
  >
    {{ linkText }}
  </NuxtLink>
</template>
