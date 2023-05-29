
<script setup>
const props = defineProps({ page: Object })
</script>

<template>
  <article>
    <div class="border border-gray-300 px-4 py-8">
      <div class="border-b border-gray-300 pb-4 mb-8">
        <h2 class="text-xl font-bold">{{ page.title }}</h2>
        <div class="text-right text-gray-500 ml-auto">
          <UnixTimeToDate :time="page.created" />
        </div>
      </div>
      <div v-for="(line, index) in page.lines">
        <!-- 1行目はタイトルなので省略する -->
        <div v-if="index !== 0">
          <p class="text-justify leading-relaxed my-4">{{ line }}</p>
        </div>
      </div>
    </div>
  </article>
</template>
