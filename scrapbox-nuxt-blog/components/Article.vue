
<script setup>
import { parse } from '@progfay/scrapbox-parser'

const props = defineProps({ page: Object })

const appConfig = useAppConfig()

const lines = parse(props.page.lines.join('\n'))

const hasLineQuote = (index) => lines[index]?.nodes?.some(node => node.type === 'quote')
</script>

<template>
  <article class="px-8 py-16 bg-white">
    <!-- タイトル, 日付 -->
    <div class="border-b border-gray-300 mb-16">
      <h2 class="text-xl font-bold my-2">
        <NuxtLink :to="`/${page.title.replace(/ /g, '_')}`">{{ page.title }}</NuxtLink>
      </h2>
      <div class="flex justify-end gap-x-4 text-gray-500 my-2">
        <span class="flex gap-x-2">
          <span class="material-symbols-outlined">schedule</span>
          <Date
            v-if="appConfig.showCreated"
            :unix-time="page.created"
            :show-time="appConfig.showTime"
          />
        </span>
        <span class="flex gap-x-2">
          <span class="material-symbols-outlined">history</span>
          <Date
            v-if="appConfig.showUpdated"
            :unix-time="page.updated"
            :show-time="appConfig.showTime"
          />
        </span>
      </div>
    </div>
    <!-- 本文 -->
    <Line
      v-for="(line, index) in lines"
      :line="line"
      :hasPrevLineQuote="hasLineQuote(index - 1)"
      :hasNextLineQuote="hasLineQuote(index + 1)"
    />
  </article>
</template>
