<script setup>
const props = defineProps({ node: Object })

const decorationClass = (node) => {
  const isBold = (decos) => {
    const regex = /\*.*/
    for (const deco of decos) {
      if (regex.test(deco)) return true
    }
    return false
  }
  const decos = node.decos ? node.decos : []
  return {
    'font-bold': isBold(decos),
    'text-lg': decos.includes('*-2'),
    'text-xl': decos.includes('*-3'),
    'text-2xl': decos.includes('*-4'),
    'text-3xl': decos.includes('*-5'),
    'text-4xl': decos.includes('*-6'),
    'text-5xl': decos.includes('*-7'),
    'text-6xl': decos.includes('*-8'),
    'italic': decos.includes('/'),
    'line-through': decos.includes('-'),
    'underline': decos.includes('_'),
  }
}
</script>

<template>
  <span>
    <!-- プレーンテキスト -->
    <span v-if="node.type === 'plain'">
      <span>{{ node.text }}</span>
    </span>
    <!-- コードブロック (インライン) -->
    <span v-if="node.type === 'code'">
      <CodeBlock :code="node.text" inline />
    </span>
    <!-- コマンドライン -->
    <span v-if="node.type === 'commandLine'">
      <CodeBlock :code="node.text" inline />
    </span>
    <!-- リンク -->
    <span v-if="node.type === 'link'">
      <NodeLink :node="node" />
    </span>
    <!-- 画像 -->
    <span v-if="node.type === 'image' || node.type === 'strongImage'">
      <NodeImage :node="node" />
    </span>
    <!-- 引用 -->
    <span v-if="node.type === 'quote'">
      <span v-for="childNode in node.nodes">
        <Node :node="childNode" />
      </span>
    </span>
    <!-- 装飾 -->
    <span v-if="node.type === 'decoration'">
      <span v-for="childNode in node.nodes" :class="decorationClass(node)">
        <Node :node="childNode" />
      </span>
    </span>
  </span>
</template>
