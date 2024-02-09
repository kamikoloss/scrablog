<script setup>
const props = defineProps({
  unixTime: Number,
  showTime: Boolean,
})
</script>

<template>
  <span>{{ getDateString(unixTime, showTime) }}</span>
</template>
