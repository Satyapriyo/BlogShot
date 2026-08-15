import { create } from 'zustand';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

export const usePostStore = create((set, get) => ({
  // State
  posts: [],
  allPosts: [], // Cache all posts fetched
  selectedPost: null,
  pagination: null,
  loading: false,
  error: null,
  filters: {
    search: '',
    sort: 'newest',
    category: '',
    user: '',
    page: 1,
    limit: 10,
  },

  // Actions
  fetchPosts: async (filters = {}) => {
    set({ loading: true, error: null });
    try {
      const currentFilters = get().filters;
      const mergedFilters = { ...currentFilters, ...filters };

      let queryString = `page=${mergedFilters.page}&limit=${mergedFilters.limit}`;
      if (mergedFilters.search) queryString += `&search=${mergedFilters.search}`;
      if (mergedFilters.sort) queryString += `&sort=${mergedFilters.sort}`;
      if (mergedFilters.category) queryString += `&cat=${mergedFilters.category}`;
      if (mergedFilters.user) queryString += `&user=${mergedFilters.user}`;

      const response = await axios.get(`${API_URL}/post?${queryString}`);

      if (response.data.success && response.data.data) {
        set({
          posts: response.data.data.posts || [],
          pagination: response.data.data.pagination || null,
          filters: mergedFilters,
          loading: false,
        });

        // Cache all posts for instant access
        set((state) => ({
          allPosts: [...new Map([...state.allPosts, ...response.data.data.posts].map((p) => [p._id, p])).values()],
        }));
      }
    } catch (err) {
      console.error('Error fetching posts:', err);
      set({
        error: err.message || 'Failed to fetch posts',
        loading: false,
      });
    }
  },

  setSelectedPost: (post) =>
    set({
      selectedPost: post,
    }),

  getPostById: (postId) => {
    const { allPosts } = get();
    return allPosts.find((p) => p._id === postId);
  },

  addPost: (post) =>
    set((state) => ({
      posts: [post, ...state.posts],
      allPosts: [post, ...state.allPosts],
    })),

  updatePost: (postId, updatedData) =>
    set((state) => ({
      posts: state.posts.map((p) => (p._id === postId ? { ...p, ...updatedData } : p)),
      allPosts: state.allPosts.map((p) => (p._id === postId ? { ...p, ...updatedData } : p)),
    })),

  deletePost: (postId) =>
    set((state) => ({
      posts: state.posts.filter((p) => p._id !== postId),
      allPosts: state.allPosts.filter((p) => p._id !== postId),
    })),

  setFilters: (newFilters) =>
    set((state) => ({
      filters: { ...state.filters, ...newFilters },
    })),

  clearPosts: () =>
    set({
      posts: [],
      selectedPost: null,
      pagination: null,
    }),

  searchPosts: async (query) => {
    await get().fetchPosts({ search: query, page: 1 });
  },

  sortPosts: async (sortBy) => {
    await get().fetchPosts({ sort: sortBy, page: 1 });
  },

  filterByCategory: async (category) => {
    await get().fetchPosts({ category, page: 1 });
  },

  likePost: (postId) => {
    const post = get().getPostById(postId);
    if (post) {
      const updatedPost = {
        ...post,
        likes: post.likes ? post.likes + 1 : 1,
      };
      get().updatePost(postId, updatedPost);
    }
  },

  unlikePost: (postId) => {
    const post = get().getPostById(postId);
    if (post && post.likes > 0) {
      const updatedPost = {
        ...post,
        likes: post.likes - 1,
      };
      get().updatePost(postId, updatedPost);
    }
  },
}));
