<script setup>
const props = defineProps({ article: Object })
const linkTo = '/' + props.article?.id

const appConfig = useAppConfig()
</script>

<template>
  <div class="min-h-[128px] flex bg-bg-content">
    <!-- タイトル, 日時 -->
    <div class="w-full px-8 py-2">
      <h2 class="font-bold my-2 lg:text-xl">
        <NuxtLink :to="linkTo">{{ article.title }}</NuxtLink>
      </h2>
      <div
        v-if="appConfig.showCreated || appConfig.showUpdated"
        class="text-sm text-text-light"
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
    </div>
    <!-- 画像 -->
    <NuxtLink :to="linkTo">
      <div v-if="article.image" class="w-[128px] h-full shrink-0">
        <img :src="article.image" class="w-full h-full object-cover" />
      </div>
    </NuxtLink>
  </div>
</template>
