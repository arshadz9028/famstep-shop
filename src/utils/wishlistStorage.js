// Wishlist storage utility for managing localStorage operations
const WISHLIST_STORAGE_KEY = 'famstep_wishlist';

export const getWishlistItems = () => {
  try {
    if (typeof window === 'undefined') {
      return [];
    }
    const items = localStorage.getItem(WISHLIST_STORAGE_KEY);
    return items ? JSON.parse(items) : [];
  } catch (error) {
    console.error('Error reading wishlist from localStorage:', error);
    return [];
  }
};

export const saveWishlistItems = (items) => {
  try {
    if (typeof window === 'undefined') {
      return;
    }
    localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(items));
  } catch (error) {
    console.error('Error saving wishlist to localStorage:', error);
  }
};

export const addToWishlist = (product) => {
  try {
    if (typeof window === 'undefined') {
      return false;
    }
    const items = getWishlistItems();
    const existingItem = items.find((item) => item.id === product.id);

    if (!existingItem) {
      items.push({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        addedDate: new Date().toISOString(),
      });
    }

    saveWishlistItems(items);
    return !existingItem; // return true if newly added, false if already existed
  } catch (error) {
    console.error('Error adding item to wishlist:', error);
    return false;
  }
};

export const removeFromWishlist = (id) => {
  try {
    if (typeof window === 'undefined') {
      return;
    }
    const items = getWishlistItems();
    const filtered = items.filter((item) => item.id !== id);
    saveWishlistItems(filtered);
  } catch (error) {
    console.error('Error removing item from wishlist:', error);
  }
};

export const isInWishlist = (id) => {
  try {
    const items = getWishlistItems();
    return items.some((item) => item.id === id);
  } catch (error) {
    console.error('Error checking wishlist:', error);
    return false;
  }
};

export const clearWishlist = () => {
  try {
    if (typeof window === 'undefined') {
      return;
    }
    localStorage.removeItem(WISHLIST_STORAGE_KEY);
  } catch (error) {
    console.error('Error clearing wishlist:', error);
  }
};
