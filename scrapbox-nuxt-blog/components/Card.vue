<script setup>
const props = defineProps({ page: Object })
const linkTo = escapeArticleTitle(props.page?.title)

const appConfig = useAppConfig()
</script>

<template>
  <div class="h-32 flex bg-bg-content">
    <!-- タイトル, 日時 -->
    <div class="w-full h-full flex flex-wrap content-between px-4 py-2">
      <h2 class="w-full text-xl font-bold">
        <NuxtLink :to="linkTo">{{ page.title }}</NuxtLink>
      </h2>
      <div
        v-if="appConfig.showCreated || appConfig.showUpdated"
        class="flex gap-x-2 text-sm text-text-light"
      >
        <div v-if="appConfig.showCreated" class="flex gap-x-2">
          <span class="material-symbols-outlined text-base">schedule</span>
          <span>{{ getDateString(page.created, appConfig.showTime) }}</span>
        </div>
        <div v-if="appConfig.showUpdated" class="flex gap-x-2">
          <span class="material-symbols-outlined text-base">update</span>
          <span>{{ getDateString(page.updated, appConfig.showTime) }}</span>
        </div>
      </div>
    </div>
    <!-- 画像 -->
    <NuxtLink :to="linkTo">
      <div class="w-32 h-full shrink-0 bg-gray-100">
        <img v-if="page.image" :src="page.image" class="w-full h-full object-cover" />
        <div v-else />
      </div>
    </NuxtLink>
  </div>
</template>
