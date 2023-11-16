<script setup>
const props = defineProps({ inline: Boolean, code: String })

const nuxtApp = useNuxtApp()
onMounted(() => nuxtApp.$prism().highlightAll())
</script>

<template>
  <span>
    <!-- インライン -->
    <span v-if="inline">
      <code class="language-text">{{ code }}</code>
    </span>
    <!-- ブロック (pre 要素をインデントしないように注意する) -->
    <span v-else>
<pre><code class="language-js">{{ code }}</code></pre>
    </span>
  </span>
</template>

<style>
pre[class*="language-"] {
  border: none;
  border-radius: 0;
  background-color: #f3f4f6; /* gray-100 */
  padding: 0.5em 1em;
}
:not(pre) > code[class*="language-"] {
  border: none;
  border-radius: 0;
  background-color: #f3f4f6; /* gray-100 */
  padding: 0 0.5em;
}
.token.operator {
  background: none;
}
</style>
