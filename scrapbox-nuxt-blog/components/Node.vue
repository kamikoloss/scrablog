<script setup>
const props = defineProps({ node: Object })

const decorationClass = (node) => {
  const isBold = (decos) => {
    const regex = /\*.*/
    return decos.some(deco => regex.test(deco))
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
    <span v-if="node.type === 'plain'">{{ node.text }}</span>
    <!-- リンク, ハッシュタグ -->
    <NodeLink
      v-if="node.type === 'link' || node.type === 'hashTag'"
      :node="node"
    />
    <!-- 画像 -->
    <NodeImage
      v-if="node.type === 'image' || node.type === 'strongImage'"
      :node="node"
    />
    <!-- コードブロック (インライン), コマンドライン -->
    <CodeBlock
      v-if="node.type === 'code' || node.type === 'commandLine'"
      :code="node.text"
      inline
    />
    <!-- 装飾, 引用 -->
    <Node
      v-if="node.type === 'decoration' || node.type === 'quote'"
      v-for="childNode in node.nodes"
      :node="childNode"
      :class="decorationClass(node)"
    />
  </span>
</template>
