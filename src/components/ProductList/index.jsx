import React, { useState } from 'react';
import { FiSearch, FiFilter, FiGrid, FiList, FiStar } from 'react-icons/fi';
import Link from 'next/link';
import styles from './index.module.css';

function ProductList({ category = null, searchQuery = null }) {
  const [viewMode, setViewMode] = useState('grid');
  const [sortBy, setSortBy] = useState('featured');
  const [priceRange, setPriceRange] = useState([0, 500]);

  // Sample products data
  const allProducts = [
    { id: 1, name: 'Classic White Shirt', price: 49.99, image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80', rating: 4.8, category: 'shirts', color: 'White', size: ['S', 'M', 'L', 'XL'] },
    { id: 2, name: 'Denim Jacket', price: 89.99, image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80', rating: 4.6, category: 'jackets', color: 'Blue', size: ['M', 'L', 'XL'] },
    { id: 3, name: 'Chino Pants', price: 59.99, image: 'https://images.unsplash.com/photo-1506629905607-3b2a2b5b5b5b?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80', rating: 4.7, category: 'pants', color: 'Khaki', size: ['30', '32', '34', '36'] },
    { id: 4, name: 'Leather Shoes', price: 129.99, image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80', rating: 4.9, category: 'shoes', color: 'Brown', size: ['8', '9', '10', '11'] },
    { id: 5, name: 'Cotton T-Shirt', price: 29.99, image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80', rating: 4.5, category: 'shirts', color: 'Black', size: ['S', 'M', 'L', 'XL'] },
    { id: 6, name: 'Wool Blazer', price: 199.99, image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80', rating: 4.8, category: 'suits', color: 'Navy', size: ['M', 'L', 'XL'] },
    { id: 7, name: 'Casual Sneakers', price: 79.99, image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80', rating: 4.4, category: 'shoes', color: 'White', size: ['8', '9', '10', '11'] },
    { id: 8, name: 'Leather Belt', price: 39.99, image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80', rating: 4.6, category: 'accessories', color: 'Brown', size: ['S', 'M', 'L'] },
    { id: 9, name: 'Formal Dress Shirt', price: 69.99, image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80', rating: 4.7, category: 'shirts', color: 'Blue', size: ['S', 'M', 'L', 'XL'] },
    { id: 10, name: 'Cargo Pants', price: 49.99, image: 'https://images.unsplash.com/photo-1506629905607-3b2a2b5b5b5b?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80', rating: 4.3, category: 'pants', color: 'Green', size: ['30', '32', '34', '36'] },
    { id: 11, name: 'Winter Coat', price: 149.99, image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80', rating: 4.8, category: 'jackets', color: 'Black', size: ['M', 'L', 'XL'] },
    { id: 12, name: 'Silk Tie', price: 24.99, image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80', rating: 4.5, category: 'accessories', color: 'Red', size: ['One Size'] }
  ];

  // Filter products based on category or search
  const filteredProducts = allProducts.filter(product => {
    if (category && product.category !== category) return false;
    if (searchQuery && !product.name.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    if (product.price < priceRange[0] || product.price > priceRange[1]) return false;
    return true;
  });

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'rating':
        return b.rating - a.rating;
      default:
        return 0;
    }
  });

  const pageTitle = category ? `${category.charAt(0).toUpperCase() + category.slice(1)} Collection` : 'All Products';
  const productCount = sortedProducts.length;

  return (
    <div className={styles.productListContainer}>
      <div className={styles.container}>
        {/* Header */}
        <div className={styles.header}>
          <h1 className={styles.pageTitle}>{pageTitle}</h1>
          <p className={styles.productCount}>{productCount} products found</p>
        </div>

        {/* Filters and Controls */}
        <div className={styles.controls}>
          <div className={styles.filters}>
            <div className={styles.filterGroup}>
              <label className={styles.filterLabel}>Sort by:</label>
              <select 
                value={sortBy} 
                onChange={(e) => setSortBy(e.target.value)}
                className={styles.filterSelect}
              >
                <option value="featured">Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Customer Rating</option>
              </select>
            </div>

            <div className={styles.filterGroup}>
              <label className={styles.filterLabel}>Price Range:</label>
              <div className={styles.priceRange}>
                <span>${priceRange[0]}</span>
                <input
                  type="range"
                  min="0"
                  max="500"
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                  className={styles.rangeSlider}
                />
                <span>${priceRange[1]}</span>
              </div>
            </div>
          </div>

          <div className={styles.viewControls}>
            <button
              onClick={() => setViewMode('grid')}
              className={`${styles.viewButton} ${viewMode === 'grid' ? styles.active : ''}`}
            >
              <FiGrid />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`${styles.viewButton} ${viewMode === 'list' ? styles.active : ''}`}
            >
              <FiList />
            </button>
          </div>
        </div>

        {/* Products Grid */}
        <div className={`${styles.productsGrid} ${viewMode === 'list' ? styles.listView : ''}`}>
          {sortedProducts.map(product => (
            <div key={product.id} className={styles.productCard}>
              <Link href={`/product/${product.id}`} className={styles.productLink}>
                <div className={styles.productImage}>
                  <img src={product.image} alt={product.name} className={styles.productImg} />
                  <div className={styles.productOverlay}>
                    <button className={styles.quickViewButton}>Quick View</button>
                  </div>
                </div>
                <div className={styles.productInfo}>
                  <h3 className={styles.productName}>{product.name}</h3>
                  <div className={styles.productRating}>
                    <FiStar className={styles.starIcon} />
                    <span>{product.rating}</span>
                  </div>
                  <div className={styles.productPrice}>${product.price}</div>
                  <div className={styles.productColors}>
                    <span className={styles.colorLabel}>Color: {product.color}</span>
                  </div>
                  <div className={styles.productSizes}>
                    <span className={styles.sizeLabel}>Sizes: {product.size.join(', ')}</span>
                  </div>
                </div>
              </Link>
              <div className={styles.productActions}>
                <button className={styles.addToCartButton}>Add to Cart</button>
                <button className={styles.wishlistButton}>♡</button>
              </div>
            </div>
          ))}
        </div>

        {/* No Products Message */}
        {sortedProducts.length === 0 && (
          <div className={styles.noProducts}>
            <h3>No products found</h3>
            <p>Try adjusting your filters or search terms</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductList;
