'use client'
import React from 'react';
import { useParams } from 'next/navigation';
import Navbar from '@/components/Navbar';
import ProductPage from '@/components/ProductPage';

function ProductDetailPage() {
  const params = useParams();
  const productId = params.id;

  return (
    <div>
      <Navbar />
      <ProductPage productId={productId} />
    </div>
  );
}

export default ProductDetailPage;
