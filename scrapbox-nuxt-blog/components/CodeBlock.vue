<script setup>
//import Prism from '@/plugins/prism'
const nuxtApp = useNuxtApp()
const props = defineProps({ inline: Boolean, code: String })

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
}
:not(pre) > code[class*="language-"] {
  border: none;
  border-radius: 0;
  padding: 0.25em 0.5em;
}
.token.operator {
  background: none;
}
</style>
