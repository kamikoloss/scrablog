
<script setup>
import { parse } from '@progfay/scrapbox-parser'
const props = defineProps({ page: Object })
const lines = parse(props.page.lines.join('\n'))
console.log(lines)

const lineClass = (line) => {
  const hasImage = line.nodes?.filter(node => node.type === 'image').length > 0
  return {
    'my-2': true,
    'flex': hasImage,
  }
}
const decorationClass = (decos) => {
  const isBold = (decos) => {
    const regex = /\*.*/
    for (const deco of decos) {
      if (regex.test(deco)) return true
    }
    return false
  }
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
const indentClass = (indent) => {
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
        <div v-for="line in lines" :class="lineClass(line)">
          <!-- 空行 -->
          <div v-if="line.nodes?.length === 0" class="my-8"></div>
          <!-- インデント -->
          <span v-if="line.indent > 0" :class="indentClass(line.indent)">・</span>
          <!-- ノード内容 -->
          <span v-for="node in line.nodes">
            <!-- プレーンテキスト -->
            <span v-if="node.type === 'plain'">
              <span>{{ node.text }}</span>
            </span>
            <!-- リンク -->
            <span v-if="node.type === 'link'">
              <span v-if="node.pathType === 'absolute'">
                <!-- YouTube -->
                <span v-if="node.href.includes('youtube.com') || node.href.includes('youtu.be')">
                  <YouTube :src="node.href" />
                </span>
                <!-- テキストリンク -->
                <span v-else>
                  <NuxtLink :to="node.href" class="underline">{{ node.content === '' ? node.href : node.content }}</NuxtLink>
                </span>
              </span>
              <span v-if="node.pathType === 'relative'">
                <!-- TODO -->
                <span>{{ node.href }}</span>
              </span>
            </span>
            <!-- 画像 -->
            <span v-if="node.type === 'image'">
              <img :src="node.src" class="max-h-80" />
            </span>
            <!-- 装飾 -->
            <span v-if="node.type === 'decoration'">
              <span v-for="childNode in node.nodes" :class="decorationClass(node.decos)">
                <span>{{ childNode.text }}</span>
                <!-- TODO: プレーンテキストやリンクの区別 -->
              </span>
            </span>
          </span>
        </div>
      </div>
    </div>
  </article>
</template>
