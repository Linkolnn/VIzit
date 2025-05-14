<template>
  <div class="product-page">
    <div class="container">
      <!-- Breadcrumbs -->
      <div class="breadcrumbs mb-20">
        <NuxtLink to="/" class="breadcrumbs__link">Главная</NuxtLink>
        <span class="breadcrumbs__separator">/</span>
        <NuxtLink :to="categoryUrl" class="breadcrumbs__link">{{ categoryName }}</NuxtLink>
        <span class="breadcrumbs__separator">/</span>
        <span class="breadcrumbs__current">{{ product.title }}</span>
      </div>

      <!-- Product Info -->
      <div class="product-info">
        <div class="row">
          <div class="col col--50 col--mobile-100">
            <div class="product-gallery">
              <div class="product-gallery__main">
                <img :src="product.image" :alt="product.title" class="product-gallery__image">
              </div>
              <div v-if="product.gallery && product.gallery.length" class="product-gallery__thumbs">
                <div 
                  v-for="(image, index) in product.gallery" 
                  :key="index" 
                  class="product-gallery__thumb"
                  :class="{ 'product-gallery__thumb--active': index === activeThumb }"
                  @click="activeThumb = index"
                >
                  <img :src="image" :alt="`${product.title} - изображение ${index + 1}`">
                </div>
              </div>
            </div>
          </div>
          <div class="col col--50 col--mobile-100">
            <div class="product-details">
              <h1 class="product-details__title font-h2">{{ product.title }}</h1>
              
              <div class="product-details__meta">
                <div class="product-details__meta-item">
                  <span class="product-details__meta-label">Бренд:</span>
                  <span class="product-details__meta-value">{{ product.brand }}</span>
                </div>
                <div class="product-details__meta-item">
                  <span class="product-details__meta-label">Коллекция:</span>
                  <span class="product-details__meta-value">{{ product.collection }}</span>
                </div>
                <div class="product-details__meta-item">
                  <span class="product-details__meta-label">Артикул:</span>
                  <span class="product-details__meta-value">{{ product.article }}</span>
                </div>
              </div>
              
              <div class="product-details__price-block">
                <p class="product-details__price">{{ formatPrice(product.price) }} ₽</p>
                <p v-if="product.oldPrice" class="product-details__old-price">{{ formatPrice(product.oldPrice) }} ₽</p>
              </div>
              
              <div class="product-details__description">
                <h3 class="product-details__subtitle">Характеристики</h3>
                <div class="product-details__specs">
                  <div v-for="(value, key) in product.specifications" :key="key" class="product-details__spec-row">
                    <div class="product-details__spec-name">{{ key }}</div>
                    <div class="product-details__spec-value">{{ value }}</div>
                  </div>
                </div>
              </div>
              
              <div class="product-details__actions">
                <button class="btn btn--primary btn--large btn--full mb-10">Купить</button>
                <button class="btn btn--outline btn--large btn--full">Бесплатная консультация</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Product Description -->
      <div class="product-description mt-40">
        <h2 class="product-description__title font-h3">Описание</h2>
        <div class="product-description__content font-text_medium" v-html="product.fullDescription"></div>
      </div>

      <!-- Similar Products -->
      <div class="similar-products mt-40">
        <h2 class="similar-products__title font-h3">Похожие товары</h2>
        <div class="row">
          <div v-for="product in similarProducts" :key="product.id" class="col col--25 col--tablet-50 col--mobile-100">
            <ProductCard :product="product" :category-id="categoryId" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useNavigationStore } from '@/stores/navigation';

const route = useRoute();
const navigationStore = useNavigationStore();
const activeThumb = ref(0);

