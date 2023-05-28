import { searchForWorkspaceRoot } from 'vite'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ['@nuxt/content'],
  app: {
    head: {
      htmlAttrs: {
        lang: 'ja',
      },
    },
  },
  // https://nuxt.com/docs/guide/going-further/runtime-config
  // https://nuxt.com/docs/api/configuration/nuxt-config#runtimeconfig
  runtimeConfig: {},
  // https://tailwindcss.com/docs/guides/nuxtjs#3
  css: ['~/assets/css/main.css'],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  // https://vitejs.dev/config/server-options.html#server-fs-allow
  vite: {
    server: {
      fs: {
        allow: [
          searchForWorkspaceRoot(process.cwd()),
          '/home/ubuntu',
        ],
      },
    },
  },
})
