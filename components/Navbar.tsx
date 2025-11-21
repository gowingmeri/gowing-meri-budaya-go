"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ShoppingCart, Menu, X } from "lucide-react";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [cartItemCount, setCartItemCount] = useState(0);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Load cart count from localStorage
  useEffect(() => {
    const updateCartCount = () => {
      const savedCart = localStorage.getItem('lumbungRupa_cart');
      if (savedCart) {
        try {
          const cartItems = JSON.parse(savedCart);
          const totalItems = cartItems.reduce((total: number, item: any) => total + item.quantity, 0);
          setCartItemCount(totalItems);
        } catch (error) {
          setCartItemCount(0);
        }
      } else {
        setCartItemCount(0);
      }
    };

    updateCartCount();
    
    // Listen for storage changes
    window.addEventListener('storage', updateCartCount);
    
    // Listen for custom cart update events
    window.addEventListener('cartUpdated', updateCartCount);

    return () => {
      window.removeEventListener('storage', updateCartCount);
      window.removeEventListener('cartUpdated', updateCartCount);
    };
  }, []);

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left - Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="text-xl sm:text-2xl font-bold text-primary">
              LumbungRupa
            </Link>
          </div>

          {/* Desktop - Right side */}
          <div className="hidden md:flex items-center gap-4">
            {/* Cart Icon */}
            <Link href="/cart" className="relative p-2 text-gray-600 hover:text-primary transition-colors">
              <ShoppingCart size={24} />
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartItemCount > 99 ? '99+' : cartItemCount}
                </span>
              )}
            </Link>

            {/* Auth Buttons */}
            <div className="flex gap-3">
              <Link
                className="px-4 lg:px-6 py-2 lg:py-3 text-sm lg:text-base text-primary border border-primary rounded-full hover:bg-primary hover:text-white transition-colors text-center whitespace-nowrap"
                href="/auth/cultural-partner/login"
              >
                Masuk sebagai Mitra Budaya
              </Link>
              <Link
                className="px-4 lg:px-6 py-2 lg:py-3 text-sm lg:text-base bg-primary text-white rounded-full hover:bg-primary/90 transition-colors text-center whitespace-nowrap"
                href="/auth/license-buyer/login"
              >
                Masuk sebagai Pembeli Lisensi
              </Link>
            </div>
          </div>

          {/* Mobile - Right side */}
          <div className="md:hidden flex items-center gap-2">
            {/* Cart Icon */}
            <Link href="/cart" className="relative p-2 text-gray-600 hover:text-primary transition-colors">
              <ShoppingCart size={20} />
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary text-white text-xs rounded-full w-4 h-4 flex items-center justify-center text-xs">
                  {cartItemCount > 9 ? '9+' : cartItemCount}
                </span>
              )}
            </Link>

            {/* Mobile menu button */}
            <button
              onClick={toggleMobileMenu}
              className="p-2 text-gray-600 hover:text-primary transition-colors"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-white border-t border-gray-200">
              <div className="space-y-3 px-3 py-4">
                <Link
                  className="block w-full p-4 text-center text-primary border border-primary rounded-full hover:bg-primary hover:text-white transition-colors"
                  href="/auth/cultural-partner/login"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Masuk sebagai Mitra Budaya
                </Link>
                <Link
                  className="block w-full p-4 text-center bg-primary text-white rounded-full hover:bg-primary/90 transition-colors"
                  href="/auth/license-buyer/login"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Masuk sebagai Pembeli Lisensi
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
