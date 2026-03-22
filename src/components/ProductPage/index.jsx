"use client";
import React, { useState } from "react";
import {
  FiStar,
  FiHeart,
  FiShare2,
  FiShoppingCart,
  FiMinus,
  FiPlus,
} from "react-icons/fi";
import Link from "next/link";
import styles from "./index.module.css";
import axios from "axios";
import useSWR from "swr";
import Spinner from "@/components/Spinner";
import { message } from "antd";
import { addToCart } from "@/utils/cartStorage";
import { addToWishlist, removeFromWishlist, isInWishlist } from "@/utils/wishlistStorage";
function ProductPage({ productId }) {
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [isInWishlistState, setIsInWishlistState] = useState(false);
  const fetcher = (url) => axios.get(url).then((res) => res.data);

  const { data, isLoading, error } = useSWR(
    "https://fakestoreapi.com/products",
    fetcher,
  );

  // Check if product is in wishlist on mount
  React.useEffect(() => {
    if (productId) {
      setIsInWishlistState(isInWishlist(parseInt(productId)));
    }
  }, [productId]);
  if (error)
    return (
      <strong
        style={{
          display: "flex",
          fontSize: "20px",
          color: "red",
          justifyContent: "center",
          marginTop: "50px",
        }}
      >
        Failed to load products!
      </strong>
    );
  if (isLoading)
    return (
      <div
        style={{ display: "flex", justifyContent: "center", marginTop: "50px" }}
      >
        <Spinner />
      </div>
    );

    const prod = data.find((p) => p.id === parseInt(productId));
    console.log("Fetched product:", prod);
  // Sample product data
  const product = {
    id: 1,
    name: "Classic White Shirt",
    price: 49.99,
    originalPrice: 69.99,
    rating: 4.8,
    reviews: 124,
    description:
      "A timeless classic white shirt made from premium cotton. Perfect for both casual and formal occasions. Features a comfortable fit and easy-care fabric.",
    images: [
      "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    ],
    colors: ["White", "Blue", "Black"],
    sizes: ["S", "M", "L", "XL"],
    features: [
      "100% Premium Cotton",
      "Machine Washable",
      "Wrinkle Resistant",
      "Comfortable Fit",
      "Classic Collar Design",
    ],
    category: "shirts",
    inStock: true,
    stockCount: 15,
  };

  const relatedProducts = [
    {
      id: 2,
      name: "Denim Jacket",
      price: 89.99,
      image:
        "https://images.unsplash.com/photo-1551028719-00167b16eac5?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
      rating: 4.6,
    },
    {
      id: 3,
      name: "Chino Pants",
      price: 59.99,
      image:
        "https://images.unsplash.com/photo-1506629905607-3b2a2b5b5b5b?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
      rating: 4.7,
    },
    {
      id: 4,
      name: "Leather Shoes",
      price: 129.99,
      image:
        "https://images.unsplash.com/photo-1549298916-b41d501d3772?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
      rating: 4.9,
    },
  ];

  const handleAddToCart = () => {
    if (!selectedSize || !selectedColor) {
      message.error("Please select size and color");
      return;
    }

    const cartItem = {
      id: prod.id,
      name: prod.title,
      price: prod.price,
      quantity,
      size: selectedSize,
      color: selectedColor,
      image: prod.image,
    };

    const success = addToCart(cartItem);
    if (success) {
      message.success(`${prod.title} added to cart!`);
      // Reset selections after adding
      setSelectedSize("");
      setSelectedColor("");
      setQuantity(1);
    } else {
      message.error("Failed to add item to cart");
    }
  };

  const handleQuantityChange = (change) => {
    const newQuantity = quantity + change;
    if (newQuantity >= 1 && newQuantity <= product.stockCount) {
      setQuantity(newQuantity);
    }
  };

  const handleWishlistToggle = () => {
    if (isInWishlistState) {
      removeFromWishlist(prod.id);
      setIsInWishlistState(false);
      message.info('Removed from wishlist');
    } else {
      const success = addToWishlist({
        id: prod.id,
        name: prod.title,
        price: prod.price,
        image: prod.image,
      });
      if (success) {
        setIsInWishlistState(true);
        message.success('Added to wishlist!');
      }
    }
  };

  return (
    <div className={styles.productPageContainer}>
      <div className={styles.container}>
        {/* Breadcrumb */}
        <div className={styles.breadcrumb}>
          <Link href="/">Home</Link>
          <span>/</span>
          <Link href={`/category/${prod.category}`}>{prod.category}</Link>
          <span>/</span>
          <span>{prod.title}</span>
        </div>

        <div className={styles.productContent}>
          {/* Product Images */}
          <div className={styles.productImages}>
            <div className={styles.mainImage}>
              <img
                src={prod.image}
                alt={prod.title}
                className={styles.mainImg}
              />
            </div>
            <div className={styles.thumbnailImages}>
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`${styles.thumbnail} ${selectedImage === index ? styles.active : ""}`}
                >
                  <img src={prod.image} alt={`${prod.title} ${index + 1}`} />
                </button>
              ))}
            </div>
          </div>

          {/* Product Details */}
          <div className={styles.productDetails}>
            <h1 className={styles.productName}>{prod.title}</h1>

            <div className={styles.productRating}>
              <div className={styles.stars}>
                {[...Array(5)].map((_, i) => (
                  <FiStar
                    key={i}
                    className={`${styles.star} ${i < Math.floor(prod.rating.rate) ? styles.filled : ""}`}
                  />
                ))}
              </div>
              <span className={styles.ratingText}>
                {prod.rating.rate} ({product.reviews} reviews)
              </span>
            </div>

            <div className={styles.productPrice}>
              <span className={styles.currentPrice}>${product.price}</span>
              <span className={styles.originalPrice}>
                ${product.originalPrice}
              </span>
              <span className={styles.discount}>
                Save ${(product.originalPrice - prod.price).toFixed(2)}
              </span>
            </div>

            <div className={styles.productDescription}>
              <p>{prod.description}</p>
            </div>

            {/* Color Selection */}
            <div className={styles.colorSelection}>
              <h3 className={styles.selectionTitle}>Color:</h3>
              <div className={styles.colorOptions}>
                {product.colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`${styles.colorOption} ${selectedColor === color ? styles.selected : ""}`}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>

            {/* Size Selection */}
            <div className={styles.sizeSelection}>
              <h3 className={styles.selectionTitle}>Size:</h3>
              <div className={styles.sizeOptions}>
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`${styles.sizeOption} ${selectedSize === size ? styles.selected : ""}`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity Selection */}
            <div className={styles.quantitySelection}>
              <h3 className={styles.selectionTitle}>Quantity:</h3>
              <div className={styles.quantityControls}>
                <button
                  onClick={() => handleQuantityChange(-1)}
                  className={styles.quantityButton}
                  disabled={quantity <= 1}
                >
                  <FiMinus />
                </button>
                <span className={styles.quantity}>{quantity}</span>
                <button
                  onClick={() => handleQuantityChange(1)}
                  className={styles.quantityButton}
                  disabled={quantity >= product.stockCount}
                >
                  <FiPlus />
                </button>
              </div>
              <span className={styles.stockInfo}>
                {product.stockCount} in stock
              </span>
            </div>

            {/* Action Buttons */}
            <div className={styles.actionButtons}>
              <button
                onClick={handleAddToCart}
                className={styles.addToCartButton}
                disabled={!product.inStock}
              >
                <FiShoppingCart />
                Add to Cart
              </button>
              <button
                onClick={handleWishlistToggle}
                className={`${styles.wishlistButton} ${isInWishlistState ? styles.inWishlist : ''}`}
              >
                <FiHeart />
                {isInWishlistState ? 'In Wishlist' : 'Add to Wishlist'}
              </button>
              <button className={styles.shareButton}>
                <FiShare2 />
                Share
              </button>
            </div>

            {/* Product Features */}
            <div className={styles.productFeatures}>
              <h3 className={styles.featuresTitle}>Product Features:</h3>
              <ul className={styles.featuresList}>
                {product.features.map((feature, index) => (
                  <li key={index} className={styles.featureItem}>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Related Products */}
        <div className={styles.relatedProducts}>
          <h2 className={styles.relatedTitle}>You Might Also Like</h2>
          <div className={styles.relatedGrid}>
            {relatedProducts.map((relatedProduct) => (
              <Link
                key={relatedProduct.id}
                href={`/product/${relatedProduct.id}`}
                className={styles.relatedCard}
              >
                <div className={styles.relatedImage}>
                  <img src={relatedProduct.image} alt={relatedProduct.name} />
                </div>
                <div className={styles.relatedInfo}>
                  <h3 className={styles.relatedName}>{relatedProduct.name}</h3>
                  <div className={styles.relatedRating}>
                    <FiStar className={styles.relatedStar} />
                    <span>{relatedProduct.rating}</span>
                  </div>
                  <div className={styles.relatedPrice}>
                    ${relatedProduct.price}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductPage;
