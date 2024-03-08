<script setup>
import { parse } from '@progfay/scrapbox-parser'
import { headerNavTypes, defaultAllImagesLabel } from '~/scrablog.const';

const appConfig = useAppConfig()

const allImagesConfig = appConfig.headerNavContents.find(c => c.type === headerNavTypes.ALL_IMAGES)
const allImagesLabel = allImagesConfig?.label ?? defaultAllImagesLabel

useHead({
  title: `${appConfig.blogTitle} - ${allImagesLabel}`,
})

const { data: articles } = await useAsyncData('articles', () => {
  return whereNotInTitle(queryContent()).sort({ created: -1 }).find()
})

// TODO: 記事タイトルとセットにする (元記事に飛べるようにする)
let imageLines = []
articles.value.forEach(article => {
  article.lines
    .filter(line => line.text.includes('gyazo'))
    .forEach(line => imageLines.push(line.text))
})

let imageNodes = []
parse('images\n' + imageLines.join('\n'))
  .filter(line => line.type === 'line')
  .forEach(line => {
    line.nodes.forEach(node => imageNodes.push(node))
  })
</script>

<template>
  <ArticleLayout class="my-32">
    <template #header>
      <h2 class="text-xl font-bold my-2">{{ allImagesLabel }}</h2>
    </template>
    <template #main>
      <div class="grid grid-cols-3 lg:grid-cols-4 gap-4">
        <div v-for="node in imageNodes" class="aspect-square border border-gray-300">
          <img :src="node.src" class="w-full h-full object-cover"/>
        </div>
      </div>
    </template>
  </ArticleLayout>
</template>
