# 🛍️ FamStep Shop

A modern, fully-functional e-commerce application built with Next.js, React, and TypeScript. FamStep Shop provides a seamless shopping experience with product browsing, cart management, wishlist functionality, and a complete checkout flow.

## 🌟 Features

### Core E-Commerce Features
- **Product Catalog** - Browse products with detailed information, images, and ratings
- **Smart Search** - Search products by name and category
- **Category Filter** - Browse products by category
- **Product Details** - View full product specifications, images, colors, sizes, and customer reviews
- **Shopping Cart** - Add/remove items, adjust quantities, real-time price calculations
- **Wishlist** - Save favorite items for later, toggle between products
- **Checkout Flow** - Multi-step checkout (Shipping > Payment > Review)
- **Local Storage** - All cart and wishlist data persists across sessions

### User Interface
- **Responsive Design** - Mobile, tablet, and desktop optimized
- **Modern Components** - Clean, intuitive UI using Ant Design
- **Real-time Updates** - Instant feedback on user actions
- **Toast Notifications** - Success/error messages via Ant Design
- **Loading States** - Smooth loading indicators

### Technical Highlights
- **Server-Side Rendering** - Next.js App Router with client components
- **State Management** - React hooks with localStorage integration
- **Data Persistence** - localStorage utilities for cart and wishlist
- **API Integration** - Fake Store API for product data
- **Dynamic Routing** - Product pages with dynamic IDs
- **CSS Modules** - Scoped styling with responsive breakpoints

## 🛠️ Tech Stack

- **Framework**: Next.js 14+ (App Router)
- **Language**: JavaScript (React)
- **UI Components**: Ant Design (antd)
- **Icons**: React Icons (react-icons/fi)
- **Data Fetching**: SWR (stale-while-revalidate)
- **HTTP Client**: Axios
- **Styling**: CSS Modules
- **Font**: Quicksand (via next/font)

## 📂 Project Structure

```
src/
├── app/                              # Next.js App Router
│   ├── layout.js                     # Root layout with Navbar
│   ├── page.js                       # Home page
│   ├── globals.css                   # Global styles
│   ├── cart/
│   │   └── page.js                   # Cart page
│   ├── wishlist/
│   │   └── page.js                   # Wishlist page
│   ├── checkout/
│   │   └── page.js                   # Checkout page
│   ├── product/
│   │   └── [id]/
│   │       └── page.js               # Dynamic product page
│   ├── category/
│   │   └── [category]/
│   │       └── page.js               # Category filter page
│   ├── search/
│   │   └── [query]/
│   │       └── page.js               # Search results page
│   ├── login/
│   │   └── page.js                   # Login page (placeholder)
│   ├── signup/
│   │   └── page.js                   # Signup page (placeholder)
│   └── profile/
│       └── page.js                   # User profile (placeholder)
├── components/
│   ├── Navbar/                       # Navigation header
│   ├── Home/                         # Home page hero section
│   ├── ProductList/                  # Product grid display
│   ├── ProductPage/                  # Product detail view
│   ├── Cart/                         # Shopping cart display
│   ├── Checkout/                     # Multi-step checkout
│   ├── Wishlist/                     # Wishlist display
│   ├── HeroSlideshow/                # Hero slider
│   ├── Login/                        # Login form (placeholder)
│   ├── SignUp/                       # Signup form (placeholder)
│   ├── Profile/                      # User profile view (placeholder)
│   ├── Footer/                       # Footer section
│   ├── Spinner/                      # Loading spinner
│   └── Checkout/                     # Checkout form
└── utils/
    ├── cartStorage.js                # Cart localStorage utilities
    └── wishlistStorage.js            # Wishlist localStorage utilities
```

## 🚀 Getting Started

### Prerequisites
- Node.js 16+ installed
- npm or yarn package manager

### Installation

1. **Clone and navigate to the project:**
```bash
cd famstep-shop
```

2. **Install dependencies:**
```bash
npm i
# or
yarn install
```

3. **Run the development server:**
```bash
npm run dev
# or
yarn dev
```

4. **Open in browser:**
Navigate to [http://localhost:3000](http://localhost:3000) to see the application.

### Build for Production

```bash
npm run build
npm start
```

## 📋 Local Storage Schema

### Cart Items (`famstep_cart`)
```json
[
  {
    "id": 1,
    "name": "Product Name",
    "price": 49.99,
    "quantity": 2,
    "size": "M",
    "color": "Blue",
    "image": "https://..."
  }
]
```

### Wishlist Items (`famstep_wishlist`)
```json
[
  {
    "id": 1,
    "name": "Product Name",
    "price": 49.99,
    "image": "https://...",
    "addedDate": "2026-03-22T..."
  }
]
```

## 🎨 Color Scheme

- **Primary**: #25a195 (Teal)
- **Secondary**: #B16A41 (Brown)
- **Text**: #2c2c2c (Dark Gray)
- **Background**: #f8f9fa (Light Gray)
- **Accent**: #dc3545 (Red)
- **Success**: #28a745 (Green)

## 🔄 User Flows

### Shopping Flow
1. Browse home page or search for products
2. Click on product to view details
3. Select size, color, and quantity
4. Add to cart
5. Review cart with totals
6. Proceed to checkout
7. Enter shipping details
8. Select payment method
9. Review order
10. Place order

### Wishlist Flow
1. Click heart icon on product to add to wishlist
2. Navigate to wishlist page
3. View all saved products
4. Add items directly to cart from wishlist
5. Remove items from wishlist

## 🔧 Available Scripts

```bash
# Development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linter (if configured)
npm run lint
```

## 📱 Responsive Breakpoints

- **Desktop**: 1200px+
- **Tablet**: 768px - 1024px
- **Mobile**: < 768px

## 🎯 Future Enhancements

- [ ] User authentication system
- [ ] Payment gateway integration
- [ ] Order history tracking
- [ ] Product reviews and ratings
- [ ] Admin dashboard
- [ ] Inventory management
- [ ] Email notifications
- [ ] Dark mode toggle
- [ ] Advanced filters
- [ ] Product recommendations

## 📚 Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [Ant Design](https://ant.design)
- [SWR Documentation](https://swr.vercel.app)

## 📄 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Contributions are welcome! Feel free to submit issues and enhancement requests.

---

**Happy Shopping! 🛒✨**
