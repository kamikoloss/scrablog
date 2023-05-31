<script setup>
const props = defineProps({ node: Object })

const linkClass = (node) => {
  return {
    'underline': node.PathType === 'absolute' || node.PathType === 'root',
    'text-blue-500': true,
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
      <!-- テキストリンク -->
      <span v-else>
        <NuxtLink :to="node.href" :class="linkClass(node)" target="_blank">
          {{ node.content === '' ? node.href : node.content }}
        </NuxtLink>
      </span>
    </span>
    <!-- 外部 Scrapbox -->
    <span v-if="node.pathType === 'root'">
      <NuxtLink :to="`https://scrapbox.io${node.href}/`" target="_blank" :class="linkClass(node)">
        {{ node.href }}
      </NuxtLink>
    </span>
    <!-- 内部リンク -->
    <span v-if="node.pathType === 'relative'">
      <NuxtLink :to="node.href" :class="linkClass(node)">{{ node.href }}</NuxtLink>
    </span>
  </span>
</template>
