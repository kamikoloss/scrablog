<script setup>
const props = defineProps({ node: Object })

const { data: allArticles } = await useAsyncData('node-link', () => {
  return whereNotInTitle(queryContent()).find()
})

let articleId = undefined
if (props.node?.pathType === 'relative') {
  articleId = allArticles.value.find(article => article.title === props.node?.href)?.id
}

const linkClass = (node) => {
  const isDeadLink = node.pathType === 'relative' && articleId === undefined
  return {
    'underline': node.pathType === 'absolute' || node.pathType === 'root',
    'text-text-link': !isDeadLink,
    'text-text-dead-link': isDeadLink,
  }
}
</script>

<template>
  <span>
    <!-- 外部リンク -->
    <span v-if="node.pathType === 'absolute'">
      <!-- YouTube -->
      <span v-if="node.href.includes('youtube.com') || node.href.includes('youtu.be')">
        <YouTube :src="node.href" />
      </span>
      <!-- テキスト -->
      <span v-else>
        <NuxtLink
          :to="node.href"
          target="_blank"
          :class="linkClass(node)"
        >
          {{ node.content === '' ? node.href : node.content }}
        </NuxtLink>
      </span>
    </span>
    <!-- 外部 Scrapbox -->
    <span v-if="node.pathType === 'root'">
      <NuxtLink
        :to="`https://scrapbox.io${node.href}/`"
        target="_blank"
        :class="linkClass(node)"
      >
        {{ node.href }}
      </NuxtLink>
    </span>
    <!-- 内部リンク -->
    <span v-if="node.pathType === 'relative'">
      <NuxtLink
        :to="`/${articleId ?? ''}`"
        :class="linkClass(node)"
      >
        {{ node.href }}
      </NuxtLink>
    </span>
  </span>
</template>
