// Cart storage utility for managing localStorage operations
const CART_STORAGE_KEY = 'famstep_cart';

export const getCartItems = () => {
  try {
    if (typeof window === 'undefined') {
      return [];
    }
    const items = localStorage.getItem(CART_STORAGE_KEY);
    return items ? JSON.parse(items) : [];
  } catch (error) {
    console.error('Error reading cart from localStorage:', error);
    return [];
  }
};

export const saveCartItems = (items) => {
  try {
    if (typeof window === 'undefined') {
      return;
    }
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
  } catch (error) {
    console.error('Error saving cart to localStorage:', error);
  }
};

export const addToCart = (product) => {
  try {
    if (typeof window === 'undefined') {
      return false;
    }
    const items = getCartItems();
    const existingItem = items.find(
      (item) =>
        item.id === product.id &&
        item.size === product.size &&
        item.color === product.color
    );

    if (existingItem) {
      existingItem.quantity += product.quantity;
    } else {
      items.push(product);
    }

    saveCartItems(items);
    return true;
  } catch (error) {
    console.error('Error adding item to cart:', error);
    return false;
  }
};

export const removeFromCart = (id) => {
  try {
    if (typeof window === 'undefined') {
      return;
    }
    const items = getCartItems();
    const filtered = items.filter((item) => item.id !== id);
    saveCartItems(filtered);
  } catch (error) {
    console.error('Error removing item from cart:', error);
  }
};

export const updateCartItem = (id, quantity) => {
  try {
    if (typeof window === 'undefined') {
      return;
    }
    const items = getCartItems();
    const item = items.find((item) => item.id === id);
    if (item) {
      if (quantity <= 0) {
        removeFromCart(id);
      } else {
        item.quantity = quantity;
        saveCartItems(items);
      }
    }
  } catch (error) {
    console.error('Error updating cart item:', error);
  }
};

export const clearCart = () => {
  try {
    if (typeof window === 'undefined') {
      return;
    }
    localStorage.removeItem(CART_STORAGE_KEY);
  } catch (error) {
    console.error('Error clearing cart:', error);
  }
};
