<template>
  <div class="home">
    <div class="container">
      <!-- Hero Slider -->
      <Slider :slides="sliderData" />

      <!-- Promo Section -->
      <section class="section promo">
        <div class="promo__header">
          <div class="promo__title-wrapper">
            <h2 class="promo__title">начни ремонт с<span class="promo__title-accent">ВИЗИТ</span></h2>
          </div>
          <div class="promo__image-wrapper">
            <img src="/images/categories/studio.svg" alt="Студия подбора цвета" class="promo__image">
          </div>
        </div>
        <div class="promo__content">
          <p class="promo__text">Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus iure mollitia facilis, dolores dicta quisquam velit incidunt natus. Quo ea magnam voluptate odio libero itaque laudantium sed nulla incidunt vel?</p>
        </div>
      </section>

      <!-- Map Section -->
      <section class="section map-section">
        <div class="map-section__title-container">
          <h2 class="map-section__title">Наши магазины на карте</h2>
        </div>
        <YandexMap />
      </section>
    </div>
  </div>
</template>

<script setup>
import { useNavigationStore } from '@/stores/navigation';
import { useSlidesStore } from '@/stores/slides';
import { useFeaturedProductsStore } from '@/stores/featured-products';

const navigationStore = useNavigationStore();
const slidesStore = useSlidesStore();
const featuredProductsStore = useFeaturedProductsStore();

// Get data from stores
const sliderData = computed(() => slidesStore.getSlides);
const featuredProducts = computed(() => featuredProductsStore.getFeaturedProducts);

// Categories with images
const categories = computed(() => {
  return navigationStore.categoryList.map(category => ({
    ...category,
    image: `/images/categories/${category.url.replace('/', '')}.svg`,
    description: 'Широкий выбор товаров для вашего ремонта'
  }));
});
</script>

<style lang="sass">
@import '@color'
@import '@mixin'
@import '@global'

.promo__header
  display: flex
  align-items: center
  gap: 20px
  
  @include mobile
    flex-direction: column

.promo__title-wrapper
  display: flex
  flex: 1
  padding: 20px
  justify-content: center
  
  @include mobile
    padding: 20px 20px 0

.promo__title
  color: $black
  font-size: 32px 
  line-height: 0.9 
  font-weight: 900 

  @include mobile
    font-size: 20px

.promo__title-accent
  display: block
  text-transform: uppercase
  font-size: 96px 
  font-weight: 900 
  
  @include mobile
    font-size: 64px

.promo__image-wrapper
  flex: 2.5
  overflow: hidden
  
  @include mobile
    width: 100%

.promo__image
  width: 100%
  height: auto
  display: block
  object-fit: cover

.promo__content
  padding: 20px

.promo__text
  margin: 0
  font-size: 20px
  line-height: 1.6
  
  @include mobile
    font-size: 14px

.category-card
  display: block
  background-color: $white
  border-radius: $radius
  overflow: hidden
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05)
  margin-bottom: 30px
  transition: all 0.3s ease
  height: 100%
  border: 2px solid transparent

.category-card__image-wrapper
  width: 100%
  height: 200px
  overflow: hidden

.category-card__image
  width: 100%
  height: 100%
  object-fit: cover
  transition: transform 0.5s ease

.category-card__content
  padding: 20px

.category-card__title
  margin: 0 0 10px
  font-size: 20px
  font-weight: 600

.category-card__description
  margin: 0
  font-size: 14px
  color: $text-secondary

@include hover
  .category-card:hover
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1)
    transform: translateY(-3px)
    
    .category-card__image
      transform: scale(1.05)

.map-section
  position: relative
  margin-bottom: 20px

.map-section__title-container
  position: absolute
  top: 20px
  left: 20px
  z-index: 10
  background-color: $black
  padding: 10px 20px
  border-radius: $radius

.map-section__title
  color: $white
  margin: 0
  font-size: 24px
  font-weight: 700
  
  @include mobile
    font-size: 18px

@include tablet
  .promo__content
    padding: 20px
  
  .promo__title
    margin-bottom: 15px
  
  .promo__text
    margin-bottom: 20px
  
  .category-card__image-wrapper
    height: 180px
  
  .category-card__title
    font-size: 18px

@include mobile
  .promo__content
    padding: 15px
    order: 2
  
  .promo__image-wrapper
    order: 1
  
  .category-card__image-wrapper
    height: 160px
  
  .category-card__title
    font-size: 16px
</style>
