'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { FiCreditCard, FiTruck, FiLock, FiCheck, FiArrowLeft } from 'react-icons/fi';
import styles from './index.module.css';
import { getCartItems } from '@/utils/cartStorage';
import { message } from 'antd';
function Checkout() {
  const [currentStep, setCurrentStep] = useState(1);
  const [cartItems, setCartItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [formData, setFormData] = useState({
    // Shipping Information
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'United States',
    
    // Payment Information
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardName: '',
    
    // Billing
    sameAsShipping: true,
    billingAddress: '',
    billingCity: '',
    billingState: '',
    billingZipCode: '',
    
    // Order Summary
    subtotal: 0,
    tax: 0,
    shipping: 0,
    total: 0
  });

  // Load cart items from localStorage on mount
  useEffect(() => {
    setIsLoading(true);
    const items = getCartItems();
    setCartItems(items);
    
    if (items.length > 0) {
      const calcSubtotal = items.reduce((total, item) => total + (item.price * item.quantity), 0);
      const calcTax = calcSubtotal * 0.08;
      const calcShipping = calcSubtotal > 100 ? 0 : 9.99;
      
      setFormData(prev => ({
        ...prev,
        subtotal: calcSubtotal,
        tax: calcTax,
        shipping: calcShipping,
        total: calcSubtotal + calcTax + calcShipping
      }));
    }
    setIsLoading(false);
  }, []);

  const steps = [
    { id: 1, title: 'Shipping', icon: <FiTruck /> },
    { id: 2, title: 'Payment', icon: <FiCreditCard /> },
    { id: 3, title: 'Review', icon: <FiCheck /> }
  ];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleNext = () => {
    if (cartItems.length === 0) {
      message.error('Your cart is empty. Please add items to proceed.');
      return;
    }
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (cartItems.length === 0) {
      message.error('Your cart is empty. Please add items before placing an order.');
      return;
    }
    
    console.log('Order submitted:', {
      ...formData,
      items: cartItems
    });
    // Handle order submission
    message.success('Order placed successfully! Thank you for your purchase.');
  };

  const renderShippingForm = () => (
    <div className={styles.formSection}>
      <h2 className={styles.sectionTitle}>Shipping Information</h2>
      <div className={styles.formGrid}>
        <div className={styles.inputGroup}>
          <label className={styles.inputLabel}>First Name *</label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            className={styles.input}
            required
          />
        </div>
        <div className={styles.inputGroup}>
          <label className={styles.inputLabel}>Last Name *</label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            className={styles.input}
            required
          />
        </div>
        <div className={styles.inputGroup}>
          <label className={styles.inputLabel}>Email Address *</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={styles.input}
            required
          />
        </div>
        <div className={styles.inputGroup}>
          <label className={styles.inputLabel}>Phone Number *</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className={styles.input}
            required
          />
        </div>
        <div className={styles.inputGroup}>
          <label className={styles.inputLabel}>Address *</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            className={styles.input}
            required
          />
        </div>
        <div className={styles.inputGroup}>
          <label className={styles.inputLabel}>City *</label>
          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleChange}
            className={styles.input}
            required
          />
        </div>
        <div className={styles.inputGroup}>
          <label className={styles.inputLabel}>State *</label>
          <input
            type="text"
            name="state"
            value={formData.state}
            onChange={handleChange}
            className={styles.input}
            required
          />
        </div>
        <div className={styles.inputGroup}>
          <label className={styles.inputLabel}>ZIP Code *</label>
          <input
            type="text"
            name="zipCode"
            value={formData.zipCode}
            onChange={handleChange}
            className={styles.input}
            required
          />
        </div>
      </div>
    </div>
  );

  const renderPaymentForm = () => (
    <div className={styles.formSection}>
      <h2 className={styles.sectionTitle}>Payment Information</h2>
      <div className={styles.paymentMethods}>
        <div className={styles.paymentMethod}>
          <input
            type="radio"
            id="creditCard"
            name="paymentMethod"
            value="creditCard"
            defaultChecked
            className={styles.radioInput}
          />
          <label htmlFor="creditCard" className={styles.paymentMethodLabel}>
            <FiCreditCard />
            Credit Card
          </label>
        </div>
        <div className={styles.paymentMethod}>
          <input
            type="radio"
            id="paypal"
            name="paymentMethod"
            value="paypal"
            className={styles.radioInput}
          />
          <label htmlFor="paypal" className={styles.paymentMethodLabel}>
            <span className={styles.paypalIcon}>P</span>
            PayPal
          </label>
        </div>
      </div>
      
      <div className={styles.formGrid}>
        <div className={styles.inputGroup}>
          <label className={styles.inputLabel}>Card Number *</label>
          <input
            type="text"
            name="cardNumber"
            value={formData.cardNumber}
            onChange={handleChange}
            placeholder="1234 5678 9012 3456"
            className={styles.input}
            required
          />
        </div>
        <div className={styles.inputGroup}>
          <label className={styles.inputLabel}>Cardholder Name *</label>
          <input
            type="text"
            name="cardName"
            value={formData.cardName}
            onChange={handleChange}
            className={styles.input}
            required
          />
        </div>
        <div className={styles.inputGroup}>
          <label className={styles.inputLabel}>Expiry Date *</label>
          <input
            type="text"
            name="expiryDate"
            value={formData.expiryDate}
            onChange={handleChange}
            placeholder="MM/YY"
            className={styles.input}
            required
          />
        </div>
        <div className={styles.inputGroup}>
          <label className={styles.inputLabel}>CVV *</label>
          <input
            type="text"
            name="cvv"
            value={formData.cvv}
            onChange={handleChange}
            placeholder="123"
            className={styles.input}
            required
          />
        </div>
      </div>
    </div>
  );

  const renderReviewForm = () => (
    <div className={styles.formSection}>
      <h2 className={styles.sectionTitle}>Review Your Order</h2>
      <div className={styles.orderReview}>
        <div className={styles.shippingReview}>
          <h3>Shipping Address</h3>
          <p>{formData.firstName} {formData.lastName}</p>
          <p>{formData.address}</p>
          <p>{formData.city}, {formData.state} {formData.zipCode}</p>
          <p>{formData.email}</p>
          <p>{formData.phone}</p>
        </div>
        
        <div className={styles.paymentReview}>
          <h3>Payment Method</h3>
          <p>Credit Card ending in ****{formData.cardNumber.slice(-4)}</p>
          <p>{formData.cardName}</p>
        </div>

        <div className={styles.productsReview}>
          <h3>Items Being Ordered</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '10px' }}>
            {cartItems.map((item) => (
              <div key={`${item.id}-${item.size}-${item.color}`} style={{ padding: '10px', backgroundColor: '#f5f5f5', borderRadius: '4px' }}>
                <p style={{ margin: '0 0 4px 0', fontWeight: '500' }}>{item.name}</p>
                <p style={{ margin: '0 0 4px 0', fontSize: '14px', color: '#666' }}>
                  Size: {item.size} | Color: {item.color} | Qty: {item.quantity}
                </p>
                <p style={{ margin: '0', fontSize: '14px', fontWeight: '500', color: '#007bff' }}>
                  ${(item.price * item.quantity).toFixed(2)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className={styles.checkoutContainer}>
      <div className={styles.checkoutHeader}>
        <Link href="/cart" className={styles.backButton}>
          <FiArrowLeft />
          Back to Cart
        </Link>
        <h1 className={styles.checkoutTitle}>Checkout</h1>
      </div>

      <div className={styles.checkoutContent}>
        <div className={styles.checkoutSteps}>
          {steps.map(step => (
            <div
              key={step.id}
              className={`${styles.step} ${currentStep >= step.id ? styles.active : ''}`}
            >
              <div className={styles.stepIcon}>{step.icon}</div>
              <span className={styles.stepTitle}>{step.title}</span>
            </div>
          ))}
        </div>

        <div className={styles.checkoutForm}>
          <form onSubmit={handleSubmit}>
            {currentStep === 1 && renderShippingForm()}
            {currentStep === 2 && renderPaymentForm()}
            {currentStep === 3 && renderReviewForm()}

            <div className={styles.formActions}>
              {currentStep > 1 && (
                <button
                  type="button"
                  onClick={handlePrevious}
                  className={styles.previousButton}
                >
                  Previous
                </button>
              )}
              
              {currentStep < 3 ? (
                <button
                  type="button"
                  onClick={handleNext}
                  className={styles.nextButton}
                >
                  Next
                </button>
              ) : (
                <button
                  type="submit"
                  className={styles.submitButton}
                >
                  <FiLock />
                  Place Order
                </button>
              )}
            </div>
          </form>
        </div>

        <div className={styles.orderSummary}>
          <h2 className={styles.summaryTitle}>Order Summary</h2>
          {isLoading ? (
            <div style={{ padding: '20px', textAlign: 'center', color: '#999' }}>
              Loading order details...
            </div>
          ) : cartItems.length === 0 ? (
            <div style={{ padding: '20px', textAlign: 'center', color: '#999' }}>
              <p>No items in cart</p>
              <Link href="/cart" style={{ color: '#007bff', textDecoration: 'none' }}>
                Back to Cart
              </Link>
            </div>
          ) : (
            <div className={styles.summaryItems}>
              {cartItems.map((item) => (
                <div key={`${item.id}-${item.size}-${item.color}`} className={styles.summaryItem}>
                  <div className={styles.summaryItemContent}>
                    <img 
                      src={item.image} 
                      alt={item.name}
                      className={styles.summaryItemImg}
                    />
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                      <span>{item.name}</span>
                      <span style={{ fontSize: '12px', color: '#666' }}>Size: {item.size} | Color: {item.color}</span>
                      <span style={{ fontSize: '12px', color: '#666' }}>Qty: {item.quantity}x</span>
                    </div>
                  </div>
                  <span>${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>
          )}
          
          <div className={styles.summaryTotals}>
            <div className={styles.summaryRow}>
              <span>Subtotal</span>
              <span>${formData.subtotal.toFixed(2)}</span>
            </div>
            <div className={styles.summaryRow}>
              <span>Tax</span>
              <span>${formData.tax.toFixed(2)}</span>
            </div>
            <div className={styles.summaryRow}>
              <span>Shipping</span>
              <span>Free</span>
            </div>
            <div className={styles.summaryTotal}>
              <span>Total</span>
              <span>${formData.total.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;