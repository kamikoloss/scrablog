
<script setup>
import { parse } from '@progfay/scrapbox-parser'

const props = defineProps({ page: Object })
const lines = parse(props.page.lines.join('\n'))
console.log(lines)

const lineClass = (line) => {
  const hasImage = line.nodes.filter(node => node.type === 'image').length > 0
  const isSingleNode = line.nodes.length === 1
  const isQuote = line.nodes.filter(node => node.type === 'quote').length > 0
  return {
    'flex': hasImage,
    'text-justify': isSingleNode,
    'leading-4': isQuote,
    'bg-gray-100': isQuote,
    'px-4': isQuote,
    'py-2': isQuote,
    'my-2': !isQuote,
  }
}
const indentClass = (line) => {
  const indent = line.indent
  return {
    'ml-4': indent === 2,
    'ml-8': indent === 3,
    'ml-12': indent === 4,
    'ml-16': indent === 5,
    'ml-20': indent === 6,
    'ml-24': indent === 7,
    'ml-28': indent === 8,
  }
}
</script>

<template>
  <article>
    <div class="border border-gray-300 px-4">
      <!-- タイトル, 日付 -->
      <div class="border-b border-gray-300 pb-8 my-8">
        <h2 class="text-xl font-bold">{{ page.title }}</h2>
        <div class="text-right text-gray-500 ml-auto">
          <Date :unix-time="page.created" />
        </div>
      </div>
      <!-- 本文 -->
      <div class="my-16">
        <!-- 行 -->
        <div v-for="line in lines">
          <!-- line -->
          <div v-if="line.type === 'line'" :class="lineClass(line)">
            <!-- 空行 -->
            <div v-if="line.nodes.length === 0" class="my-8"></div>
            <!-- インデント -->
            <span v-if="line.indent > 0" :class="indentClass(line)">・</span>
            <!-- ノード -->
            <span v-for="node in line.nodes">
              <Node :node="node" />
            </span>
          </div>
          <!-- table -->
          <div v-if="line.type === 'table'" class="my-2">
            <LineTable :line="line" class="w-full" />
          </div>
          <!-- codeBlock -->
          <div v-if="line.type === 'codeBlock'" class="my-2">
            <CodeBlock :code="line.content"></CodeBlock>
          </div>
        </div>
      </div>
    </div>
  </article>
</template>
