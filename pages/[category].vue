<template>
  <div class="category-page">
    <div class="container">
      <!-- Category Banner -->
      <Banner :media="categoryImage">
        <h1 class="category-page__title font-h1">{{ categoryName }}</h1>
        <p class="category-page__description font-text_medium">Широкий выбор товаров для вашего ремонта</p>
      </Banner>

      <!-- Filters Section -->
      <div class="category-page__filters">
        <ProductFilters 
          :category="categoryName" 
          :products="categoryProducts" 
          @update:filters="handleFiltersUpdate"
        />
      </div>

      <!-- Products Grid -->
      <div class="category-page__products">
        <div class="products-grid">
          <ProductCard v-for="product in filteredProducts" :key="product.id" :product="product" :category-name="categoryName" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useProductsStore } from '@/stores/products';
import { useNavigationStore } from '@/stores/navigation';
import { useFiltersStore } from '@/stores/filters';

const route = useRoute();
const navigationStore = useNavigationStore();
const productsStore = useProductsStore();
const filtersStore = useFiltersStore();

// State
const activeFilters = ref(filtersStore.activeFilters);

// Computed
const categoryUrl = computed(() => route.params.category);
const category = computed(() => navigationStore.getCategoryByUrl(`/${categoryUrl.value}`));
const categoryId = computed(() => category.value?.id || null);
const categoryName = computed(() => category.value?.name || 'Категория');
const categoryColor = computed(() => category.value?.color || '#5e7a8a');
const categoryImage = computed(() => `/images/categories/${categoryUrl.value}.jpg`);

// Get products from the store
const categoryProducts = computed(() => {
  if (categoryName.value) {
    return productsStore.getProductsByCategory(categoryName.value);
  }
  return [];
});

// Фильтрация товаров
const filteredProducts = computed(() => {
  let result = [...categoryProducts.value];
  
  // Применяем сортировку
  switch (activeFilters.value.sort) {
    case 'price-asc':
      result.sort((a, b) => a.price - b.price);
      break;
    case 'price-desc':
      result.sort((a, b) => b.price - a.price);
      break;
    case 'popular':
      // Здесь можно добавить логику сортировки по популярности
      // Пока просто оставим текущий порядок
      break;
    case 'new':
      // Здесь можно добавить логику сортировки по новизне
      // Пока просто используем сортировку по цене
      result.sort((a, b) => a.price - b.price);
      break;
  }
  
  // Применяем фильтрацию по группам
  if (activeFilters.value.groups.length > 0) {
    result = result.filter(product => {
      // Определяем группу товара в зависимости от категории
      let productGroup = '';
      
      switch (categoryName.value) {
        case 'Краски':
          // Определяем тип краски по спецификациям
          if (product.specifications) {
            if (product.specifications['Тип товара']?.toLowerCase().includes('эмаль')) {
              productGroup = 'enamel';
            } else if (product.specifications['Тип товара']?.toLowerCase().includes('лак')) {
              productGroup = 'varnish';
            } else if (product.specifications['Основа']?.toLowerCase().includes('водн')) {
              productGroup = 'water-emulsion';
            }
          }
          break;
        case 'Обои':
          // Определяем тип обоев по спецификациям
          if (product.specifications) {
            if (product.specifications['Материал']?.toLowerCase().includes('винил')) {
              productGroup = 'vinyl';
            } else if (product.specifications['Материал']?.toLowerCase().includes('флизелин')) {
              productGroup = 'non-woven';
            } else if (product.specifications['Материал']?.toLowerCase().includes('бумаг')) {
              productGroup = 'paper';
            }
          }
          break;
        // Аналогично для других категорий
      }
      
      return activeFilters.value.groups.includes(productGroup);
    });
  }
  
  // Применяем фильтрацию по производителям
  if (activeFilters.value.manufacturers.length > 0) {
    result = result.filter(product => {
      const manufacturer = product.specifications?.Бренд || 
                          product.brand?.split('/').pop().replace('.jpg', '') || 
                          'Unknown';
      return activeFilters.value.manufacturers.includes(manufacturer);
    });
  }
  
  return result;
});

// Обработчик обновления фильтров
function handleFiltersUpdate(filters) {
  filtersStore.updateFilters(filters);
  activeFilters.value = filtersStore.activeFilters;
}

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

.category-page
  padding: 30px 0

.category-page__title
  margin: 0 0 10px
  color: $white

.category-page__description
  margin: 0
  color: $white
  opacity: 0.9
  max-width: 600px

.category-page__filters
  margin-bottom: 30px
  border-radius: 8px
  overflow: visible

.products-grid
  display: grid
  grid-template-columns: repeat(4, 1fr)
  gap: 20px
  
  @include tablet
    grid-template-columns: repeat(2, 1fr)
  
  @include mobile
    grid-template-columns: 1fr

@include tablet
  .filters
    flex-wrap: wrap
    gap: 15px

@include mobile
  .category-page__filters
    margin-bottom: 20px
  
  .filters
    flex-direction: column
    gap: 10px
  
  .filters__group
    width: 100%
    justify-content: space-between
</style>
