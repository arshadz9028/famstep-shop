import React, { useState } from 'react';
import Link from 'next/link';
import { 
  FiSearch, 
  FiShoppingCart, 
  FiUser, 
  FiLogIn, 
  FiMenu,
  FiX 
} from 'react-icons/fi';
import styles from './index.module.css';
import { IoIosHeart } from "react-icons/io";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    // Search functionality will be implemented later
    console.log('Searching for:', searchQuery);
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.container}>
        {/* Logo */}
        <Link href="/" className={styles.logo}>
          <div className={styles.logoText}>
            <span className={styles.fam}>fam</span>
            <span className={styles.step}>step</span>
          </div>
          <div className={styles.logoSubtext}>FASHION</div>
        </Link>

        {/* Search Bar */}
        {/* <div className={styles.searchContainer}>
          <form onSubmit={handleSearch} className={styles.searchForm}>
            <input
              type="text"
              placeholder="Search for men's clothing..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={styles.searchInput}
            />
            <button type="submit" className={styles.searchButton}>
              <FiSearch />
            </button>
          </form>
        </div> */}

        {/* Desktop Navigation */}
        <div className={styles.desktopNav}>
        <Link href="/wishlist" className={styles.navButton}>
            <IoIosHeart />
            <span>Wishlist</span>
          </Link>
          <Link href="/cart" className={styles.navButton}>
            <FiShoppingCart />
            <span>Cart</span>
          </Link>
          <Link href="/login" className={styles.navButton}>
            <FiLogIn />
            <span>Login</span>
          </Link>
          <Link href="/profile" className={styles.navButton}>
            <FiUser />
            <span>Profile</span>
          </Link>
          
        </div>

        {/* Mobile Menu Button */}
        <button className={styles.mobileMenuButton} onClick={toggleMenu}>
          {isMenuOpen ? <FiX /> : <FiMenu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className={styles.mobileMenu}>
          <div className={styles.mobileNav}>
            <Link href="/cart" className={styles.mobileNavButton}>
              <FiShoppingCart />
              <span>Cart</span>
            </Link>
            <Link href="/login" className={styles.mobileNavButton}>
              <FiLogIn />
              <span>Login</span>
            </Link>
            <Link href="/profile" className={styles.mobileNavButton}>
              <FiUser />
              <span>Profile</span>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;