// Mock product data - in a real app, this would come from an API or Pinia store
const product = ref({
  id: 1,
  title: 'TIKKURILA EURO POWER 7',
  brand: 'TIKKURILA',
  collection: 'EURO',
  article: 'A9adaefal',
  price: 6999,
  oldPrice: null,
  image: '/images/products/paint1.svg',
  gallery: [
    '/images/products/paint1.svg',
    '/images/products/paint2.svg',
    '/images/products/paint3.svg'
  ],
  discount: false,
  categoryId: 6, // Краски
  specifications: {
    'Тип товара': 'Краска',
    'Бренд': 'Tikkurila',
    'Артикул': 'A9adaefal',
    'Производство': 'Россия',
    'Фасовка': '9л',
    'Основа': 'Алкидная',
    'Укрывистость': '7-12 м²/л',
    'Класс износостойкости': '2',
    'Степень глянца': 'Полуглянцевая',
    'Расход': '1 л на 7-12 м² (в 1 слой)',
    'Время высыхания': '24 часа',
    'Разбавитель': 'Уайт-спирит',
    'Температура нанесения': 'От +5°C до +30°C',
    'Срок службы': 'До 10 лет',
    'Назначение': 'Для внутренних работ'
  },
  fullDescription: `
    <p>Tikkurila Euro Power 7 – надежная защита и стильный блеск.</p>
    <p>Алкидная полуглянцевая краска Tikkurila Euro Power 7 создает прочное, устойчивое к износу покрытие для внутренних поверхностей. Благодаря высокой укрывистости (7-12 м²/л) и хорошим декоративным свойствам, краска обеспечивает ровное и долговечное покрытие с приятным полуглянцевым блеском.</p>
    <p>Краска устойчива к механическим нагрузкам и частому мытью (4 часа до сухости) и устойчива к бытовым моющим средствам. Благодаря этим свойствам, она идеально подходит для кухонь, ванных комнат и помещений с высокой проходимостью.</p>
    <p>Доступная в 20 000+ оттенках по системе Tikkurila, краска позволяет воплотить любые дизайнерские задумки. Формула 0-9-9 подходит как для больших работ, так и для мелких проектов.</p>
  `
});

// Get category information
const categoryId = computed(() => product.value.categoryId);
const category = computed(() => navigationStore.getCategoryById(categoryId.value));
const categoryName = computed(() => category.value?.name || 'Категория');
const categoryUrl = computed(() => category.value?.url || '/');

// Mock similar products
const similarProducts = [
  {
    id: 2,
    title: 'TIKKURILA EURO POWER 7',
    description: '50л. Очень вкусная краска, европейский стандарт, водная основа, финское сырье',
    price: 8999,
    oldPrice: 12999,
    image: '/images/products/paint2.svg',
    discount: true,
    categoryId: 6 // Краски
  },
  {
    id: 3,
    title: 'TIKKURILA EURO POWER 7',
    description: '50л. Очень вкусная краска, европейский стандарт, водная основа, финское сырье',
    price: 7999,
    oldPrice: null,
    image: '/images/products/paint3.svg',
    discount: false,
    categoryId: 6 // Краски
  },
  {
    id: 4,
    title: 'TIKKURILA EURO POWER 7',
    description: '50л. Очень вкусная краска, европейский стандарт, водная основа, финское сырье',
    price: 9999,
    oldPrice: null,
    image: '/images/products/paint4.svg',
    discount: false,
    categoryId: 6 // Краски
  },
  {
    id: 5,
    title: 'TIKKURILA EURO POWER 7',
    description: '50л. Очень вкусная краска, европейский стандарт, водная основа, финское сырье',
    price: 5999,
    oldPrice: 7999,
    image: '/images/products/paint5.svg',
    discount: true,
    categoryId: 6 // Краски
  }
];

// Format price
const formatPrice = (price) => {
  return new Intl.NumberFormat('ru-RU').format(price);
};

// Page title and meta
useHead({
  title: `${product.value.title} - ВИЗИТ`,
  meta: [
    { name: 'description', content: `${product.value.title} - купить в магазине ВИЗИТ` }
  ]
});
</script>

