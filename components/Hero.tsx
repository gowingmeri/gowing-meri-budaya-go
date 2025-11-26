"use client";
import React, { useState } from "react";
import { Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Hero = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  const categories = [
    { id: "motif", name: "Motif", description: "Parang, Kawung, Lereng, Mega Mendung" },
    { id: "pola", name: "Pola / Pattern", description: "Pattern repetitif untuk design, fashion, UI, texture" },
    { id: "aksara", name: "Aksara / Karakter", description: "Hanacaraka (Jawa), Aksara Sunda, Bali, Bugis" },
    { id: "ornamen", name: "Ornamen", description: "Ornamen Toraja, Dayak, Bali, Minang" },
    { id: "ilustrasi", name: "Ilustrasi Budaya 2D", description: "Wayang, ikon budaya, simbol adat" },
    { id: "texture", name: "Texture / Surface", description: "Kayu ukiran, anyaman, kain songket, batik texture" },
    { id: "generatif", name: "Aset Generatif", description: "Kategori khusus untuk aset hasil AI generatif etis" },
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/product?search=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      router.push('/product');
    }
  };

  const handleCategoryClick = (categoryName: string) => {
    router.push(`/product?category=${encodeURIComponent(categoryName)}`);
  };

  return (
    <section className="bg-white py-16 lg:py-24 relative overflow-hidden min-h-[80vh] flex items-center">
      {/* Background Image with Animation */}
      <div className="absolute inset-0 flex items-center justify-center">
        <Image
          src="/branding/circle.png"
          alt="Background circle"
          width={800}
          height={800}
          className="opacity-10 object-contain animate-[spin_60s_linear_infinite]"
          priority={false}
        />
      </div>
      
      <div className="container mx-auto px-4 lg:px-8 relative z-10 w-full">
        {/* Main Content */}
        <div className="text-center mb-16 lg:mb-20">
          {/* Headline with fade-in animation */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-normal text-gray-900 mb-8 leading-tight animate-[fadeInUp_0.8s_ease-out]">
            Bank IP Digital dengan AI <br />untuk{" "}
            <span className="text-primary bg-clip-text">Budaya Indonesia</span>
          </h1>
          
          {/* Subheadline with delayed fade-in */}
          <p className="text-xl md:text-2xl text-gray-600 mb-10 max-w-4xl mx-auto leading-relaxed animate-[fadeInUp_0.8s_ease-out_0.2s_both]">
            Temukan, lisensikan, atau ciptakan aset budaya baru dengan teknologi AI generatif 
            yang dilatih secara etis dari warisan budaya terverifikasi.
          </p>

          {/* Search Input with glassmorphism */}
          <div className="max-w-2xl mx-auto mb-16 animate-[fadeInUp_0.8s_ease-out_0.4s_both]">
            <form onSubmit={handleSearch} className="relative group">
              <input
                type="text"
                placeholder="Cari aset budaya..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-8 py-5 pr-16 text-lg border-2 border-gray-200 rounded-full focus:border-primary focus:outline-none focus:ring-4 focus:ring-primary/10 transition-all duration-300 bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl group-hover:border-gray-300"
              />
              <button 
                type="submit"
                className="absolute right-3 top-1/2 -translate-y-1/2 p-3 bg-primary text-white rounded-full hover:bg-primary/90 hover:scale-110 transition-all duration-300 shadow-lg active:scale-95"
              >
                <Search size={24} />
              </button>
            </form>
          </div>
        </div>

        {/* Categories Section */}
        <div className="mb-12 animate-[fadeInUp_0.8s_ease-out_0.6s_both]">
          <h2 className="text-3xl md:text-4xl font-normal text-gray-900 mb-10 text-center">
            Kategori Aset Budaya
          </h2>
          
          {/* Category Horizontal Scroll Container */}
          <div className="w-full overflow-hidden mask-fade">
            <div className="flex gap-5 animate-scroll hover:[animation-play-state:paused]">
              {/* First set of categories */}
              {categories.map((category) => (
                <div key={category.id} className="relative group flex-shrink-0">
                  <button 
                    onClick={() => handleCategoryClick(category.name)}
                    className="px-8 py-4 border-2 border-gray-200 rounded-full transition-all duration-300 hover:border-primary hover:shadow-xl hover:bg-primary/5 whitespace-nowrap hover:scale-105 active:scale-95 backdrop-blur-sm bg-white/60"
                  >
                    <h3 className="font-medium text-lg text-gray-900 group-hover:text-primary transition-colors">
                      {category.name}
                    </h3>
                  </button>
                  
                  {/* Hover Description Tooltip */}
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-3 px-4 py-3 bg-gray-900/95 backdrop-blur-md text-white text-sm rounded-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible group-hover:-translate-y-1 transition-all duration-300 whitespace-nowrap z-10 pointer-events-none shadow-2xl">
                    {category.description}
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-[6px] border-transparent border-t-gray-900/95"></div>
                  </div>
                </div>
              ))}
              {/* Duplicate set for seamless loop */}
              {categories.map((category) => (
                <div key={`${category.id}-duplicate`} className="relative group flex-shrink-0">
                  <button 
                    onClick={() => handleCategoryClick(category.name)}
                    className="px-8 py-4 border-2 border-gray-200 rounded-full transition-all duration-300 hover:border-primary hover:shadow-xl hover:bg-primary/5 whitespace-nowrap hover:scale-105 active:scale-95 backdrop-blur-sm bg-white/60"
                  >
                    <h3 className="font-medium text-lg text-gray-900 group-hover:text-primary transition-colors">
                      {category.name}
                    </h3>
                  </button>
                  
                  {/* Hover Description Tooltip */}
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-3 px-4 py-3 bg-gray-900/95 backdrop-blur-md text-white text-sm rounded-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible group-hover:-translate-y-1 transition-all duration-300 whitespace-nowrap z-10 pointer-events-none shadow-2xl">
                    {category.description}
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-[6px] border-transparent border-t-gray-900/95"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center animate-[fadeInUp_0.8s_ease-out_0.8s_both]">
          <div className="flex flex-col sm:flex-row gap-5 justify-center items-center">
            <Link 
              href="/product"
              className="w-full sm:w-auto px-10 py-4 bg-primary text-white rounded-full font-medium hover:bg-primary/90 hover:scale-105 active:scale-95 transition-all duration-300 shadow-xl hover:shadow-2xl"
            >
              Jelajahi Koleksi
            </Link>
            <button className="w-full sm:w-auto px-10 py-4 border-2 border-primary text-primary rounded-full font-medium hover:bg-primary hover:text-white hover:scale-105 active:scale-95 transition-all duration-300 shadow-lg hover:shadow-xl">
              Pelajari Lebih Lanjut
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .mask-fade {
          -webkit-mask-image: linear-gradient(to right, transparent, black 5%, black 95%, transparent);
          mask-image: linear-gradient(to right, transparent, black 5%, black 95%, transparent);
        }
      `}</style>
    </section>
  );
};

export default Hero;