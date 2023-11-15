import { searchForWorkspaceRoot } from 'vite'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ['@nuxt/content'],
  app: {
    baseURL: '/scrapbox-nuxt-blog/',
    buildAssetsDir: '/scrapbox-nuxt-blog/_nuxt/',
    head: {
      link: [
        // Google Fonts
        {
          rel: 'preconnect',
          href: 'https://fonts.googleapis.com',
        },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Noto+Sans+JP&display=swap',
          crossorigin: '',
        },
      ],
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
  nitro: {
    // https://nitro.unjs.io/config#prerender
    prerender: {
      failOnError: false, 
      crawlLinks: true,
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
