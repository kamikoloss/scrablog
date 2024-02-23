<script setup>
const route = useRoute()
const { word } = route.params

const { data: results } = await useAsyncData(`search-${word}`, () => {
  return searchContent(word)
})
</script>

<template>
  <div>
    <div class="text-center text-text-light my-32">
      <h2 class="text-xl font-bold my-4">"{{ word }}" の検索結果</h2>
      <div v-if="results">
        <div>{{ results }}</div>
      </div>
      <div v-else>
        <p class="my-4">検索結果なし</p>
      </div>
    </div>
  </div>
</template>
