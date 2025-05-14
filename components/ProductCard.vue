<template>
  <NuxtLink :to="`/product/${product.id}`" class="product-card" :style="{ borderColor: categoryColor }">
    <div class="product-card__image-wrapper">
      <img :src="product.image" :alt="product.title" class="product-card__image">
      <div v-if="product.discount" class="product-card__discount" :style="{ backgroundColor: categoryColor }">
        Скидка
      </div>
    </div>
    <div class="product-card__content">
      <h3 class="product-card__title">{{ product.title }}</h3>
      <p class="product-card__description">{{ product.description }}</p>
      <div class="product-card__price-block">
        <p class="product-card__price">{{ formatPrice(product.price) }} ₽</p>
        <p v-if="product.oldPrice" class="product-card__old-price">{{ formatPrice(product.oldPrice) }} ₽</p>
      </div>
      <button class="btn btn--outline product-card__btn">Подробнее</button>
    </div>
  </NuxtLink>
</template>

<script setup>
import { useNavigationStore } from '../stores/navigation';

const props = defineProps({
  product: {
    type: Object,
    required: true
  },
  categoryId: {
    type: Number,
    default: null
  }
});

const navigationStore = useNavigationStore();

const categoryColor = computed(() => {
  if (props.categoryId) {
    const category = navigationStore.getCategoryById(props.categoryId);
    return category ? category.color : '#5e7a8a';
  }
  return '#5e7a8a';
});

const formatPrice = (price) => {
  return new Intl.NumberFormat('ru-RU').format(price);
};
</script>

<style lang="sass">
@import '@color'
@import '@mixin'
@import '@global'

.product-card
  display: flex
  flex-direction: column
  border-radius: $radius
  overflow: hidden
  background-color: $white
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05)
  transition: all 0.3s ease
  text-decoration: none
  color: $text-primary
  height: 100%
  border: 2px solid transparent

.product-card__image-wrapper
  position: relative
  width: 100%
  height: 200px
  overflow: hidden

.product-card__image
  width: 100%
  height: 100%
  object-fit: cover
  transition: transform 0.5s ease

.product-card__discount
  position: absolute
  top: 10px
  right: 10px
  padding: 5px 10px
  color: $white
  font-size: 12px
  font-weight: 500
  border-radius: 4px

.product-card__content
  padding: 15px
  display: flex
  flex-direction: column
  flex-grow: 1

.product-card__title
  font-size: 18px
  font-weight: 600
  margin: 0 0 10px
  color: $text-primary

.product-card__description
  font-size: 14px
  color: $text-secondary
  margin: 0 0 15px
  flex-grow: 1

.product-card__price-block
  display: flex
  align-items: center
  margin-bottom: 15px

.product-card__price
  font-size: 18px
  font-weight: 700
  margin: 0
  color: $text-primary

.product-card__old-price
  font-size: 14px
  text-decoration: line-through
  color: $text-secondary
  margin: 0 0 0 10px

.product-card__btn
  width: 100%
  margin-top: auto

@include hover
  .product-card:hover
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1)
    transform: translateY(-3px)
    
    .product-card__image
      transform: scale(1.05)

@include tablet
  .product-card__image-wrapper
    height: 180px
  
  .product-card__title
    font-size: 16px
  
  .product-card__description
    font-size: 13px
  
  .product-card__price
    font-size: 16px

@include mobile
  .product-card__image-wrapper
    height: 160px
  
  .product-card__content
    padding: 12px
  
  .product-card__title
    font-size: 15px
    margin-bottom: 8px
  
  .product-card__description
    font-size: 12px
    margin-bottom: 10px
  
  .product-card__price
    font-size: 15px
</style>
