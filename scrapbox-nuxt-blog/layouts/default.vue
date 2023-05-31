<template>
  <div class="text-gray-900 w-full max-w-3xl px-4 mx-auto">
    <header>
      <div class="px-4 my-32">
        <h1 class="font-bold text-2xl">BLOG TITLE</h1>
        <p>Blog description hogehoge fugafuga.</p>
      </div>
    </header>
    <main>
      <slot />
    </main>
    <footer>
      <div class="text-center my-4">
        <p class="text-sm text-gray-500">Blog footer hogehoge fufafuga.</p>
      </div>
    </footer>
  </div>
</template>
