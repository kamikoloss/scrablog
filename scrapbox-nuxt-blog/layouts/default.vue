<template>
  <div class="bg-gray-100">
    <div class="w-full max-w-3xl mx-auto text-gray-900">
      <header>
        <div class="px-8 py-16 bg-white">
          <h1 class="font-bold text-2xl">
            <NuxtLink to="/">BLOG TITLE</NuxtLink>
          </h1>
          <p>Blog description hogehoge fugafuga.</p>
        </div>
      </header>
      <main>
        <slot />
      </main>
      <footer>
        <div class="py-4">
          <p class="text-center text-sm text-gray-500">Blog footer hogehoge fufafuga.</p>
        </div>
      </footer>
    </div>
  </div>
</template>
