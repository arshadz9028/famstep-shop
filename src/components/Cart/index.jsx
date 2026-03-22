'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { FiPlus, FiMinus, FiTrash2, FiShoppingBag, FiArrowLeft } from 'react-icons/fi';
import styles from './index.module.css';
import { getCartItems, saveCartItems } from '@/utils/cartStorage';

function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load cart items from localStorage on mount
  useEffect(() => {
    setIsLoading(true);
    const items = getCartItems();
    setCartItems(items);
    setIsLoading(false);
  }, []);

  // Sync cart items to localStorage whenever they change
  useEffect(() => {
    if (!isLoading) {
      saveCartItems(cartItems);
    }
  }, [cartItems, isLoading]);

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity <= 0) {
      removeItem(id);
      return;
    }
    setCartItems(items =>
      items.map(item =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeItem = (id) => {
    setCartItems(items => items.filter(item => item.id !== id));
  };

  const getSubtotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getTax = () => {
    return getSubtotal() * 0.08; // 8% tax
  };

  const getShipping = () => {
    return getSubtotal() > 100 ? 0 : 9.99;
  };

  const getTotal = () => {
    return getSubtotal() + getTax() + getShipping();
  };

  if (isLoading) {
    return (
      <div className={styles.cartContainer}>
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '60vh',
          fontSize: '18px'
        }}>
          Loading your cart...
        </div>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className={styles.cartContainer}>
        <div className={styles.emptyCart}>
          <div className={styles.emptyCartIcon}>
            <FiShoppingBag />
          </div>
          <h2 className={styles.emptyCartTitle}>Your cart is empty</h2>
          <p className={styles.emptyCartSubtitle}>
            Looks like you haven&apos;t added any items to your cart yet.
          </p>
          <Link href="/" className={styles.continueShoppingButton}>
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.cartContainer}>
      <div className={styles.cartHeader}>
        <Link href="/" className={styles.backButton}>
          <FiArrowLeft />
          Continue Shopping
        </Link>
        <h1 className={styles.cartTitle}>Shopping Cart</h1>
        <div className={styles.itemCount}>{cartItems.length} items</div>
      </div>

      <div className={styles.cartContent}>
        <div className={styles.cartItems}>
          {cartItems.map(item => (
            <div key={item.id} className={styles.cartItem}>
              <div className={styles.itemImage}>
                <img 
                  src={item.image} 
                  alt={item.name}
                  className={styles.itemImg}
                />
              </div>

              <div className={styles.itemDetails}>
                <h3 className={styles.itemName}>{item.name}</h3>
                <div className={styles.itemSpecs}>
                  <span className={styles.spec}>Size: {item.size}</span>
                  <span className={styles.spec}>Color: {item.color}</span>
                </div>
                <div className={styles.itemPrice}>${item.price}</div>
              </div>

              <div className={styles.itemQuantity}>
                <button
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  className={styles.quantityButton}
                >
                  <FiMinus />
                </button>
                <span className={styles.quantity}>{item.quantity}</span>
                <button
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  className={styles.quantityButton}
                >
                  <FiPlus />
                </button>
              </div>

              <div className={styles.itemTotal}>
                ${(item.price * item.quantity).toFixed(2)}
              </div>

              <button
                onClick={() => removeItem(item.id)}
                className={styles.removeButton}
              >
                <FiTrash2 />
              </button>
            </div>
          ))}
        </div>

        <div className={styles.cartSummary}>
          <h2 className={styles.summaryTitle}>Order Summary</h2>
          
          <div className={styles.summaryRow}>
            <span>Subtotal</span>
            <span>${getSubtotal().toFixed(2)}</span>
          </div>
          
          <div className={styles.summaryRow}>
            <span>Tax</span>
            <span>${getTax().toFixed(2)}</span>
          </div>
          
          <div className={styles.summaryRow}>
            <span>Shipping</span>
            <span>
              {getShipping() === 0 ? 'Free' : `$${getShipping().toFixed(2)}`}
            </span>
          </div>
          
          {getShipping() > 0 && (
            <div className={styles.freeShippingNote}>
              Add ${(100 - getSubtotal()).toFixed(2)} more for free shipping!
            </div>
          )}
          
          <div className={styles.summaryTotal}>
            <span>Total</span>
            <span>${getTotal().toFixed(2)}</span>
          </div>

          <Link href="/checkout" className={styles.checkoutButton}>
            Proceed to Checkout
          </Link>

          <div className={styles.paymentMethods}>
            <p className={styles.paymentTitle}>We accept:</p>
            <div className={styles.paymentIcons}>
              <span className={styles.paymentIcon}>💳</span>
              <span className={styles.paymentIcon}>🏦</span>
              <span className={styles.paymentIcon}>📱</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;