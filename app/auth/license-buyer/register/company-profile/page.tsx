"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const LicenseBuyerAuthRegisterCompanyProfilePage = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    namaPerusahaan: "",
    jenisIndustri: "",
    alamatPerusahaan: "",
    situsPerusahaan: "",
    nomorRegistrasiPerusahaan: "",
  });

  const jenisIndustriOptions = [
    { value: "game", label: "Game" },
    { value: "metaverse", label: "Metaverse" },
    { value: "film", label: "Film" },
    { value: "fashion", label: "Fashion" },
    { value: "arsitektur", label: "Arsitektur" },
    { value: "interior", label: "Interior" },
    { value: "animasi", label: "Animasi" },
    { value: "lainnya", label: "Lainnya" },
  ];

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // save to localStorage
    try {
      localStorage.setItem('register_company_profile', JSON.stringify(formData));
    } catch (err) {
      console.warn('storage error', err);
    }
    router.push('/auth/license-buyer/register/license-purchase-activation');
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
                  ✓
                </div>
                <div className="w-8 h-1 bg-primary"></div>
                <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center text-sm font-medium">
                  2
                </div>
                <div className="w-8 h-1 bg-gray-300"></div>
                <div className="w-8 h-8 bg-gray-300 text-gray-500 rounded-full flex items-center justify-center text-sm">
                  3
                </div>
              </div>
            </div>
            <p className="text-center text-sm text-gray-600">Langkah 2 dari 3</p>
          </div>

          {/* Header */}
          <div className="p-5">
            <div className="flex items-center justify-center">
              <h1 className="text-2xl justify-center font-semibold text-gray-900">
                Profil Perusahaan
              </h1>
            </div>
          </div>

          {/* Form Content */}
          <div className="p-6">
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Input Nama Perusahaan */}
              <div>
                <label
                  htmlFor="namaPerusahaan"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Nama Perusahaan <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="namaPerusahaan"
                  name="namaPerusahaan"
                  value={formData.namaPerusahaan}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 transition-all"
                  placeholder="Masukkan nama perusahaan"
                  required
                />
                <p className="text-xs text-gray-500 mt-1">Nama perusahaan/studio</p>
              </div>

              {/* Select Jenis Industri */}
              <div>
                <label
                  htmlFor="jenisIndustri"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Jenis Industri <span className="text-red-500">*</span>
                </label>
                <select
                  id="jenisIndustri"
                  name="jenisIndustri"
                  value={formData.jenisIndustri}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 transition-all"
                  required
                >
                  <option value="">Pilih jenis industri</option>
                  {jenisIndustriOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Input Alamat Perusahaan */}
              <div>
                <label
                  htmlFor="alamatPerusahaan"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Alamat Perusahaan
                </label>
                <textarea
                  id="alamatPerusahaan"
                  name="alamatPerusahaan"
                  value={formData.alamatPerusahaan}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 transition-all resize-none"
                  placeholder="Masukkan alamat perusahaan (opsional)"
                />
                <p className="text-xs text-gray-500 mt-1">Lokasi perusahaan</p>
              </div>

              {/* Input Situs Perusahaan */}
              <div>
                <label
                  htmlFor="situsPerusahaan"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Situs Perusahaan
                </label>
                <input
                  type="url"
                  id="situsPerusahaan"
                  name="situsPerusahaan"
                  value={formData.situsPerusahaan}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 transition-all"
                  placeholder="https://... (opsional)"
                />
                <p className="text-xs text-gray-500 mt-1">Website</p>
              </div>

              {/* Input Nomor Registrasi Perusahaan */}
              <div>
                <label
                  htmlFor="nomorRegistrasiPerusahaan"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Nomor Registrasi Perusahaan
                </label>
                <input
                  type="text"
                  id="nomorRegistrasiPerusahaan"
                  name="nomorRegistrasiPerusahaan"
                  value={formData.nomorRegistrasiPerusahaan}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 transition-all"
                  placeholder="Masukkan nomor registrasi (opsional)"
                />
                <p className="text-xs text-gray-500 mt-1">Nomor legal perusahaan</p>
              </div>

              {/* Tombol Selanjutnya */}
              <button
                type="submit"
                className="block w-full p-5 bg-primary text-white rounded-full font-medium shadow-sm hover:bg-primary transition-all duration-200 text-center"
              >
                Selanjutnya
              </button>
            </form>

            {/* Navigation */}
            <div className="mt-6 text-center">
              <Link
                href="/auth/license-buyer/register/account-data"
                className="inline-block w-full p-5 border border-gray-300 text-gray-700 rounded-full font-medium hover:bg-gray-50 transition-all duration-200 text-center"
              >
                Kembali
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LicenseBuyerAuthRegisterCompanyProfilePage;