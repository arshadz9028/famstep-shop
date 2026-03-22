import React, { useState } from "react";
import Link from "next/link";
import { FiSearch, FiChevronRight } from "react-icons/fi";
import HeroSlideshow from "../HeroSlideshow";
import styles from "./index.module.css";
import axios from "axios";
import useSWR from "swr";
import Spinner from "@/components/Spinner";

function Home() {
  const [searchQuery, setSearchQuery] = useState("");

  const categories = [
    {
      name: "Shirts",
      image:
        "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      count: 45,
    },
    {
      name: "Pants",
      image:
        "https://plus.unsplash.com/premium_photo-1674828601362-afb73c907ebe?q=80&w=453&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      count: 32,
    },
    {
      name: "Jackets",
      image:
        "https://images.unsplash.com/photo-1551028719-00167b16eac5?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      count: 28,
    },
    {
      name: "Shoes",
      image:
        "https://images.unsplash.com/photo-1549298916-b41d501d3772?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      count: 67,
    },
    {
      name: "Accessories",
      image:
        "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      count: 23,
    },
    {
      name: "Suits",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      count: 15,
    },
  ];

  const fetcher = (url) => axios.get(url).then((res) => res.data);
  const { data, isLoading, error } = useSWR(
    "https://fakestoreapi.com/products",
    fetcher,
  );
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

  const handleSearch = (e) => {
    e.preventDefault();
    console.log("Searching for:", searchQuery);
  };

  return (
    <div className={styles.home}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <HeroSlideshow />
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>
            Discover Premium Fashion
          </h1>
          <p className={styles.heroSubtitle}>
            From casual wear to formal attire, find the perfect style that
            defines you
          </p>

          {/* Hero Search */}
          <form onSubmit={handleSearch} className={styles.heroSearch}>
            <div className={styles.searchWrapper}>
              <input
                type="text"
                placeholder="Search for shirts, pants, jackets..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={styles.heroSearchInput}
              />
              <button type="submit" className={styles.heroSearchButton}>
                <FiSearch />
                Search
              </button>
            </div>
          </form>
        </div>
      </section>

      

      {/* Featured Products */}
      <section className={styles.featured}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>Featured Products</h2>
          <div className={styles.productsGrid}>
            {data?.map((product) => (
              <Link
                key={product.id}
                href={`/product/${product.id}`}
                className={styles.productCard}
              >
                <div className={styles.productImage}>
                  <img
                    src={product.image}
                    alt={product.title}
                    className={styles.productImg}
                  />
                </div>
                <div className={styles.productInfo}>
                  <div>
                    <h3 className={styles.productName}>{product.title}</h3>
                    <div className={styles.productRating}>
                      ⭐ {product.rating.rate}
                    </div>
                    <div className={styles.productPrice}>${product.price}</div>
                  </div>
                  <div className={styles.productActions}>
                    <button className={styles.addToCartButton}>
                      Add to Cart
                    </button>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

{/* Categories Section */}
      <section className={styles.categories}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>Shop by Category</h2>
          <div className={styles.categoriesGrid}>
            {categories.map((category, index) => (
              <Link
                key={index}
                href={`/category/${category.name.toLowerCase()}`}
                className={styles.categoryCard}
              >
                <div className={styles.categoryImage}>
                  <img
                    src={category.image}
                    alt={category.name}
                    className={styles.categoryImg}
                  />
                </div>
                <div className={styles.categoryInfo}>
                  <h3 className={styles.categoryName}>{category.name}</h3>
                  <p className={styles.categoryCount}>{category.count} items</p>
                  <button className={styles.categoryButton}>
                    Shop Now <FiChevronRight />
                  </button>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
      {/* Newsletter Section */}
      {/* <section className={styles.newsletter}>
        <div className={styles.container}>
          <div className={styles.newsletterContent}>
            <h2 className={styles.newsletterTitle}>Stay Updated</h2>
            <p className={styles.newsletterSubtitle}>
              Get the latest fashion trends and exclusive offers delivered to your inbox
            </p>
            <form className={styles.newsletterForm}>
              <input
                type="email"
                placeholder="Enter your email address"
                className={styles.newsletterInput}
              />
              <button type="submit" className={styles.newsletterButton}>
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </section> */}
    </div>
  );
}

export default Home;
