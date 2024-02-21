<script setup>
const props = defineProps({
  article: Object,
  surround: Object,
})

const appConfig = useAppConfig()
</script>

<template>
  <ArticleLayout>
    <!-- ヘッダー -->
    <template #header>
      <!-- タイトル -->
      <h2 class="text-xl font-bold my-2">
        <NuxtLink :to="`/${article.id}`">{{ article.title }}</NuxtLink>
      </h2>
      <!-- 日時 -->
      <div
        v-if="appConfig.showCreated || appConfig.showUpdated"
        class="flex gap-x-2 text-sm text-text-light my-2"
      >
        <div v-if="appConfig.showCreated" class="flex gap-x-2">
          <span class="material-symbols-outlined text-base">schedule</span>
          <span>{{ getDateString(article.created, appConfig.showTime) }}</span>
        </div>
        <div v-if="appConfig.showUpdated" class="flex gap-x-2">
          <span class="material-symbols-outlined text-base">update</span>
          <span>{{ getDateString(article.updated, appConfig.showTime) }}</span>
        </div>
      </div>
    </template>
    <!-- メイン: 本文 -->
    <template #main>
      <Lines :lines="article.lines" />
    </template>
    <!-- 下部 -->
    <template #bottom v-if="surround && appConfig.showSurround">
      <ul class="flex justify-between gap-x-8">
        <!-- 1つ新しい記事 -->
        <li>
          <NuxtLink
            v-if="surround[0]"  
            :to="`/${surround[0].id}`" 
            class="flex">
            <span class="material-symbols-outlined w-8 text-base text-center shrink-0">chevron_left</span>
            <span>{{ surround[0].title }}</span>
          </NuxtLink>
        </li>
        <!-- 1つ古い記事 -->
        <li>
          <NuxtLink
            v-if="surround[1]"
            :to="`/${surround[1].id}`" 
            class="flex"
          >
            <span>{{ surround[1].title }}</span>
            <span class="material-symbols-outlined w-8 text-base text-center shrink-0">chevron_right</span>
          </NuxtLink>
        </li>
      </ul>
    </template>
  </ArticleLayout>
</template>
