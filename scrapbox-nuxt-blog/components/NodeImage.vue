<script setup>
const props = defineProps({
  node: Object,
  modal: Boolean,
})

//const enableModal = props.modal ?? false
const enableModal = true
const isModalOpen = ref(false)

const imageClass = (node) => {
  return {
    // strongImage の場合は制限をつけない
    'max-h-80': node.type === 'image',
    'cursor-pointer	': enableModal,
  }
}

const modalClass = () => {
  return {
    'block': isModalOpen.value,
    'hidden': !isModalOpen.value,
  }
}

const onClickModal = () => {
  if (!enableModal) return
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
