<script setup>
const route = useRoute()
const { title } = route.params
</script>

<template>
  <div class="text-center text-light-text">
    <h2 class="text-4xl my-4">Not Found</h2>
    <p class="my-4">"{{ title }}" というページは見つかりませんでした。</p>
  </div>
</template>
