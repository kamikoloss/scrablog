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
