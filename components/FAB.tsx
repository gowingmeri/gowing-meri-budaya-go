"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";

const FAB = () => {
  const [userRole, setUserRole] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkUserRole = () => {
      const role = localStorage.getItem('roleUser');
      setUserRole(role);
      setIsLoading(false);
    };

    checkUserRole();
    
    // Listen for storage changes
    window.addEventListener('storage', checkUserRole);
    
    return () => {
      window.removeEventListener('storage', checkUserRole);
    };
  }, []);

  // Don't show FAB if user is not logged in or still loading
  if (isLoading || !userRole) {
    return null;
  }

  return (
    <Link 
      href="/rupagen-ai"
      className="fixed bottom-5 right-5 bg-primary text-white p-5 rounded-full shadow-lg hover:bg-primary/90 transition-colors z-50"
    >
      RupaGen AI
    </Link>
  );
};

export default FAB;