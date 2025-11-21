import Link from "next/link";
import { ShoppingCart } from "lucide-react";

const Navbar = () => {
  return (
    <nav className="flex items-center justify-between px-6 py-4 bg-white">
      {/* Left - Logo */}
      <div>
        <Link href="/" className="text-2xl font-bold text-primary">
          LumbungRupa
        </Link>
      </div>

      {/* Right - Cart and Auth Buttons */}
      <div className="flex items-center gap-4">
        {/* Cart Icon */}
        <button className="p-2 text-gray-600 hover:text-primary transition-colors">
          <ShoppingCart size={24} />
        </button>

        {/* Auth Buttons */}
        <div className="flex gap-3">
          <Link
            className="px-6 py-3 text-primary border border-primary rounded-full hover:bg-primary hover:text-white transition-colors text-center whitespace-nowrap"
            href="/auth/cultural-partner/login"
          >
            Masuk sebagai Mitra Budaya
          </Link>
          <Link
            className="px-6 py-3 bg-primary text-white rounded-full hover:bg-primary/90 transition-colors text-center whitespace-nowrap"
            href="/auth/license-buyer/login"
          >
            Masuk sebagai Pembeli Lisensi
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
