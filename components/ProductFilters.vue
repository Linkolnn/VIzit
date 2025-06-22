<template>
  <div class="product-filters">
    <!-- Сортировка -->
    <div class="filter-group">
      <div class="filter-header" @click="toggleFilter('sort')">
        <h3 class="filter-title">Сортировка: <span>{{ filtersStore.selectedSortLabel }}</span></h3>
        <div class="filter-toggle" :class="{ 'is-open': filtersStore.openFilters.sort }">
          <svg width="14" height="8" viewBox="0 0 14 8" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1 1L7 7L13 1" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
      </div>
      <div class="filter-dropdown" v-if="filtersStore.openFilters.sort">
        <div class="filter-options">
          <label v-for="option in filtersStore.sortOptions" :key="option.value" class="filter-option">
            <input 
              type="radio" 
              :value="option.value" 
              v-model="filtersStore.selectedSort" 
              @change="updateFilters"
            >
            <span class="radio-custom"></span>
            <span class="option-label">{{ option.label }}</span>
          </label>
        </div>
      </div>
    </div>

    <!-- Группировка -->
    <div class="filter-group">
      <div class="filter-header" @click="toggleFilter('group')">
        <h3 class="filter-title">Группировка: <span>{{ filtersStore.selectedGroupsLabel }}</span></h3>
        <div class="filter-toggle" :class="{ 'is-open': filtersStore.openFilters.group }">
          <svg width="14" height="8" viewBox="0 0 14 8" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1 1L7 7L13 1" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
      </div>
      <div class="filter-dropdown" v-if="filtersStore.openFilters.group">
        <div class="filter-options">
          <label v-for="option in filtersStore.currentGroupOptions" :key="option.value" class="filter-option">
            <input 
              type="checkbox" 
              :value="option.value" 
              v-model="filtersStore.selectedGroups" 
              @change="updateFilters"
            >
            <span class="checkbox-custom"></span>
            <span class="option-label">{{ option.label }}</span>
          </label>
        </div>
      </div>
    </div>

    <!-- Производитель -->
    <div class="filter-group">
      <div class="filter-header" @click="toggleFilter('manufacturer')">
        <h3 class="filter-title">Производитель: <span>{{ filtersStore.selectedManufacturersLabel }}</span></h3>
        <div class="filter-toggle" :class="{ 'is-open': filtersStore.openFilters.manufacturer }">
          <svg width="14" height="8" viewBox="0 0 14 8" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1 1L7 7L13 1" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
      </div>
      <div class="filter-dropdown" v-if="filtersStore.openFilters.manufacturer">
        <div class="filter-options">
          <label v-for="option in manufacturerOptions" :key="option.value" class="filter-option">
            <input 
              type="checkbox" 
              :value="option.value" 
              v-model="filtersStore.selectedManufacturers" 
              @change="updateFilters"
            >
            <span class="checkbox-custom"></span>
            <img v-if="option.logo" class="manufacturer-logo" :src="option.logo" :alt="option.label">
            <span class="option-label">
              {{ option.label }}
            </span>
          </label>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useFiltersStore } from '@/stores/filters';

const props = defineProps({
  category: {
    type: String,
    required: true
  },
  products: {
    type: Array,
    required: true
  }
});

const emit = defineEmits(['update:filters']);

// Используем хранилище Pinia для фильтров
const filtersStore = useFiltersStore();

// Получаем опции производителей из списка товаров
const manufacturerOptions = computed(() => {
  const manufacturersMap = new Map();
  
  props.products.forEach(product => {
    // Извлекаем имя производителя из спецификаций
    const manufacturerName = product.specifications?.Бренд || 'Unknown';
    // Получаем логотип бренда из свойства brand
    const logoPath = product.brand || '';
    
    // Добавляем производителя в Map, если его еще нет
    if (!manufacturersMap.has(manufacturerName)) {
      manufacturersMap.set(manufacturerName, {
        name: manufacturerName,
        logo: logoPath
      });
    }
  });
  
  // Преобразуем Map в массив опций
  return Array.from(manufacturersMap.values()).map(manufacturer => {
    return {
      value: manufacturer.name,
      label: manufacturer.name,
      logo: manufacturer.logo
    };
  });
});

// Методы
function toggleFilter(filterName) {
  filtersStore.toggleFilter(filterName);
}

function updateFilters() {
  emit('update:filters', filtersStore.activeFilters);
}

// Устанавливаем текущую категорию при изменении
watch(() => props.category, (newCategory) => {
  filtersStore.setCategory(newCategory);
  updateFilters();
}, { immediate: true });</script>

<style lang="sass" scoped>
.product-filters
  width: 100%
  display: flex
  flex-direction: row
  justify-content: flex-start
  flex-wrap: wrap
  gap: 15px

.filter-group
  position: relative
  
  &:last-child
    margin-right: 0

.filter-header
  display: flex
  justify-content: space-between
  align-items: center
  padding: 15px 10px
  cursor: pointer
  transition: background-color 0.2s ease
  white-space: nowrap
  
  &:hover
    opacity: 0.9

.filter-title
  font-size: 16px
  font-weight: 500
  margin: 0
  color: $black
  
  span
    color: #452CB7
    font-weight: 400
    margin-left: 5px

.filter-toggle
  transition: transform 0.3s ease
  margin-left: 8px
  
  &.is-open
    transform: rotate(180deg)

.filter-dropdown
  position: absolute
  top: 100%
  left: 0
  z-index: 100
  background-color: $black
  border-radius: 8px
  overflow: hidden
  min-width: 200px
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3)
  margin-top: 5px
  width: 200px
  max-width: 200px
  
  .filter-options
    padding: 10px
    max-height: 300px
    overflow-y: auto

.filter-option
  display: flex
  align-items: center
  margin-bottom: 12px
  cursor: pointer
  color: white
  
  &:last-child
    margin-bottom: 0
  
  input[type="radio"],
  input[type="checkbox"]
    position: absolute
    opacity: 0
    // cursor: pointer
    height: 0
    width: 0

.radio-custom,
.checkbox-custom
  position: relative
  display: inline-block
  width: 20px
  height: 20px
  min-width: 20px
  margin-right: 10px
  border: 2px solid #444
  background-color: #333
  transition: all 0.2s ease

.radio-custom
  border-radius: 50%
  
  &:after
    content: ""
    position: absolute
    display: none
    top: 4px
    left: 4px
    width: 8px
    height: 8px
    border-radius: 50%
    background: $white

.checkbox-custom
  border-radius: 4px
  
  &:after
    content: ""
    position: absolute
    display: none
    left: 6px
    top: 0px
    width: 5px
    height: 10px
    border: solid $white
    border-width: 0 2px 2px 0
    transform: rotate(45deg)

input[type="radio"]:checked ~ .radio-custom,
input[type="checkbox"]:checked ~ .checkbox-custom
  border-color: $white
  background-color: #222

input[type="radio"]:checked ~ .radio-custom:after,
input[type="checkbox"]:checked ~ .checkbox-custom:after
  display: block

.option-label
  font-size: 14px
  display: flex
  align-items: center
  color: white

.manufacturer-logo
  display: inline-block
  width: 50%
  height: 24px
  margin-right: 5px
  border-radius: 3px
  background-color: white
  
  img
    width: 100%
    height: 100%
    object-fit: contain

@include mobile
  .filter-group
    width: 100%
</style>
