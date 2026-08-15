import { create } from 'zustand';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

export const useBookmarkStore = create((set, get) => ({
  // State
  bookmarks: [],
  bookmarkedPostIds: new Set(), // For O(1) lookup
  loading: false,
  error: null,

  // Actions
  fetchBookmarks: async (userId) => {
    set({ loading: true, error: null });
    try {
      const response = await axios.get(`${API_URL}/bookmarks/user/${userId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (response.data.success && Array.isArray(response.data.data)) {
        const bookmarks = response.data.data;
        const postIds = new Set(bookmarks.map((b) => (b.postId?._id || b.postId)));

        set({
          bookmarks,
          bookmarkedPostIds: postIds,
          loading: false,
        });
      }
    } catch (err) {
      console.error('Error fetching bookmarks:', err);
      set({
        error: err.message || 'Failed to fetch bookmarks',
        loading: false,
      });
    }
  },

  addBookmark: async (postId, userId) => {
    try {
      const response = await axios.post(
        `${API_URL}/bookmarks`,
        { postId },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );

      if (response.data.success) {
        set((state) => ({
          bookmarks: [...state.bookmarks, response.data.data],
          bookmarkedPostIds: new Set([...state.bookmarkedPostIds, postId]),
        }));
        return response.data.data;
      }
    } catch (err) {
      console.error('Error adding bookmark:', err);
      set({
        error: err.message || 'Failed to add bookmark',
      });
    }
  },

  removeBookmark: async (bookmarkId, postId) => {
    try {
      const response = await axios.delete(`${API_URL}/bookmarks/${bookmarkId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (response.data.success) {
        set((state) => ({
          bookmarks: state.bookmarks.filter((b) => b._id !== bookmarkId),
          bookmarkedPostIds: new Set(
            Array.from(state.bookmarkedPostIds).filter((id) => id !== postId)
          ),
        }));
      }
    } catch (err) {
      console.error('Error removing bookmark:', err);
      set({
        error: err.message || 'Failed to remove bookmark',
      });
    }
  },

  isPostBookmarked: (postId) => {
    return get().bookmarkedPostIds.has(postId);
  },

  clearBookmarks: () =>
    set({
      bookmarks: [],
      bookmarkedPostIds: new Set(),
    }),
}));
