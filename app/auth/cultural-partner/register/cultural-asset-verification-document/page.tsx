"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const CulturalPartnerRegisterCulturalAssetVerificationDocumentPage = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    namaOrganisasi: "",
    jenisOrganisasi: "",
    alamatOrganisasi: "",
    tautanPortofolio: "",
  });

  const jenisOrganisasiOptions = [
    { value: "sanggar", label: "Sanggar" },
    { value: "museum", label: "Museum" },
    { value: "yayasan", label: "Yayasan" },
    { value: "kurator", label: "Kurator" },
    { value: "fotografer", label: "Fotografer" },
    { value: "desainer-grafis", label: "Desainer Grafis" },
  ];

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Organization data submission:", formData);
    // Navigate to next page
    router.push("/auth/cultural-partner/register/cultural-partner-profile");
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
                Data Organisasi
              </h1>
            </div>
          </div>

          {/* Form Content */}
          <div className="p-6">
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Input Nama Organisasi */}
              <div>
                <label
                  htmlFor="namaOrganisasi"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Nama Organisasi <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="namaOrganisasi"
                  name="namaOrganisasi"
                  value={formData.namaOrganisasi}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 transition-all"
                  placeholder="Masukkan nama organisasi"
                  required
                />
                <p className="text-xs text-gray-500 mt-1">
                  Nama sanggar / studio / museum / yayasan
                </p>
              </div>

              {/* Select Jenis Organisasi */}
              <div>
                <label
                  htmlFor="jenisOrganisasi"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Jenis Organisasi <span className="text-red-500">*</span>
                </label>
                <select
                  id="jenisOrganisasi"
                  name="jenisOrganisasi"
                  value={formData.jenisOrganisasi}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 transition-all"
                  required
                >
                  <option value="">Pilih jenis organisasi</option>
                  {jenisOrganisasiOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Input Alamat Organisasi */}
              <div>
                <label
                  htmlFor="alamatOrganisasi"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Alamat Organisasi
                </label>
                <textarea
                  id="alamatOrganisasi"
                  name="alamatOrganisasi"
                  value={formData.alamatOrganisasi}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 transition-all resize-none"
                  placeholder="Masukkan alamat fisik (opsional)"
                />
                <p className="text-xs text-gray-500 mt-1">Alamat fisik</p>
              </div>

              {/* Input Tautan Portofolio */}
              <div>
                <label
                  htmlFor="tautanPortofolio"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Tautan Portofolio
                </label>
                <input
                  type="url"
                  id="tautanPortofolio"
                  name="tautanPortofolio"
                  value={formData.tautanPortofolio}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 transition-all"
                  placeholder="https://... (opsional)"
                />
                <p className="text-xs text-gray-500 mt-1">Web/Drive/IG dll.</p>
              </div>

              {/* Tombol Selanjutnya */}
              <Link
                href="/auth/cultural-partner/register/cultural-partner-profile"
                className="block w-full p-5 bg-primary text-white rounded-full font-medium shadow-sm hover:bg-primary transition-all duration-200 text-center"
              >
                Selanjutnya
              </Link>
            </form>

            {/* Navigation */}
            <div className="mt-6 text-center">
              <Link
                href="/auth/cultural-partner/register/account-data"
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

export default CulturalPartnerRegisterCulturalAssetVerificationDocumentPage;
