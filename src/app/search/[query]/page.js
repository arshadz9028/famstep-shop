'use client'
import React from 'react';
import { useParams } from 'next/navigation';
import Navbar from '@/components/Navbar';
import ProductList from '@/components/ProductList';

function SearchPage() {
  const params = useParams();
  const searchQuery = params.query;

  return (
    <div>
      <Navbar />
      <ProductList searchQuery={searchQuery} />
    </div>
  );
}

export default SearchPage;
