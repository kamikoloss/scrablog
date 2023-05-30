
<script setup>
const props = defineProps({ page: Object })
</script>

<template>
  <article>
    <div class="border border-gray-300 px-4">
      <!-- タイトル, 日付 -->
      <div class="border-b border-gray-300 my-8">
        <h2 class="text-xl font-bold">{{ page.title }}</h2>
        <div class="text-right text-gray-500 ml-auto">
          <Date :unix-time="page.created" />
        </div>
      </div>
      <!-- 本文 -->
      <div class="my-8">
      <div v-for="(line, index) in page.lines" class="my-4">
          <!-- 1行目: タイトルなので省略する -->
          <div v-if="index === 0"></div>
          <!-- 空行 -->
          <div v-else-if="line === ''"></div>
          <!-- Gyazo -->
          <div v-else-if="line.includes('gyazo.com')">
            <Gyazo :line="line" />
          </div>
          <!-- YouTube -->
          <div v-else-if="line.includes('youtube.com') || line.includes('youtu.be')">
            <YouTube :line="line" />
          </div>
          <!-- 外部リンク -->
          <div v-else-if="line.includes('https://') && line.includes('[')">
            <ScrapboxLink :line="line" />
          </div>
          <!-- それ以外: プレーン文字として扱う -->
          <div v-else>
            <p class="text-justify leading-relaxed">{{ line }}</p>
          </div>
        </div>
      </div>
    </div>
  </article>
</template>
