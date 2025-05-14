import {resolve} from 'path'

export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  
  modules: [
    '@pinia/nuxt',
    '@nuxtjs/google-fonts',
  ],
  
  css: [
    '@/assets/styles/global.sass',
    'swiper/css',
    'swiper/css/navigation',
    'swiper/css/pagination',
  ],

  runtimeConfig: {
    // Приватные ключи доступны только на сервере
    // Публичные ключи доступны и на клиенте
    public: {
      apiKey: process.env.PUBLIC_API_KEY,
    }
  },
  
  alias: {
    '@mixin': resolve(__dirname, 'assets/styles/mixin.sass'),
    '@color': resolve(__dirname, 'assets/styles/color.sass'),
    '@global': resolve(__dirname, 'assets/styles/global.sass'),
    '@ui': resolve(__dirname, 'assets/styles/ui.sass'),
    '@fonts': resolve(__dirname, 'assets/styles/fonts.sass'),
  },
  
  vite: {
    css: {
      preprocessorOptions: {
        sass: {
          additionalData: '@import "@/assets/styles/color.sass"\n@import "@/assets/styles/mixin.sass"\n',
        },
      },
    },
  },
  
  googleFonts: {
    families: {
      'Source+Sans+3': [300, 400, 500, 600, 700],
    },
    display: 'swap',
    download: true,
  },
  
  build: {
    transpile: ['gsap'],
  },
  
  app: {
    head: {
      title: 'ВИЗИТ - Строительные Отделочные Материалы',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { hid: 'description', name: 'description', content: 'ВИЗИТ - магазин строительных и отделочных материалов. Широкий выбор обоев, красок, сантехники и других товаров для ремонта.' },
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      ],
    },
  },
})

