<script setup>
const { data: pages } = await useAsyncData('history', () => {
  return queryContent().sort({ created: -1 }).find()
})
</script>

<template>
  <div class="bg-white my-32 px-8 py-16">
    <div class="border-b border-gray-300 mb-16 pb-4">
      <h2 class="text-xl font-bold">HISTORY</h2>
    </div>
    <ul>
      <li v-for="page of pages" class="my-2">
        <Date :unix-time="page.created" :show-time="false" class="mr-2" />
        <NuxtLink :to="`/${page.title.replace(/ /g, '_')}`" class="text-blue-500">{{ page.title }}</NuxtLink>
      </li>
    </ul>
  </div>
</template>
