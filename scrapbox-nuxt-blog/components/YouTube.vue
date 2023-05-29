
<script setup>
// TODO: 縮むようにする
const props = defineProps({ line: Object })

const youtubeUrl = props.line.replace(/\[|\]/g, '')
let youtubeId = ''
if (youtubeUrl.includes('youtube.com')) {
  youtubeId = youtubeUrl.split('v=').pop()
} else if (youtubeUrl.includes('youtu.be')) {
  youtubeId = youtubeUrl.split('/').pop()
}
const src = `https://www.youtube.com/embed/${youtubeId}`
</script>

<template>
  <iframe
    width="640"
    height="360"
    :src="src"
    title="YouTube video player"
    frameborder="0"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowfullscreen
  ></iframe>
</template>
