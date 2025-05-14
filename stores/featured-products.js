import { defineStore } from 'pinia';
import featuredProductsData from '@/data/featured-products.json';

export const useFeaturedProductsStore = defineStore('featuredProducts', {
  state: () => ({
    featuredProductsList: featuredProductsData.featuredProducts
  }),
  getters: {
    getFeaturedProducts: (state) => state.featuredProductsList
  }
});
