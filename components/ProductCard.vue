<template>
  <article 
    class="product-card" 
    @click="navigateTo(`/product/${product.id}`)" 
    :class="cardTypeClass" 
    :style="{ backgroundColor: categoryColor }"
  >
    <div class="product-card__image-wrapper">
      <img :src="product.image" :alt="product.title" class="product-card__image">
      <div class="product-card__brand" v-if="product.brand">
        <img :src="product.brand" :alt="product.title" class="product-card__brand-logo">
      </div>
    </div>
    <div class="product-card__content">
      <h3 class="product-card__title">{{ product.title }}</h3>
      <p class="product-card__description">{{ product.description }}</p>
      <div class="product-card__footer">
        <div class="product-card__price-block">
          <p class="product-card__price"    
        >
          {{ formatPrice(product.price) }} ₽
        </p>
        </div>
        <NuxtLink :to="`/product/${product.id}`" :style="{ color: categoryColor }" class="product-card__btn">Подробнее</NuxtLink>
      </div>
    </div>
  </article>
</template>

<script setup>
import { useNavigationStore } from '../stores/navigation';

const props = defineProps({
  product: {
    type: Object,
    required: true
  },
  categoryName: {
    type: String,
    default: null
  }
});

const navigationStore = useNavigationStore();

const categoryColor = computed(() => {
  const categoryName = props.product.category || props.categoryName;
  if (categoryName) {
    const category = navigationStore.getCategoryByName(categoryName);
    return category ? category.color : '#5e7a8a';
  }
  return '#5e7a8a';
});

const cardTypeClass = computed(() => {
  const categoryName = props.product.category || props.categoryName;
  switch (categoryName) {
    case 'Обои': return 'product-card--wallpaper';
    case 'Ванны': return 'product-card--bathroom';
    case 'Сантехника': return 'product-card--plumbing';
    case 'Электрика': return 'product-card--electrical';
    case 'Крепёж': return 'product-card--fasteners';
    case 'Краски': return 'product-card--paint';
    default: return '';
  }
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
  transition: all 0.3s ease
  color: $white
  height: 100%
  position: relative
  padding: 15px

.product-card__image-wrapper
  position: relative
  width: 100%
  height: 242px
  background-color: $white
  border-radius: $radius
  overflow: hidden
  margin-bottom: 10px
  display: flex
  justify-content: center
  align-items: center

.product-card__image
  width: 80%
  height: 80%
  object-fit: contain

.product-card__brand
  position: absolute
  bottom: -3px
  right: 0px
  max-width: 105px
  height: 30px
  border-radius: 15px 0 15px 0
  overflow: hidden
  display: flex
  justify-content: center
  align-items: center

.product-card__brand-logo
  width: 100%
  height: 100%
  object-fit: contain

.product-card__content
  padding: 0 5px
  display: flex
  flex-direction: column
  gap: 10px
  flex-grow: 1

.product-card__title
  font-size: 20px
  font-weight: 600
  color: $white
  line-height: 1.2
  flex-grow: 1

.product-card__description
  max-height: 65px
  font-size: 16px
  color: rgba(255, 255, 255, 0.8)
  flex-grow: 1
  line-height: 1.3
  display: -webkit-box;
  -webkit-line-clamp: 3; /* Максимум 3 строки */
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;

.product-card__footer
  display: flex
  justify-content: space-between
  align-items: center
  margin-top: auto

.product-card__price-block
  display: flex
  flex-direction: column
  align-items: flex-start

.product-card__price
  font-size: 34px
  font-weight: 700
  margin: 0
  color: $white
  line-height: 1.2


.product-card__btn
  display: inline-block
  padding: 8px 15px
  background-color: rgba(255, 255, 255, 0.9)
  color: $black
  border-radius: $radius
  text-decoration: none
  font-weight: 700
  font-size: 18px
  text-align: center
  transition: all 0.3s ease
  white-space: nowrap
  
  &:hover
    background-color: $white

@include hover
  .product-card:hover
    transform: translateY(-3px)


</style>
