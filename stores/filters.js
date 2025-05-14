import { defineStore } from 'pinia';
import filtersData from '@/data/filters.json';

export const useFiltersStore = defineStore('filters', {
  state: () => ({
    // Опции фильтрации
    sortOptions: filtersData.sortOptions,
    groupOptions: filtersData.groupOptions,
    
    // Выбранные значения фильтров
    selectedSort: 'price-asc',
    selectedGroups: [],
    selectedManufacturers: [],
    
    // Состояние открытых фильтров
    openFilters: {
      sort: false,
      group: false,
      manufacturer: false
    },
    
    // Текущая категория
    currentCategory: ''
  }),
  
  getters: {
    // Получение опций группировки для текущей категории
    currentGroupOptions: (state) => {
      return state.groupOptions[state.currentCategory] || [];
    },
    
    // Вычисляемые свойства для отображения выбранных фильтров
    selectedSortLabel: (state) => {
      const option = state.sortOptions.find(opt => opt.value === state.selectedSort);
      return option ? option.label : '';
    },
    
    selectedGroupsLabel: (state) => {
      if (state.selectedGroups.length === 0) return 'Все';
      
      const groupOptions = state.groupOptions[state.currentCategory] || [];
      if (state.selectedGroups.length === groupOptions.length) return 'Все';
      
      return state.selectedGroups.map(value => {
        const option = groupOptions.find(opt => opt.value === value);
        return option ? option.label : '';
      }).join(', ');
    },
    
    selectedManufacturersLabel: (state) => {
      if (state.selectedManufacturers.length === 0) return 'Все';
      
      // Здесь мы не можем использовать manufacturerOptions напрямую,
      // так как они вычисляются динамически на основе продуктов
      // Поэтому возвращаем просто список выбранных производителей
      if (state.selectedManufacturers.length > 2) {
        return `Выбрано: ${state.selectedManufacturers.length}`;
      }
      
      return state.selectedManufacturers.join(', ');
    },
    
    // Получение активных фильтров для применения к продуктам
    activeFilters: (state) => {
      return {
        sort: state.selectedSort,
        groups: state.selectedGroups,
        manufacturers: state.selectedManufacturers
      };
    }
  },
  
  actions: {
    // Установка текущей категории
    setCategory(category) {
      this.currentCategory = category;
      this.selectedGroups = [];
      this.selectedManufacturers = [];
    },
    
    // Обновление выбранных фильтров
    updateFilters(filters) {
      if (filters.sort) this.selectedSort = filters.sort;
      if (filters.groups) this.selectedGroups = filters.groups;
      if (filters.manufacturers) this.selectedManufacturers = filters.manufacturers;
    },
    
    // Переключение состояния фильтра (открыт/закрыт)
    toggleFilter(filterName) {
      // Сохраняем текущее состояние фильтра, на который нажали
      const wasOpen = this.openFilters[filterName];
      
      // Закрываем все фильтры
      Object.keys(this.openFilters).forEach(key => {
        this.openFilters[key] = false;
      });
      
      // Если фильтр был закрыт, открываем его
      // Если фильтр был открыт, оставляем его закрытым
      if (!wasOpen) {
        this.openFilters[filterName] = true;
      }
    },
    
    // Сброс всех фильтров
    resetFilters() {
      this.selectedSort = 'price-asc';
      this.selectedGroups = [];
      this.selectedManufacturers = [];
      
      Object.keys(this.openFilters).forEach(key => {
        this.openFilters[key] = false;
      });
    }
  }
});
