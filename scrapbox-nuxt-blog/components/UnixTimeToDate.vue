<script setup>
const props = defineProps({
  time: Number,
})

const date = new Date(props.time * 1000)
const dateString = date.toISOString().slice(0, 10)
</script>

<template>
  <span>{{ dateString }}</span>
</template>
