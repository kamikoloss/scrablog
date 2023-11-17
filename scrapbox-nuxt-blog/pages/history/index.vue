<script setup>
const { data: pages } = await useAsyncData('history', () => {
  return queryContent().sort({ created: -1 }).find()
})
</script>

<template>
  <div class="my-32 px-8 py-16 bg-white">
    <div class="border-b border-gray-300 mb-16 pb-4">
      <h2 class="text-xl font-bold">HISTORY</h2>
    </div>
    <ul v-for="page of pages" class="leading-relaxed">
      <li>
        <Date :unix-time="page.created" class="mr-2" />
        <NuxtLink :to="page.title.replace(/ /g, '_')" class="text-blue-500">{{ page.title }}</NuxtLink>
      </li>
    </ul>
  </div>
</template>
