<script setup>
const props = defineProps({ page: Object })

const appConfig = useAppConfig()
</script>

<template>
  <div class="flex items-center bg-bg-content">
    <!-- 画像 -->
    <div class="w-32 aspect-square bg-gray-100">
      <img v-if="page.image" :src="page.image" />
      <div v-else />
    </div>
    <!-- タイトル -->
    <div class="w-full px-4">
      <h2 class="text-xl font-bold my-2">
        <NuxtLink :to="`/${page.title.replace(/ /g, '_')}`">{{ page.title }}</NuxtLink>
      </h2>
      <!-- 日時 -->
      <div
        v-if="appConfig.showCreated || appConfig.showUpdated"
        class="text-text-light my-2"
      >
        <div v-if="appConfig.showCreated" class="flex justify-end gap-x-2">
          <span class="material-symbols-outlined">schedule</span>
          <Date :unix-time="page.created" :show-time="appConfig.showTime" />
        </div>
        <div v-if="appConfig.showUpdated" class="flex justify-end gap-x-2">
          <span class="material-symbols-outlined">update</span>
          <Date :unix-time="page.updated" :show-time="appConfig.showTime" />
        </div>
      </div>
    </div>
  </div>
</template>
