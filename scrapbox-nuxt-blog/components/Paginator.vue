<script setup>
const props = defineProps({ currentNumber: Number })

const appConfig = useAppConfig()

const { data: articles } = await useAsyncData('paginator', () => {
  return whereNotInTitle(queryContent()).find()
})
const articlesCount = articles.value.length

const newerNumber = Number(props.currentNumber) - 1
const olderNumber = Number(props.currentNumber) + 1
const showNewer = newerNumber >= 0
const showOlder = olderNumber < (articlesCount / appConfig.articlesPerPage)

const newerLink = newerNumber == 0 ? '/' : `/history/${newerNumber}`
</script>

<template>
  <nav>
    <ul class="flex">
      <!-- NEWER -->
      <li class="w-full">
        <NuxtLink :to="newerLink" v-if="showNewer" class="flex gap-x-2 justify-start">
          <span class="material-symbols-outlined text-base">chevron_left</span>
          <span>NEWER</span>
        </NuxtLink>
      </li>
      <!-- HISTORY -->
      <li class="w-full text-center">
        <NuxtLink to="/history">HISTORY</NuxtLink>
      </li>
      <!-- OLDER -->
      <li class="w-full">
        <NuxtLink :to="`/history/${olderNumber}`" v-if="showOlder" class="flex gap-x-2 justify-end">
          <span>OLDER</span>
          <span class="material-symbols-outlined text-base">chevron_right</span>
        </NuxtLink>
      </li>
    </ul>
  </nav>
</template>
