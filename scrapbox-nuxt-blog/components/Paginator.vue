<script setup>
const props = defineProps({ currentNumber: Number })

const { indexPerPage } = useAppConfig()

const { data: pages } = await useAsyncData('paginator', () => queryContent().find())
const pageCount = pages.value.length

const newerNumber = Number(props.currentNumber) - 1
const olderNumber = Number(props.currentNumber) + 1
const showNewer = newerNumber > 0
const showOlder = olderNumber < (pageCount / indexPerPage)
</script>

<template>
  <nav>
    <ul class="flex">
      <!-- NEWER -->
      <li class="w-full text-left">
        <NuxtLink to="/" v-if="newerNumber == 0">&lt;&lt; NEWER</NuxtLink>
        <NuxtLink :to="`/history/${newerNumber}`" v-if="showNewer">&lt;&lt; NEWER</NuxtLink>
      </li>
      <!-- HISTORY -->
      <li class="w-full text-center">
        <NuxtLink :to="`/history`">HISTORY</NuxtLink>
      </li>
      <!-- OLDER -->
      <li class="w-full text-right">
        <NuxtLink :to="`/history/${olderNumber}`" v-if="showOlder">OLDER &gt;&gt;</NuxtLink>
      </li>
    </ul>
  </nav>
</template>
