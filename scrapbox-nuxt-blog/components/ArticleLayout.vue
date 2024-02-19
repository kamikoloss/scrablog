<script setup>
const slots = useSlots()
const hasSlot = (name) => slots[name] !== undefined
</script>

<template>
  <div>
    <article class="bg-bg-content px-8 py-16">
      <div v-if="hasSlot('header')" class="border-b border-gray-300 mb-16">
        <slot name="header" />
      </div>
      <div>
        <slot name="main" />
      </div>
      <div v-if="hasSlot('footer')" class="border-t border-gray-300 mt-16">
        <slot name="footer" />
      </div>
    </article>
    <div v-if="hasSlot('bottom')" class="mt-16">
      <slot name="bottom" />
    </div>
  </div>
</template>
