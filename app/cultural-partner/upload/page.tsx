// @/app/cultural-partner/upload/page.tsx
"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import { ArrowLeft, Upload, X, Plus, Check } from "lucide-react";

const CulturalPartnerUploadPage = () => {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    description: "",
    tags: "",
    culturalOrigin: "",
    culturalMeaning: "",
    historicalContext: "",
    licenseType: "commercial",
    basePrice: "",
    resolution: "",
    fileFormat: "",
    culturalSignificance: "",
    usageGuidelines: ""
  });

  const categories = [
    { value: "motif", label: "Motif" },
    { value: "pola", label: "Pola / Pattern" },
    { value: "aksara", label: "Aksara / Karakter" },
    { value: "ornamen", label: "Ornamen" },
    { value: "ilustrasi", label: "Ilustrasi Budaya 2D" },
    { value: "texture", label: "Texture / Surface" },
    { value: "generatif", label: "Aset Generatif" }
  ];

  const culturalOrigins = [
    "Jawa", "Bali", "Sumatera", "Kalimantan", "Sulawesi", "Papua", "Nusa Tenggara", "Maluku"
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setUploadedFiles(prev => [...prev, ...files]);
  };

  const removeFile = (index: number) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    (async () => {
      try {
        if (!uploadedFiles || uploadedFiles.length === 0) {
          alert('Tidak ada file untuk diupload')
          return
        }

        const stored = localStorage.getItem('user')
        if (!stored) {
          alert('Anda harus login sebelum mengupload aset')
          router.push('/auth/cultural-partner/login')
          return
        }
        const user = JSON.parse(stored)
        const uploadedUrls: string[] = []

        for (const file of uploadedFiles) {
          const fd = new FormData()
          fd.append('file', file)
          fd.append('folder', `assets/${user.id}`)

          const res = await fetch('/api/upload/cloudinary', { method: 'POST', body: fd })
          if (!res.ok) {
            const err = await res.json().catch(() => ({ error: res.statusText }))
            throw new Error(err.error || 'Upload gagal')
          }
          const data = await res.json()
          if (data?.secure_url) uploadedUrls.push(data.secure_url)
          else if (data?.secureUrl) uploadedUrls.push(data.secureUrl)
        }

        // TODO: create an asset record in backend. For now we store uploaded URLs to localStorage as a draft
        localStorage.setItem('lastUploadedAssetUrls', JSON.stringify(uploadedUrls))

        // show success and navigate to dashboard
        alert('Upload berhasil')
        router.push('/cultural-partner/dashboard')
      } catch (err: any) {
        console.error(err)
        alert('Gagal mengupload file: ' + (err?.message || 'unknown'))
      }
    })()
  };

  const nextStep = () => {
    if (currentStep < 3) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const isStepValid = () => {
    switch (currentStep) {
      case 1:
        return uploadedFiles.length > 0;
      case 2:
        return formData.title && formData.category && formData.description && formData.culturalOrigin;
      case 3:
        return formData.licenseType && formData.basePrice;
      default:
        return false;
    }
  };

  return (
    <div>
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <Link
              href="/cultural-partner/dashboard"
              className="inline-flex items-center text-gray-600 hover:text-primary transition-colors mb-4"
            >
              <ArrowLeft size={20} className="mr-2" />
              Kembali ke Dashboard
            </Link>
            
            <h1 className="text-3xl font-normal text-gray-900 mb-2">Upload Aset Budaya</h1>
            <p className="text-gray-600">Bagikan warisan budaya Indonesia dengan dunia</p>
          </div>

          {/* Step Indicator */}
          <div className="mb-8">
            <div className="flex items-center justify-center space-x-4 mb-6">
              <div className="flex items-center space-x-2">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium ${
                  currentStep >= 1 ? 'bg-primary text-white' : 'bg-gray-300 text-gray-500'
                }`}>
                  {currentStep > 1 ? <Check size={20} /> : '1'}
                </div>
                <span className="text-sm text-gray-600 hidden sm:inline">Upload File</span>
              </div>
              
              <div className={`w-12 h-1 ${currentStep >= 2 ? 'bg-primary' : 'bg-gray-300'}`}></div>
              
              <div className="flex items-center space-x-2">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium ${
                  currentStep >= 2 ? 'bg-primary text-white' : 'bg-gray-300 text-gray-500'
                }`}>
                  {currentStep > 2 ? <Check size={20} /> : '2'}
                </div>
                <span className="text-sm text-gray-600 hidden sm:inline">Informasi Aset</span>
              </div>
              
              <div className={`w-12 h-1 ${currentStep >= 3 ? 'bg-primary' : 'bg-gray-300'}`}></div>
              
              <div className="flex items-center space-x-2">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium ${
                  currentStep >= 3 ? 'bg-primary text-white' : 'bg-gray-300 text-gray-500'
                }`}>
                  3
                </div>
                <span className="text-sm text-gray-600 hidden sm:inline">Review & Publish</span>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} noValidate>
            <div className="bg-white rounded-2xl border border-gray-200 p-6 lg:p-8">
              {/* Step 1: File Upload */}
              {currentStep === 1 && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">Upload File Aset Budaya</h2>
                    
                    {/* File Upload Area */}
                    <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-primary transition-colors">
                      <input
                        type="file"
                        multiple
                        accept="image/*,.svg,.ai,.psd,.eps"
                        onChange={handleFileUpload}
                        className="hidden"
                        id="file-upload"
                      />
                      <label htmlFor="file-upload" className="cursor-pointer">
                        <Upload className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-gray-900 mb-2">
                          Drag & drop file atau klik untuk upload
                        </h3>
                        <p className="text-sm text-gray-600 mb-4">
                          Mendukung JPG, PNG, SVG, AI, PSD, EPS (Max 50MB per file)
                        </p>
                        <div className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-full hover:bg-primary/90 transition-colors">
                          <Plus size={20} />
                          Pilih File
                        </div>
                      </label>
                    </div>
                    
                    {/* Guidelines */}
                    <div className="mt-6 p-4 bg-blue-50 rounded-xl">
                      <h4 className="font-medium text-gray-900 mb-2">Panduan Upload:</h4>
                      <ul className="text-sm text-gray-700 space-y-1">
                        <li>• Resolusi minimal 1024x1024px untuk kualitas terbaik</li>
                        <li>• File harus asli dan memiliki hak legal untuk didistribusikan</li>
                        <li>• Pastikan gambar berkualitas tinggi tanpa watermark</li>
                        <li>• Sertakan variasi jika tersedia (warna, ukuran, dll)</li>
                      </ul>
                    </div>
                    
                    {/* Uploaded Files */}
                    {uploadedFiles.length > 0 && (
                      <div className="mt-6">
                        <h4 className="font-medium text-gray-900 mb-3">File yang diupload ({uploadedFiles.length}):</h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {uploadedFiles.map((file, index) => (
                            <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                              <div className="flex items-center space-x-3">
                                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                                  <Upload size={16} className="text-primary" />
                                </div>
                                <div>
                                  <p className="font-medium text-gray-900 text-sm truncate max-w-32">{file.name}</p>
                                  <p className="text-xs text-gray-600">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                                </div>
                              </div>
                              <button
                                type="button"
                                onClick={() => removeFile(index)}
                                className="p-1 text-red-600 hover:bg-red-100 rounded-full transition-colors"
                              >
                                <X size={16} />
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Step 2: Asset Information */}
              {currentStep === 2 && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">Informasi Aset Budaya</h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Basic Information */}
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Judul Aset <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          name="title"
                          value={formData.title}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                          placeholder="Contoh: Motif Parang Klasik Yogyakarta"
                          required
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Kategori <span className="text-red-500">*</span>
                        </label>
                        <select
                          name="category"
                          value={formData.category}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                          required
                        >
                          <option value="">Pilih kategori</option>
                          {categories.map(cat => (
                            <option key={cat.value} value={cat.value}>{cat.label}</option>
                          ))}
                        </select>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Asal Budaya <span className="text-red-500">*</span>
                        </label>
                        <select
                          name="culturalOrigin"
                          value={formData.culturalOrigin}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                          required
                        >
                          <option value="">Pilih asal budaya</option>
                          {culturalOrigins.map(origin => (
                            <option key={origin} value={origin}>{origin}</option>
                          ))}
                        </select>
                      </div>
                      
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Deskripsi <span className="text-red-500">*</span>
                        </label>
                        <textarea
                          name="description"
                          value={formData.description}
                          onChange={handleInputChange}
                          rows={4}
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all resize-none"
                          placeholder="Jelaskan tentang aset budaya ini, sejarah, dan penggunaannya..."
                          required
                        />
                      </div>
                      
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Makna Budaya & Filosofi
                        </label>
                        <textarea
                          name="culturalMeaning"
                          value={formData.culturalMeaning}
                          onChange={handleInputChange}
                          rows={3}
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all resize-none"
                          placeholder="Jelaskan makna filosofis dan nilai budaya dari aset ini..."
                        />
                      </div>
                      
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Konteks Sejarah
                        </label>
                        <textarea
                          name="historicalContext"
                          value={formData.historicalContext}
                          onChange={handleInputChange}
                          rows={3}
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all resize-none"
                          placeholder="Ceritakan sejarah dan latar belakang aset budaya ini..."
                        />
                      </div>
                      
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Tags/Kata Kunci
                        </label>
                        <input
                          type="text"
                          name="tags"
                          value={formData.tags}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                          placeholder="batik, parang, yogyakarta, klasik (pisahkan dengan koma)"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 3: Licensing & Publication */}
              {currentStep === 3 && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">Lisensi & Publikasi</h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Jenis Lisensi Default <span className="text-red-500">*</span>
                        </label>
                        <select
                          name="licenseType"
                          value={formData.licenseType}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                          required
                        >
                          <option value="personal">Personal</option>
                          <option value="commercial">Commercial</option>
                          <option value="enterprise">Enterprise</option>
                        </select>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Harga Base (IDR) <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="number"
                          name="basePrice"
                          value={formData.basePrice}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                          placeholder="250000"
                          min="50000"
                          required
                        />
                        <p className="text-xs text-gray-500 mt-1">Harga untuk lisensi personal (akan dikalikan untuk commercial & enterprise)</p>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Resolusi/Ukuran (Opsional)
                        </label>
                        <input
                          type="text"
                          name="resolution"
                          value={formData.resolution}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                          placeholder="4000x4000px atau 300 DPI"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Format File
                        </label>
                        <input
                          type="text"
                          name="fileFormat"
                          value={formData.fileFormat}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                          placeholder="PNG, SVG, AI"
                        />
                      </div>
                      
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Panduan Penggunaan
                        </label>
                        <textarea
                          name="usageGuidelines"
                          value={formData.usageGuidelines}
                          onChange={handleInputChange}
                          rows={3}
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all resize-none"
                          placeholder="Berikan panduan cara menggunakan aset ini dengan tepat dan menghormati nilai budayanya..."
                        />
                      </div>
                      
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Pentancuman Informasi Lisensi
                        </label>
                        <textarea
                          name="culturalSignificance"
                          value={formData.culturalSignificance}
                          onChange={handleInputChange}
                          rows={3}
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all resize-none"
                          placeholder="Mengapa aset ini penting secara budaya dan bagaimana seharusnya digunakan..."
                        />
                      </div>
                    </div>
                  </div>
                  
                  {/* Terms & Conditions */}
                  <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-xl">
                    <h4 className="font-medium text-gray-900 mb-2">Pernyataan & Syarat:</h4>
                    <div className="space-y-2 text-sm text-gray-700">
                      <label className="flex items-start space-x-2">
                        <input type="checkbox" required className="mt-1" />
                        <span>Saya menyatakan bahwa saya memiliki hak legal untuk mendistribusikan aset budaya ini</span>
                      </label>
                      <label className="flex items-start space-x-2">
                        <input type="checkbox" required className="mt-1" />
                        <span>Saya telah mendapatkan izin dari pemilik atau komunitas budaya terkait</span>
                      </label>
                      <label className="flex items-start space-x-2">
                        <input type="checkbox" required className="mt-1" />
                        <span>Saya setuju dengan kebijakan pembagian revenue dan terms of service LumbungRupa</span>
                      </label>
                    </div>
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex justify-between mt-8 pt-6 border-t border-gray-200">
                <div>
                  {currentStep > 1 && (
                    <button
                      type="button"
                      onClick={prevStep}
                      className="px-6 py-3 border border-gray-300 text-gray-700 rounded-full hover:bg-gray-50 transition-colors"
                    >
                      Sebelumnya
                    </button>
                  )}
                </div>
                
                <div>
                  {currentStep < 3 ? (
                    <button
                      type="button"
                      onClick={nextStep}
                      disabled={!isStepValid()}
                      className="px-8 py-3 bg-primary text-white rounded-full font-medium hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Lanjutkan
                    </button>
                  ) : (
                    <button
                      type="submit"
                      disabled={!isStepValid()}
                      className="px-8 py-3 bg-green-600 text-white rounded-full font-medium hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Publikasikan Aset
                    </button>
                  )}
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CulturalPartnerUploadPage;