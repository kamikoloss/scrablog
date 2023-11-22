<script setup>
import { parse } from '@progfay/scrapbox-parser'

const props = defineProps({ page: Object })

const appConfig = useAppConfig()

const lines = parse(props.page.lines.join('\n'))

const hasLineQuote = (index) => lines[index]?.nodes?.some(node => node.type === 'quote')
</script>

<template>
  <ArticleLayout>
    <template #header>
      <!-- タイトル -->
      <h2 class="text-xl font-bold my-2">
        <NuxtLink :to="`/${page.title.replace(/ /g, '_')}`">{{ page.title }}</NuxtLink>
      </h2>
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
