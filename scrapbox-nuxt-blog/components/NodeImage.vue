<script setup>
const props = defineProps({ node: Object })

const enableModal = ref(false)
const isModalOpen = ref(false)
onMounted(() => {
  const mdScreen = window.innerWidth > 768
  const isNotStrong = props.node.type !== 'strongImage'
  enableModal.value = mdScreen && isNotStrong
})

const imageClass = (node) => {
  return {
    // strongImage の場合は制限をつけない
    'max-h-80': node.type === 'image',
    'cursor-pointer	': enableModal.value,
  }
}

const modalClass = () => {
  return {
    'block': isModalOpen.value,
    'hidden': !isModalOpen.value,
  }
}

const onClickModal = () => {
  if (!enableModal.value) return
  isModalOpen.value = !isModalOpen.value
}
</script>

<template>
  <div>
    <!-- 通常表示用 -->
    <img
      :src="node.src"
      class="border border-gray-300"
      :class="imageClass(node)"
      @click="onClickModal"
    />
    <!-- モーダル表示用 -->
    <div :class="modalClass()">
      <div
        class="flex items-center justify-center	fixed top-0 left-0 z-10 w-full h-full bg-black/50"
        @click="onClickModal"
      >
        <img
          class="max-w-[80vw] max-h-[80vh]"
          :src="node.src"
        />
      </div>
    </div>

  </div>
</template>
