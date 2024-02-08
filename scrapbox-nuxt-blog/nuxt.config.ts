import { searchForWorkspaceRoot } from 'vite'
import { appConfig } from './scrablog.config'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ['@nuxt/content'],
  app: {
    baseURL: `/${appConfig.repositoryName}/`,
    head: {
      link: [
        // Google Fonts
        {
          rel: 'preconnect',
          href: 'https://fonts.googleapis.com',
        },
        {
          rel: 'preconnect',
          href: 'https://fonts.gstatic.com',
          crossorigin: '',
        },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Noto+Sans+JP&display=swap',
        },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200'
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
