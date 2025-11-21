"use client";
import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const LicenseBuyerAuthRegisterAccountDataPage = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    namaLengkap: "",
    email: "",
    kataSandi: "",
    nomorTelepon: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Account data submission:", formData);
    // Navigate to next page
    router.push("/auth/license-buyer/register/company-profile");
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Card Container */}
        <div className="bg-white rounded-xl">
          {/* Step Indicator */}
          <div className="p-5 border-b border-gray-200">
            <div className="flex items-center justify-center space-x-2 mb-2">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center text-sm font-medium">
                  1
                </div>
                <div className="w-8 h-1 bg-gray-300"></div>
                <div className="w-8 h-8 bg-gray-300 text-gray-500 rounded-full flex items-center justify-center text-sm">
                  2
                </div>
                <div className="w-8 h-1 bg-gray-300"></div>
                <div className="w-8 h-8 bg-gray-300 text-gray-500 rounded-full flex items-center justify-center text-sm">
                  3
                </div>
              </div>
            </div>
            <p className="text-center text-sm text-gray-600">Langkah 1 dari 3</p>
          </div>

          {/* Header */}
          <div className="p-5">
            <div className="flex items-center justify-center">
              <h1 className="text-2xl justify-center font-semibold text-gray-900">
                Data Akun Pembeli Lisensi
              </h1>
            </div>
          </div>

          {/* Form Content */}
          <div className="p-6">
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Input Nama Lengkap */}
              <div>
                <label
                  htmlFor="namaLengkap"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Nama Lengkap <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="namaLengkap"
                  name="namaLengkap"
                  value={formData.namaLengkap}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 transition-all"
                  placeholder="Masukkan nama lengkap PIC"
                  required
                />
                <p className="text-xs text-gray-500 mt-1">Nama PIC perusahaan</p>
              </div>

              {/* Input Email */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 transition-all"
                  placeholder="Masukkan email perusahaan"
                  required
                />
                <p className="text-xs text-gray-500 mt-1">Untuk login dan billing</p>
              </div>

              {/* Input Kata Sandi */}
              <div>
                <label
                  htmlFor="kataSandi"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Kata Sandi <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="kataSandi"
                    name="kataSandi"
                    value={formData.kataSandi}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 pr-12 border border-gray-300 rounded-xl focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 transition-all"
                    placeholder="Masukkan kata sandi"
                    minLength={8}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
                <p className="text-xs text-gray-500 mt-1">Untuk akses akun</p>
              </div>

              {/* Input Nomor Telepon */}
              <div>
                <label
                  htmlFor="nomorTelepon"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Nomor Telepon
                </label>
                <input
                  type="tel"
                  id="nomorTelepon"
                  name="nomorTelepon"
                  value={formData.nomorTelepon}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 transition-all"
                  placeholder="Masukkan nomor WhatsApp (opsional)"
                />
                <p className="text-xs text-gray-500 mt-1">WhatsApp</p>
              </div>

              {/* Tombol Selanjutnya */}
              <Link
                href="/auth/license-buyer/register/company-profile"
                className="block w-full p-5 bg-primary text-white rounded-full font-medium shadow-sm hover:bg-primary transition-all duration-200 text-center"
              >
                Selanjutnya
              </Link>
            </form>

            {/* Footer */}
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600 mb-3">
                Sudah memiliki akun?
              </p>
              <Link
                href="/auth/license-buyer/login"
                className="inline-block w-full p-5 border border-gray-300 text-gray-700 rounded-full font-medium hover:bg-gray-50 transition-all duration-200 text-center"
              >
                Masuk ke akun Anda
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LicenseBuyerAuthRegisterAccountDataPage;