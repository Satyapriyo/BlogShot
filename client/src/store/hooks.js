import { useAuthStore, usePostStore, useCategoryStore, useBookmarkStore } from './index';

/**
 * Custom hook to handle login with both auth and data initialization
 */
export const useLogin = () => {
  const { loginSuccess } = useAuthStore();
  const { fetchCategories } = useCategoryStore();

  return async (user, token) => {
    loginSuccess(user, token);
    // Pre-fetch categories on login
    await fetchCategories();
  };
};

/**
 * Custom hook to handle logout and clear caches
 */
export const useLogout = () => {
  const { logout } = useAuthStore();
  const { clearPosts } = usePostStore();
  const { clearBookmarks } = useBookmarkStore();

  return () => {
    logout();
    clearPosts();
    clearBookmarks();
  };
};

/**
 * Custom hook for fetching initial app data
 */
export const useInitializeApp = () => {
  const { fetchCategories } = useCategoryStore();
  const { fetchPosts } = usePostStore();

  return async () => {
    try {
      await Promise.all([fetchCategories(), fetchPosts()]);
    } catch (err) {
      console.error('Error initializing app:', err);
    }
  };
};

/**
 * Custom hook for search operations with caching
 */
export const useSearch = () => {
  const { searchPosts } = usePostStore();

  return {
    searchPosts: (query) => searchPosts(query),
  };
};

/**
 * Custom hook for bookmark operations
 */
export const useBookmarkActions = () => {
  const { addBookmark, removeBookmark, isPostBookmarked } = useBookmarkStore();
  const { likePost, unlikePost } = usePostStore();

  return {
    toggleBookmark: async (postId, bookmarkId, userId) => {
      if (isPostBookmarked(postId)) {
        await removeBookmark(bookmarkId, postId);
      } else {
        await addBookmark(postId, userId);
      }
    },
    isBookmarked: (postId) => isPostBookmarked(postId),
    likePost,
    unlikePost,
  };
};
