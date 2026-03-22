'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { FiTrash2, FiHeart, FiArrowLeft, FiShoppingCart } from 'react-icons/fi';
import styles from './index.module.css';
import { getWishlistItems, removeFromWishlist } from '@/utils/wishlistStorage';
import { addToCart } from '@/utils/cartStorage';
import { message } from 'antd';

function Wishlist() {
  const [wishlistItems, setWishlistItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load wishlist items from localStorage on mount
  useEffect(() => {
    setIsLoading(true);
    const items = getWishlistItems();
    setWishlistItems(items);
    setIsLoading(false);
  }, []);

  const handleRemoveItem = (id) => {
    removeFromWishlist(id);
    setWishlistItems(items => items.filter(item => item.id !== id));
    message.success('Item removed from wishlist');
  };

  const handleAddToCart = (item) => {
    const cartItem = {
      id: item.id,
      name: item.name,
      price: item.price,
      quantity: 1,
      size: 'M', // default size
      color: 'Default', // default color
      image: item.image,
    };

    const success = addToCart(cartItem);
    if (success) {
      message.success(`${item.name} added to cart!`);
    } else {
      message.error('Failed to add item to cart');
    }
  };

  if (isLoading) {
    return (
      <div className={styles.wishlistContainer}>
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '60vh',
          fontSize: '18px'
        }}>
          Loading your wishlist...
        </div>
      </div>
    );
  }

  if (wishlistItems.length === 0) {
    return (
      <div className={styles.wishlistContainer}>
        <div className={styles.emptyWishlist}>
          <div className={styles.emptyWishlistIcon}>
            <FiHeart />
          </div>
          <h2 className={styles.emptyWishlistTitle}>Your wishlist is empty</h2>
          <p className={styles.emptyWishlistSubtitle}>
            Looks like you haven&apos;t added any items to your wishlist yet.
          </p>
          <Link href="/" className={styles.continueShoppingButton}>
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.wishlistContainer}>
      <div className={styles.wishlistHeader}>
        <Link href="/" className={styles.backButton}>
          <FiArrowLeft />
          Continue Shopping
        </Link>
        <h1 className={styles.wishlistTitle}>My Wishlist</h1>
        <div className={styles.itemCount}>{wishlistItems.length} items</div>
      </div>

      <div className={styles.wishlistContent}>
        <div className={styles.wishlistGrid}>
          {wishlistItems.map(item => (
            <div key={item.id} className={styles.wishlistCard}>
              <div className={styles.cardImage}>
                <img 
                  src={item.image} 
                  alt={item.name}
                  className={styles.cardImg}
                />
                <button
                  onClick={() => handleRemoveItem(item.id)}
                  className={styles.removeWishlistButton}
                  title="Remove from wishlist"
                >
                  <FiHeart />
                </button>
              </div>

              <div className={styles.cardContent}>
                <Link href={`/product/${item.id}`} className={styles.cardTitle}>
                  {item.name}
                </Link>
                <div className={styles.cardPrice}>
                  ${item.price.toFixed(2)}
                </div>
                <div className={styles.cardFooter}>
                  <button
                    onClick={() => handleAddToCart(item)}
                    className={styles.addToCartButton}
                  >
                    <FiShoppingCart />
                    Add to Cart
                  </button>
                  <button
                    onClick={() => handleRemoveItem(item.id)}
                    className={styles.deleteButton}
                  >
                    <FiTrash2 />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className={styles.wishlistSidebar}>
          <div className={styles.summaryCard}>
            <h2 className={styles.summaryTitle}>Wishlist Summary</h2>
            
            <div className={styles.summaryInfo}>
              <div className={styles.summaryRow}>
                <span>Total Items</span>
                <span className={styles.summaryValue}>{wishlistItems.length}</span>
              </div>
              
              <div className={styles.summaryRow}>
                <span>Total Value</span>
                <span className={styles.summaryValue}>
                  ${wishlistItems.reduce((total, item) => total + item.price, 0).toFixed(2)}
                </span>
              </div>
            </div>

            <Link href="/" className={styles.continueButton}>
              Continue Shopping
            </Link>

            <div className={styles.tip}>
              <p>💡 <strong>Tip:</strong> Save items to your wishlist and we&apos;ll notify you when they go on sale!</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Wishlist;