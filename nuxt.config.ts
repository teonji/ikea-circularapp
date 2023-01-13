// https://nuxt.com/docs/api/configuration/nuxt-config

const seo = {
  title: 'Ikea Circular App',
  description: 'Great deals for you and the environment',
  image: 'https://www.ikea.com/images/04/01/04019383274fe845d25a89e8786ffc3f.jpg?f=s'
}

export default defineNuxtConfig({
  ssr: false,
  app: {
    head: {
      title: seo.title,
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no' },
        { name: 'theme-color', content: '#0058AB' },
        { hid: 'title', name: 'title', content: seo.title },
        { hid: 'og:title', property: 'og:title', content: seo.title },
        { hid: 'description', name: 'description', content: seo.description },
        { hid: 'og:description', property: 'og:description', content: seo.description },
        { hid: 'og:image', property: 'og:image', content: seo.image },
        { hid: 'og:type', property: 'og:type', content: 'website' },
        { hid: 'robots', name: 'robots', content: 'index,follow' }
      ],
      link: [
        { rel: 'preconnect', href: 'https://teonji.npkn.net' },
        { rel: 'dns-prefetch', href: 'https://teonji.npkn.net' },
        { rel: 'icon', type: 'image/x-icon', href: 'https://www.ikea.com/favicon.ico' }
      ]
    }
  },
  modules: ['@nuxtjs/tailwindcss'],
})
