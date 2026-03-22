'use client'
import React from 'react';
import { useParams } from 'next/navigation';
import Navbar from '@/components/Navbar';
import ProductList from '@/components/ProductList';

function CategoryPage() {
  const params = useParams();
  const category = params.category;

  return (
    <div>
      <Navbar />
      <ProductList category={category} />
    </div>
  );
}

export default CategoryPage;
