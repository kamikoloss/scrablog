<script setup>
const props = defineProps({ line: Object })

const lineClass = (line) => {
  const hasImage = line.nodes.filter(node => node.type === 'image').length > 0
  const isSingleNode = line.nodes.length === 1
  const isQuote = line.nodes.filter(node => node.type === 'quote').length > 0
  return {
    'flex': hasImage,
    'text-justify': isSingleNode,
    'text-gray-500': isQuote,
    'bg-gray-100': isQuote,
    'px-4': isQuote,
    'my-2': !isQuote,
    'leading-relaxed': true,
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
  <div>
    <!-- line -->
    <div v-if="line.type === 'line'" :class="lineClass(line)">
      <!-- 空行 -->
      <div v-if="line.nodes.length === 0" class="my-8"></div>
      <!-- インデント -->
      <span v-if="line.indent > 0" :class="indentClass(line)">・</span>
      <!-- ノード -->
      <Node v-for="node in line.nodes" :node="node" />
    </div>
    <!-- table -->
    <LineTable
      v-if="line.type === 'table'"
      :line="line"
      class="w-full my-2"
    />
    <!-- codeBlock -->
    <CodeBlock
      v-if="line.type === 'codeBlock'"
      :code="line.content"
      class="my-2"
    />
  </div>
</template>
