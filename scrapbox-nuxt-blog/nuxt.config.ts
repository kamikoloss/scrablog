// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ['@nuxt/content'],
  app: {
    head: {
      htmlAttrs: {
        lang: 'ja',
      }
    }
  }
})
