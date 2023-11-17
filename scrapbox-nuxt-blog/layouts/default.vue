<script setup>
const appConfig = useAppConfig()
</script>

<template>
  <div class="min-h-screen bg-gray-200 text-gray-900">
    <header>
      <div class="bg-white py-16">
        <div class="w-full max-w-3xl mx-auto px-8">
          <h1 class="font-bold text-2xl">
            <NuxtLink to="/">{{ appConfig.blogTitle }}</NuxtLink>
          </h1>
          <p v-if="appConfig.headerText" class="my-2">{{ appConfig.headerText }}</p>
        </div>
      </div>
    </header>
    <main>
      <div class="w-full max-w-3xl mx-auto">
        <slot />
      </div>
    </main>
    <footer>
      <div class="py-4">
        <p v-if="appConfig.footerText" class="text-center text-sm text-gray-500">{{ appConfig.footerText }}</p>
      </div>
    </footer>
  </div>
</template>
