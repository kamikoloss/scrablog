<script setup>
const props = defineProps({ node: Object })

const href = props.node?.href
const isYouTube = href.includes('youtube.com') || href.includes('youtu.be')
</script>

<template>
  <span>
    <!-- 外部リンク -->
    <span v-if="node.pathType === 'absolute'">
      <!-- YouTube -->
      <YouTube v-if="isYouTube" :src="node.href" />
      <!-- テキスト -->
      <NuxtLink
        v-else
        :to="node.href"
        target="_blank"
        class="underline text-text-link"
      >
        {{ node.content === '' ? node.href : node.content }}
      </NuxtLink>
    </span>
    <!-- 外部 Scrapbox -->
    <NuxtLink
      v-if="node.pathType === 'root'"
      :to="`https://scrapbox.io${node.href}/`"
      target="_blank"
      class="underline text-text-link"
    >
      {{ node.href }}
    </NuxtLink>
    <!-- 内部リンク -->
    <NodeLinkRelative
      v-if="node.pathType === 'relative' || node.type === 'hashTag'"
      :node="node"
    />
  </span>
</template>
