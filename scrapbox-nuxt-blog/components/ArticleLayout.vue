<script setup>
const slots = useSlots()
const hasSlot = (name) => slots[name] !== undefined
</script>

<template>
  <article class="bg-bg-content px-8 py-16">
    <div v-if="hasSlot('header')" class="border-b border-gray-300 mb-16">
      <slot name="header" />
    </div>
    <div>
      <slot name="main" />
    </div>
  </article>
</template>
