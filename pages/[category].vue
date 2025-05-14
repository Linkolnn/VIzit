<template>
  <div class="category-page">
    <div class="container">
      <!-- Category Banner -->
      <Banner :media="categoryImage">
        <h1 class="category-page__title font-h1">{{ categoryName }}</h1>
        <p class="category-page__description font-text_medium">Широкий выбор товаров для вашего ремонта</p>
      </Banner>

      <!-- Filters Section -->
      <div class="category-page__filters" :style="{ backgroundColor: categoryColor }">
        <div class="filters">
          <div class="filters__group">
            <label class="filters__label">Сортировка:</label>
            <select v-model="sortBy" class="filters__select">
              <option value="price-asc">По цене (сначала дешевле)</option>
              <option value="price-desc">По цене (сначала дороже)</option>
              <option value="name-asc">По названию (А-Я)</option>
              <option value="name-desc">По названию (Я-А)</option>
            </select>
          </div>
          <div class="filters__group">
            <label class="filters__label">Группировка:</label>
            <select v-model="groupBy" class="filters__select">
              <option value="none">Без группировки</option>
              <option value="brand">По бренду</option>
              <option value="collection">По коллекции</option>
            </select>
          </div>
        </div>
      </div>

      <!-- Products Grid -->
      <div class="category-page__products">
        <div class="row">
          <div v-for="product in filteredProducts" :key="product.id" class="col col--25 col--tablet-50 col--mobile-100">
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

// State
const sortBy = ref('price-asc');
const groupBy = ref('none');

// Get category information
const category = computed(() => {
  const categoryPath = '/' + route.params.category;
  return navigationStore.getCategoryByUrl(categoryPath);
});

const categoryId = computed(() => category.value?.id || 0);
const categoryName = computed(() => category.value?.name || 'Категория');
const categoryColor = computed(() => category.value?.color || '#5e7a8a');
const categoryImage = computed(() => `/images/categories/${route.params.category}.svg`);

// Mock products data - in a real app, this would come from an API or Pinia store
const products = ref([
  {
    id: 1,
    title: 'TIKKURILA EURO POWER 7',
    description: '50л. Очень вкусная краска, европейский стандарт, водная основа, финское сырье',
    price: 9999,
    oldPrice: null,
    image: '/images/products/paint1.svg',
    discount: false,
    brand: 'TIKKURILA',
    collection: 'EURO'
  },
  {
    id: 2,
    title: 'TIKKURILA EURO POWER 7',
    description: '50л. Очень вкусная краска, европейский стандарт, водная основа, финское сырье',
    price: 8999,
    oldPrice: 12999,
    image: '/images/products/paint2.svg',
    discount: true,
    brand: 'TIKKURILA',
    collection: 'EURO'
  },
  {
    id: 3,
    title: 'TIKKURILA EURO POWER 7',
    description: '50л. Очень вкусная краска, европейский стандарт, водная основа, финское сырье',
    price: 7999,
    oldPrice: null,
    image: '/images/products/paint3.svg',
    discount: false,
    brand: 'TIKKURILA',
    collection: 'EURO'
  },
  {
    id: 4,
    title: 'TIKKURILA EURO POWER 7',
    description: '50л. Очень вкусная краска, европейский стандарт, водная основа, финское сырье',
    price: 6999,
    oldPrice: 9999,
    image: '/images/products/paint4.svg',
    discount: true,
    brand: 'TIKKURILA',
    collection: 'EURO'
  },
  {
    id: 5,
    title: 'TIKKURILA EURO POWER 7',
    description: '50л. Очень вкусная краска, европейский стандарт, водная основа, финское сырье',
    price: 5999,
    oldPrice: null,
    image: '/images/products/paint5.svg',
    discount: false,
    brand: 'TIKKURILA',
    collection: 'EURO'
  },
  {
    id: 6,
    title: 'TIKKURILA EURO POWER 7',
    description: '50л. Очень вкусная краска, европейский стандарт, водная основа, финское сырье',
    price: 4999,
    oldPrice: 7999,
    image: '/images/products/paint6.svg',
    discount: true,
    brand: 'TIKKURILA',
    collection: 'EURO'
  }
]);

// Filter and sort products
const filteredProducts = computed(() => {
  let result = [...products.value];
  
  // Apply sorting
  switch (sortBy.value) {
    case 'price-asc':
      result.sort((a, b) => a.price - b.price);
      break;
    case 'price-desc':
      result.sort((a, b) => b.price - a.price);
      break;
    case 'name-asc':
      result.sort((a, b) => a.title.localeCompare(b.title));
      break;
    case 'name-desc':
      result.sort((a, b) => b.title.localeCompare(a.title));
      break;
  }
  
  return result;
});

// Page title and meta
useHead({
  title: `${categoryName.value} - ВИЗИТ`,
  meta: [
    { name: 'description', content: `${categoryName.value} - широкий выбор товаров в магазине ВИЗИТ` }
  ]
});
</script>

<style lang="sass">
@import '@color'
@import '@mixin'
@import '@global'

.category-page__title
  color: $white
  margin: 0 0 10px
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3)

.category-page__description
  color: $white
  margin: 0
  max-width: 600px
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3)

.category-page__filters
  margin-bottom: 30px
  padding: 15px
  border-radius: $radius

.filters
  display: flex
  justify-content: flex-start
  gap: 20px

.filters__group
  display: flex
  align-items: center
  gap: 10px

.filters__label
  color: $white
  font-weight: 500
  font-size: 14px

.filters__select
  padding: 8px 12px
  border-radius: 5px
  border: none
  font-size: 14px
  background-color: $white
  cursor: pointer

.category-page__products
  margin-bottom: 40px

@include tablet
  .filters
    flex-wrap: wrap
    gap: 15px

@include mobile
  .category-page__filters
    margin-bottom: 20px
    padding: 12px
  
  .filters
    flex-direction: column
    gap: 10px
  
  .filters__group
    width: 100%
    justify-content: space-between
</style>
