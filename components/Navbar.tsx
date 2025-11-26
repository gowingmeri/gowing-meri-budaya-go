"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ShoppingCart, Menu, X, LogOut } from "lucide-react";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [cartItemCount, setCartItemCount] = useState(0);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Load cart count and user role from localStorage
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

    const updateUserRole = () => {
      const role = localStorage.getItem('roleUser');
      setUserRole(role);
      setIsLoading(false);
    };

    updateCartCount();
    updateUserRole();
    
    // Listen for storage changes
    window.addEventListener('storage', updateCartCount);
    window.addEventListener('storage', updateUserRole);
    
    // Listen for custom cart update events
    window.addEventListener('cartUpdated', updateCartCount);

    return () => {
      window.removeEventListener('storage', updateCartCount);
      window.removeEventListener('storage', updateUserRole);
      window.removeEventListener('cartUpdated', updateCartCount);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('roleUser');
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    localStorage.removeItem('lumbungRupa_cart');
    setUserRole(null);
    setCartItemCount(0);
    window.location.href = '/';
  };

  const getNavItems = () => {
    switch (userRole) {
      case 'mitra_budaya':
      case 'CULTURAL_PARTNER':
        return [
          { href: '/cultural-partner/dashboard', label: 'Dashboard' },
          { href: '/cultural-partner/product', label: 'Aset Saya' },
          { href: '/cultural-partner/upload', label: 'Unggah Aset' },
          { href: '/rupagen-ai', label: 'RupaGen AI' },
          { href: '/cultural-partner/profile', label: 'Profil' }
        ];
      case 'pembeli_lisensi':
      case 'LICENSE_BUYER':
        return [
          { href: '/product', label: 'Semua Aset' },
          { href: '/history', label: 'Riwayat Pembelian Lisensi' },
          { href: '/rupagen-ai', label: 'RupaGen AI' },
          { href: '/profile', label: 'Profil' }
        ];
      case 'admin_lumbung_rupa':
      case 'ADMIN':
        return [
          { href: '/admin/approvals', label: 'Persetujuan' },
          { href: '/admin/profile', label: 'Profil' }
        ];
      default:
        return [];
    }
  };

  const navItems = getNavItems();

  // Show loading state while checking localStorage
  if (isLoading) {
    return (
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex-shrink-0">
              <Link href="/" className="text-xl sm:text-2xl font-bold text-primary">
                LumbungRupa
              </Link>
            </div>
          </div>
        </div>
      </nav>
    );
  }

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left - Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="text-xl sm:text-2xl font-bold text-primary">
              LumbungRupa
            </Link>
          </div>

          {/* Desktop - Right side */}
          <div className="hidden md:flex items-center gap-4">
            {userRole ? (
              <>
                {/* Show cart only for LICENSE_BUYER */}
                {userRole === 'LICENSE_BUYER' && (
                  <Link href="/cart" className="relative p-2 text-gray-600 hover:text-primary transition-colors">
                    <ShoppingCart size={24} />
                    {cartItemCount > 0 && (
                      <span className="absolute -top-1 -right-1 bg-primary text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                        {cartItemCount > 99 ? '99+' : cartItemCount}
                      </span>
                    )}
                  </Link>
                )}

                {/* Navigation Items */}
                <div className="flex items-center gap-1">
                  {navItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="px-4 py-2 text-sm text-gray-700 hover:text-primary transition-colors"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>

                {/* Logout Button */}
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 px-4 py-2 text-sm text-gray-600 hover:text-red-600 transition-colors"
                >
                  <LogOut size={16} />
                  Logout
                </button>
              </>
            ) : (
              <>
                {/* Cart Icon for guests */}
                <Link href="/cart" className="relative p-2 text-gray-600 hover:text-primary transition-colors">
                  <ShoppingCart size={24} />
                  {cartItemCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-primary text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {cartItemCount > 99 ? '99+' : cartItemCount}
                    </span>
                  )}
                </Link>

                {/* Auth Buttons for guests */}
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
              </>
            )}
          </div>

          {/* Mobile - Right side */}
          <div className="md:hidden flex items-center gap-2">
            {/* Show cart only for LICENSE_BUYER or guests */}
            {(userRole === 'LICENSE_BUYER' || !userRole) && (
              <Link href="/cart" className="relative p-2 text-gray-600 hover:text-primary transition-colors">
                <ShoppingCart size={20} />
                {cartItemCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-primary text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                    {cartItemCount > 9 ? '9+' : cartItemCount}
                  </span>
                )}
              </Link>
            )}

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
                {userRole ? (
                  <>
                    {/* Navigation Items for authenticated users */}
                    {navItems.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className="block w-full p-4 text-center text-gray-700 border border-gray-300 rounded-full hover:bg-gray-50 transition-colors"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {item.label}
                      </Link>
                    ))}
                    
                    {/* Logout Button */}
                    <button
                      onClick={() => {
                        handleLogout();
                        setIsMobileMenuOpen(false);
                      }}
                      className="block w-full p-4 text-center text-red-600 border border-red-300 rounded-full hover:bg-red-50 transition-colors"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    {/* Auth Buttons for guests */}
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
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
