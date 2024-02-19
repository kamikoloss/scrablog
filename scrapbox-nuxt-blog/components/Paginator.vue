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
    <ul class="flex justify-between">
      <!-- NEWER -->
      <li>
        <NuxtLink
          v-if="showNewer"
          :to="newerLink"
          class="flex"
        >
          <span class="material-symbols-outlined w-8 text-base text-center">chevron_left</span>
          <span>NEWER</span>
        </NuxtLink>
      </li>
      <!-- OLDER -->
      <li>
        <NuxtLink
          v-if="showOlder"
          :to="`/history/${olderNumber}`"
          class="flex"
        >
          <span>OLDER</span>
          <span class="material-symbols-outlined w-8 text-base text-center">chevron_right</span>
        </NuxtLink>
      </li>
    </ul>
  </nav>
</template>
