
<script setup>
const props = defineProps({ src: String })

let youtubeId = ''
if (props.src.includes('youtube.com')) {
  youtubeId = props.src.split('v=').pop()
} else if (props.src.includes('youtu.be')) {
  youtubeId = props.src.split('/').pop()
}
const src = `https://www.youtube.com/embed/${youtubeId}`
</script>

<template>
  <iframe
    :src="src"
    title="YouTube video player"
    frameborder="0"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowfullscreen
    class="w-full aspect-video"
  ></iframe>
</template>
