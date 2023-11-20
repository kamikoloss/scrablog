<script setup>
const route = useRoute()
const { tag } = route.params

const { data: pages } = await useAsyncData(`tags-${tag}`, () => {
  return queryContent().where({ tags: { $contains: `#${tag}` } }).sort({ created: -1 }).find()
})
</script>

<template>
  <div class="bg-white my-32 px-8 py-16">
    <div class="border-b border-gray-300 mb-16">
      <h2 class="text-xl font-bold my-2">{{ tag }}</h2>
    </div>
    <ul>
      <li v-for="page of pages" class="my-2">
        <Date :unix-time="page.created" :show-time="false" class="mr-2" />
        <NuxtLink :to="`/${page.title.replace(/ /g, '_')}`" class="text-blue-500">{{ page.title }}</NuxtLink>
      </li>
    </ul>
  </div>
</template>
