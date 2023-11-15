import Prism from 'prismjs'
import 'prismjs/themes/prism.css'
//import 'prismjs/components/prism-javascript'

// https://nuxt.com/docs/guide/directory-structure/plugins
export default defineNuxtPlugin(() => {
  return {
    provide: {
      prism: () => Prism
    }
  }
})
