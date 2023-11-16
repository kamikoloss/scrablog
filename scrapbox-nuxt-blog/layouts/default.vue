<template>
  <div class="bg-gray-100 text-gray-900">
    <header>
      <div class="bg-white py-16">
        <div class="w-full max-w-3xl mx-auto px-8">
          <h1 class="font-bold text-2xl">
            <NuxtLink to="/">BLOG TITLE</NuxtLink>
          </h1>
          <p>Blog description hogehoge fugafuga.</p>
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
        <p class="text-center text-sm text-gray-500">Blog footer hogehoge fufafuga.</p>
      </div>
    </footer>
  </div>
</template>
