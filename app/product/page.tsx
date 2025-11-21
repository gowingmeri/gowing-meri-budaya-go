"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { products, Product } from "@/data/product";
import Navbar from "@/components/Navbar";
import { ArrowLeft } from "lucide-react";

const ProductPage = () => {
  const searchParams = useSearchParams();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const categories = ["Motif", "Pola", "Aksara", "Ornamen", "Ilustrasi", "Texture", "Generatif"];

  // Load initial values from URL parameters
  useEffect(() => {
    const categoryParam = searchParams.get('category');
    const searchParam = searchParams.get('search');
    
    if (categoryParam) {
      setSelectedCategory(categoryParam);
    }
    if (searchParam) {
      setSearchQuery(searchParam);
    }
  }, [searchParams]);

  const filteredProducts = products.filter((product) => {
    const matchesCategory = !selectedCategory || product.kategori === selectedCategory;
    const matchesSearch = !searchQuery || 
      product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    return matchesCategory && matchesSearch;
  });

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div>
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <div className="mb-6">
          <Link
            href="/"
            className="inline-flex items-center text-gray-600 hover:text-primary transition-colors"
          >
            <ArrowLeft size={20} className="mr-2" />
            Kembali ke Beranda
          </Link>
        </div>

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-normal text-gray-900 mb-4">Koleksi Aset Budaya</h1>
          
          {/* Search */}
          <div className="mb-6">
            <input
              type="text"
              placeholder="Cari aset budaya..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full max-w-md px-4 py-3 border border-gray-300 rounded-full focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
            />
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-3 mb-6">
            <button
              onClick={() => setSelectedCategory(null)}
              className={`px-6 py-2 rounded-full font-normal transition-colors ${
                !selectedCategory
                  ? "bg-primary text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Semua
            </button>
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2 rounded-full font-normal transition-colors ${
                  selectedCategory === category
                    ? "bg-primary text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600">
            Menampilkan {filteredProducts.length} dari {products.length} aset
          </p>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
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
                <h3 className="font-normal text-lg text-gray-900 mb-2 group-hover:text-primary transition-colors">
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

        {/* Empty State */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">Tidak ada aset yang ditemukan</p>
            <p className="text-gray-400 text-sm mt-2">Coba ubah filter atau kata kunci pencarian</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductPage;