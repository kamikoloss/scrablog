<script setup>
const props = defineProps({ currentNumber: Number })

const newerNumber = Number(props.currentNumber) - 1
const olderNumber = Number(props.currentNumber) + 1
</script>

<template>
  <nav>
    <div class="flex">
      <!-- NEWER-->
      <div class="w-full">
        <NuxtLink to="/" v-if="newerNumber == 0">&lt;&lt; NEWER</NuxtLink>
        <NuxtLink :to="`/history/${newerNumber}`" v-if="newerNumber > 0">&lt;&lt; NEWER</NuxtLink>
      </div>
      <!-- HISTORY-->
      <div class="w-full text-center">
        <NuxtLink :to="`/history`">HISTORY</NuxtLink>
      </div>
      <!-- OLDER-->
      <div class="w-full text-right">
        <NuxtLink :to="`/history/${olderNumber}`" v-if="olderNumber != lastNumber">OLDER &gt;&gt;</NuxtLink>
      </div>
    </div>
  </nav>
</template>
