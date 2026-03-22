import React from 'react';
import { FiPhone, FiMapPin, FiInstagram, FiMail, FiClock } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import Link from 'next/link';
import styles from './index.module.css';

function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.footerContent}>
          {/* Brand Section */}
          <div className={styles.brandSection}>
            <div className={styles.logo}>
              <div className={styles.logoText}>
                <span className={styles.fam}>fam</span>
                <span className={styles.step}>step</span>
              </div>
              <div className={styles.logoSubtext}>FASHION</div>
            </div>
            <p className={styles.brandDescription}>
              Discover premium men&apos;s fashion with our curated collection of stylish and comfortable clothing.
            </p>
            <div className={styles.socialLinks}>
              <a href="https://instagram.com/famstep_fashion" target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
                <FiInstagram />
              </a>
              <a href="https://wa.me/919619527143" target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
                <FaWhatsapp />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className={styles.linksSection}>
            <h3 className={styles.sectionTitle}>Quick Links</h3>
            <ul className={styles.linksList}>
              <li><Link href="/">Home</Link></li>
              <li><Link href="/category/shirts">Shirts</Link></li>
              <li><Link href="/category/pants">Pants</Link></li>
              <li><Link href="/category/jackets">Jackets</Link></li>
              <li><Link href="/category/shoes">Shoes</Link></li>
              <li><Link href="/category/accessories">Accessories</Link></li>
            </ul>
          </div>

          {/* Customer Service */}
          <div className={styles.linksSection}>
            <h3 className={styles.sectionTitle}>Customer Service</h3>
            <ul className={styles.linksList}>
              <li><Link href="/profile">My Account</Link></li>
              <li><Link href="/cart">Shopping Cart</Link></li>
              <li><Link href="/checkout">Checkout</Link></li>
              <li><Link href="/login">Login</Link></li>
              <li><Link href="/signup">Sign Up</Link></li>
            </ul>
          </div>

          {/* Contact Information */}
          <div className={styles.contactSection}>
            <h3 className={styles.sectionTitle}>Contact Us</h3>
            <div className={styles.contactInfo}>
              <div className={styles.contactItem}>
                <FiPhone className={styles.contactIcon} />
                <div className={styles.contactDetails}>
                  <a href="tel:+919619527143" className={styles.contactLink}>+91 96195 27143</a>
                  <a href="tel:+919004491720" className={styles.contactLink}>+91 90044 91720</a>
                </div>
              </div>

              <div className={styles.contactItem}>
                <FiMapPin className={styles.contactIcon} />
                <div className={styles.contactDetails}>
                  <p>Shop No 9 Rajshree</p>
                  <p>Shopping Center, Near Post</p>
                  <p>Office, Mira Road (E), Thane</p>
                  <p>401107</p>
                </div>
              </div>

              <div className={styles.contactItem}>
                <FiInstagram className={styles.contactIcon} />
                <div className={styles.contactDetails}>
                  <a href="https://instagram.com/famstep_fashion" target="_blank" rel="noopener noreferrer" className={styles.contactLink}>
                    @famstep_fashion
                  </a>
                </div>
              </div>

              <div className={styles.contactItem}>
                <FiClock className={styles.contactIcon} />
                <div className={styles.contactDetails}>
                  <p>Mon - Sat: 10:00 AM - 9:00 PM</p>
                  <p>Sunday: 11:00 AM - 8:00 PM</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className={styles.footerBottom}>
          <div className={styles.footerBottomContent}>
            <p className={styles.copyright}>
              © 2024 Famstep Fashion. All rights reserved.
            </p>
            <div className={styles.footerLinks}>
              <Link href="#" className={styles.footerLink}>Privacy Policy</Link>
              <Link href="#" className={styles.footerLink}>Terms of Service</Link>
              <Link href="#" className={styles.footerLink}>Shipping Policy</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
