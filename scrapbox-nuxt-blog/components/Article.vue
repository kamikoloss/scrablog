
<script setup>
import { parse } from '@progfay/scrapbox-parser'

const props = defineProps({ page: Object })
const lines = parse(props.page.lines.join('\n'))

const hasLineQuote = (index) => lines[index]?.nodes?.filter(node => node.type === 'quote').length > 0
</script>

<template>
  <article class="px-8 py-16 bg-white">
    <!-- タイトル, 日付 -->
    <div class="border-b border-gray-300 mb-16 pb-4">
      <h2 class="text-xl font-bold">
        <NuxtLink :to="`/pages/${page.title}`">{{ page.title }}</NuxtLink>
      </h2>
      <div class="text-right text-gray-500 ml-auto">
        <Date :unix-time="page.created" />
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