<style lang="sass">
@import '@color'
@import '@mixin'
@import '@global'

.product-page
  padding-bottom: 60px

.breadcrumbs
  display: flex
  align-items: center
  flex-wrap: wrap
  margin-bottom: 20px

.breadcrumbs__link
  color: $text-secondary
  text-decoration: none
  font-size: 14px
  transition: color 0.3s ease
  
  &:hover
    color: $primary

.breadcrumbs__separator
  margin: 0 10px
  color: $text-secondary
  font-size: 14px

.breadcrumbs__current
  color: $text-primary
  font-size: 14px
  font-weight: 500

.product-info
  background-color: $white
  border-radius: $radius
  padding: 30px
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05)
  margin-bottom: 40px

.product-gallery
  position: relative

.product-gallery__main
  width: 100%
  height: 400px
  border-radius: $radius
  overflow: hidden
  margin-bottom: 15px

.product-gallery__image
  width: 100%
  height: 100%
  object-fit: contain

.product-gallery__thumbs
  display: flex
  gap: 10px

.product-gallery__thumb
  width: 80px
  height: 80px
  border-radius: $radius
  overflow: hidden
  cursor: pointer
  border: 2px solid transparent
  transition: all 0.3s ease
  
  img
    width: 100%
    height: 100%
    object-fit: cover
  
  &--active
    border-color: $primary

.product-details
  height: 100%
  display: flex
  flex-direction: column

.product-details__title
  margin: 0 0 20px
  color: $text-primary

.product-details__meta
  margin-bottom: 20px
  padding-bottom: 20px
  border-bottom: 1px solid $border-light

.product-details__meta-item
  display: flex
  margin-bottom: 10px
  
  &:last-child
    margin-bottom: 0

.product-details__meta-label
  width: 120px
  font-weight: 500
  color: $text-secondary

.product-details__meta-value
  color: $text-primary

.product-details__price-block
  display: flex
  align-items: center
  margin-bottom: 20px

.product-details__price
  font-size: 28px
  font-weight: 700
  color: $text-primary
  margin: 0

.product-details__old-price
  font-size: 18px
  text-decoration: line-through
  color: $text-secondary
  margin: 0 0 0 15px

.product-details__description
  margin-bottom: 30px

.product-details__subtitle
  font-size: 18px
  font-weight: 600
  margin: 0 0 15px
  color: $text-primary

.product-details__specs
  border-radius: $radius
  overflow: hidden
  border: 1px solid $border-light

.product-details__spec-row
  display: flex
  border-bottom: 1px solid $border-light
  
  &:last-child
    border-bottom: none

.product-details__spec-name
  width: 50%
  padding: 10px 15px
  background-color: $bg-light
  font-size: 14px
  color: $text-secondary

.product-details__spec-value
  width: 50%
  padding: 10px 15px
  font-size: 14px
  color: $text-primary

.product-details__actions
  margin-top: auto

.product-description
  background-color: $white
  border-radius: $radius
  padding: 30px
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05)
  margin-bottom: 40px

.product-description__title
  margin: 0 0 20px
  color: $text-primary

.product-description__content
  color: $text-primary
  
  p
    margin-bottom: 15px
    
    &:last-child
      margin-bottom: 0

.similar-products
  margin-bottom: 40px

.similar-products__title
  margin: 0 0 20px
  color: $text-primary

@include tablet
  .product-gallery__main
    height: 350px
  
  .product-details__price
    font-size: 24px
  
  .product-details__old-price
    font-size: 16px

@include mobile
  .product-info
    padding: 20px
  
  .product-gallery__main
    height: 300px
  
  .product-gallery__thumb
    width: 60px
    height: 60px
  
  .product-details__title
    font-size: 20px
    margin-bottom: 15px
  
  .product-details__meta-label
    width: 100px
  
  .product-details__price
    font-size: 22px
  
  .product-details__old-price
    font-size: 14px
  
  .product-description
    padding: 20px
</style>
