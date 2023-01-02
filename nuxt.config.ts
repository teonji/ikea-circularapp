// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,
  app: {
    head: {
      title: 'Ikea Circular App',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1.0, minimum-scale=1.0' },
        { name: 'theme-color', content: '#0058AB' },
      ],
    }
  },
  modules: ['@nuxtjs/tailwindcss'],
})
