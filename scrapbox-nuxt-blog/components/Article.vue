<script setup>
import { parse } from '@progfay/scrapbox-parser'

const props = defineProps({ page: Object })

const appConfig = useAppConfig()

const lines = parse(props.page.lines.join('\n'))

const hasLineQuote = (index) => lines[index]?.nodes?.some(node => node.type === 'quote')

const getTagNodes = (lines) => {
  const tagNodes = []
  lines.forEach(line => {
    line.nodes?.forEach(node => {
      if (node.type === 'hashTag') {
        tagNodes.push(node)
      }
    })
  })
  return tagNodes
}
const tagNodes = getTagNodes(lines)
</script>

<template>
  <ArticleLayout>
    <template #header>
      <h2 class="text-xl font-bold my-2">
        <NuxtLink :to="`/${page.title.replace(/ /g, '_')}`">{{ page.title }}</NuxtLink>
      </h2>
      <!-- タグ -->
      <div
        v-if="tagNodes.length > 0"
        class="flex gap-x-4 my-2"
      >
        <NuxtLink
          v-for="node of tagNodes"
          :to="`/tags/${node.href}`"
          class="bg-gray-100 border border-gray-300 px-2 py-1"
        >
          {{ node.raw }}
        </NuxtLink>
      </div>
      <!-- 日時 -->
      <div
        v-if="appConfig.showCreated || appConfig.showUpdated"
        class="flex justify-end gap-x-4 text-gray-500 my-2"
      >
        <span v-if="appConfig.showCreated" class="flex gap-x-2">
          <span class="material-symbols-outlined">schedule</span>
          <Date :unix-time="page.created" :show-time="appConfig.showTime" />
        </span>
        <span v-if="appConfig.showUpdated" class="flex gap-x-2">
          <span class="material-symbols-outlined">update</span>
          <Date :unix-time="page.updated" :show-time="appConfig.showTime" />
        </span>
      </div>
    </template>
    <template #main>
      <Line
        v-for="(line, index) in lines"
        :line="line"
        :hasPrevLineQuote="hasLineQuote(index - 1)"
        :hasNextLineQuote="hasLineQuote(index + 1)"
      />
    </template>
  </ArticleLayout>
</template>
