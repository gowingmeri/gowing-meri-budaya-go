"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { products } from "@/data/product";

const ProductSuggestions = () => {
  // Get featured products (first 8 products)
  const featuredProducts = products.slice(0, 8);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <section className="bg-white py-16">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-normal text-gray-900 mb-4">
            Rekomendasi Aset Budaya Pilihan Untuk Anda
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Temukan aset budaya Indonesia berkualitas tinggi untuk proyek kreatif Anda
          </p>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {featuredProducts.map((product) => (
            <Link
              key={product.id}
              href={`/detail-product?id=${product.id}`}
              className="group border border-gray-200 rounded-2xl overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="aspect-square relative overflow-hidden">
                <Image
                  src={product.thumbnail}
                  alt={product.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-3 left-3">
                  <span className="px-3 py-1 bg-black/70 text-white text-xs rounded-full">
                    {product.kategori}
                  </span>
                </div>
                {product.isGenerative && (
                  <div className="absolute top-3 right-3">
                    <span className="px-3 py-1 bg-primary text-white text-xs rounded-full">
                      AI
                    </span>
                  </div>
                )}
              </div>
              
              <div className="p-4">
                <h3 className="font-normal text-lg text-gray-900 mb-2 group-hover:text-primary transition-colors line-clamp-1">
                  {product.title}
                </h3>
                <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                  {product.description}
                </p>
                <p className="text-xs text-gray-500 mb-3">
                  oleh {product.creator}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-lg font-medium text-primary">
                    {formatPrice(product.price)}
                  </span>
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    product.jenisLisensi === 'personal' 
                      ? 'bg-blue-100 text-blue-800'
                      : product.jenisLisensi === 'commercial'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-purple-100 text-purple-800'
                  }`}>
                    {product.jenisLisensi}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link
            href="/product"
            className="inline-block px-8 py-4 bg-primary text-white rounded-full font-normal hover:bg-primary/90 transition-colors shadow-lg"
          >
            Lihat Semua Koleksi
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ProductSuggestions;
