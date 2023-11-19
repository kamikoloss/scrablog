<script setup>
const props = defineProps({ currentNumber: Number })

const { indexPerPage } = useAppConfig()

const { data: pages } = await useAsyncData('paginator', () => queryContent().find())
const pageCount = pages.value.length

const newerNumber = Number(props.currentNumber) - 1
const olderNumber = Number(props.currentNumber) + 1
const showNewer = newerNumber >= 0
const showOlder = olderNumber < (pageCount / indexPerPage)

const newerLink = newerNumber == 0 ? '/' : `/history/${newerNumber}`
</script>

<template>
  <nav>
    <ul class="flex">
      <!-- NEWER -->
      <li class="w-full">
        <NuxtLink :to="newerLink" v-if="showNewer" class="flex justify-start">
          <span class="material-symbols-outlined">chevron_left</span>
          <span>NEWER</span>
        </NuxtLink>
      </li>
      <!-- HISTORY -->
      <li class="w-full text-center">
        <NuxtLink to="/history">HISTORY</NuxtLink>
      </li>
      <!-- OLDER -->
      <li class="w-full">
        <NuxtLink :to="`/history/${olderNumber}`" v-if="showOlder" class="flex justify-end">
          <span>OLDER</span>
          <span class="material-symbols-outlined">chevron_right</span>
        </NuxtLink>
      </li>
    </ul>
  </nav>
</template>
