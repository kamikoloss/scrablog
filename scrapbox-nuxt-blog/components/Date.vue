<script setup>
const props = defineProps({ unixTime: Number })

const { showTime } = useAppConfig()

const getDateString = (unixTime) => {
  const date = new Date(unixTime * 1000)
  if (showTime) {
    // 年月日 + 時間
    return date.toISOString().slice(0, 16).replace('T', ' ')
  } else {
    // 年月日のみ
    return date.toISOString().slice(0, 10)
  }
}
</script>

<template>
  <span>{{ getDateString(unixTime) }}</span>
</template>
