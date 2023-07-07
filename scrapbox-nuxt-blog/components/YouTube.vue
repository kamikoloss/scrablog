
<script setup>
const props = defineProps({ src: String })

// YouTube の埋め込み用 URL を作成する
let youtubeId = ''
if (props.src.includes('youtube.com')) {
  // youtube.com の場合: 'v=' 以降の動画 ID を取得する 
  youtubeId = props.src.split('v=').pop()
} else if (props.src.includes('youtu.be')) {
  // youtu.be の場合: '/' 以降の動画 ID を取得する 
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
