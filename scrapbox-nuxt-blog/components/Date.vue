<script setup>
const props = defineProps({ unixTime: Number })
const date = new Date(props.unixTime * 1000)
const dateString = date.toISOString().slice(0, 10)
</script>

<template>
  <span>{{ dateString }}</span>
</template>
