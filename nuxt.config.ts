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
      title: 'ВИЗИТ Урай - Строительные Отделочные Материалы',
      meta: [
        { charset: 'utf-8' },
        { name: 'robots', content: 'index, follow' },
        { name: 'google-site-verification', content: '6beYvb7xsLm1WOCzzj21vdRR9z3uwcmG5dO14Txv1tQ'}, 
        { name: 'yandex-verification', content: '5b9cb3b80b6cb970'}, 
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { id: 'description', name: 'description', content: 'ВИЗИТ - магазин строительных и отделочных материалов в Урае. Широкий выбор обоев, красок, сантехники, ванн, электрики, мебели и других товаров для ремонта. Адрес: г. Урай мкр 1Д, дом 75А' },
        { id: 'keywords', name: 'keywords', content: 'Визит Урай, Обои Урай, Ванны Урай, Сантехника Урай, Электрика Урай, Мебель Урай, Краски Урай, строительные материалы Урай, отделочные материалы' },
        { name: 'geo.placename', content: 'Урай' },
        { name: 'geo.region', content: 'RU-KHM' },
        { name: 'geo.position', content: '60.1333,64.8' },
        { property: 'og:title', content: 'ВИЗИТ Урай - Строительные и Отделочные Материалы' },
        { property: 'og:description', content: 'ВИЗИТ - магазин строительных и отделочных материалов в Урае. Широкий выбор обоев, красок, сантехники, ванн, электрики, мебели и других товаров для ремонта. Адрес: г. Урай мкр 1Д, дом 75А' },
        { property: 'og:type', content: 'website' },
        { property: 'og:locale', content: 'ru_RU' }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'canonical', href: 'https://vizit-uray.vercel.app' }
      ],
    },
  },
})

