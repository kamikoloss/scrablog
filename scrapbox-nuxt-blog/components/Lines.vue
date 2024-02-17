<script setup>
import { parse } from '@progfay/scrapbox-parser'

const props = defineProps({ lines: Object })
const lines = parse(props.lines.join('\n'))

const hasLineQuote = (index) => lines[index]?.nodes?.some(node => node.type === 'quote')
</script>

<template>
  <Line
    v-for="(line, index) in lines"
    :line="line"
    :hasPrevLineQuote="hasLineQuote(index - 1)"
    :hasNextLineQuote="hasLineQuote(index + 1)"
  />
</template>
