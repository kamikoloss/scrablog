
<script setup>
import { parse } from '@progfay/scrapbox-parser'

const props = defineProps({ page: Object })
const lines = parse(props.page.lines.join('\n'))
console.log(lines)
</script>

<template>
  <article>
    <!-- タイトル, 日付 -->
    <div class="border-b border-gray-300 py-4">
      <h2 class="text-xl font-bold">{{ page.title }}</h2>
      <div class="text-right text-gray-500 ml-auto">
        <Date :unix-time="page.created" />
      </div>
    </div>
    <!-- 本文 -->
    <div class="my-16">
      <Line v-for="line in lines" :line="line"/>
    </div>
  </article>
</template>
