import { create } from 'zustand';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

export const useCategoryStore = create((set, get) => ({
  // State
  categories: [],
  loading: false,
  error: null,

  // Actions
  fetchCategories: async () => {
    // Return cached if already fetched
    if (get().categories.length > 0) return;

    set({ loading: true, error: null });
    try {
      const response = await axios.get(`${API_URL}/catagories`);
      if (Array.isArray(response.data)) {
        set({ categories: response.data, loading: false });
      } else if (response.data.data) {
        set({ categories: response.data.data, loading: false });
      }
    } catch (err) {
      console.error('Error fetching categories:', err);
      set({
        error: err.message || 'Failed to fetch categories',
        loading: false,
      });
    }
  },

  addCategory: (category) =>
    set((state) => ({
      categories: [...state.categories, category],
    })),

  getCategoryById: (categoryId) => {
    return get().categories.find((c) => c._id === categoryId);
  },

  getCategoryByName: (name) => {
    return get().categories.find((c) => c.name.toLowerCase() === name.toLowerCase());
  },

  clearCategories: () =>
    set({
      categories: [],
    }),
}));
