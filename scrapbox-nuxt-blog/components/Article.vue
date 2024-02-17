<script setup>
const props = defineProps({ page: Object })

const appConfig = useAppConfig()
</script>

<template>
  <ArticleLayout>
    <template #header>
      <!-- タイトル -->
      <h2 class="text-xl font-bold my-2">
        <NuxtLink :to="`/${escapeArticleTitle(page.title)}`">{{ page.title }}</NuxtLink>
      </h2>
      <!-- 日時 -->
      <div
        v-if="appConfig.showCreated || appConfig.showUpdated"
        class="flex gap-x-2 text-sm text-text-light my-2"
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
    </template>
    <template #main>
      <Lines :lines="page.lines" />
    </template>
  </ArticleLayout>
</template>
