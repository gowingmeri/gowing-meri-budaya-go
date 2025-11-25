"use client";
import React, { useState } from "react";
import { Upload } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Toast from '../../../../../components/Toast'

const CulturalPartnerRegisterCulturalPartnerProfilePage = () => {
  const router = useRouter();
  const [files, setFiles] = useState({
    buktiKemitraanBudaya: null as File | null,
    dokumenLegal: null as File | null,
    suratPernyataanIP: null as File | null,
    dokumenKYC: null as File | null,
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, fieldName: string) => {
    const file = e.target.files?.[0] || null;
    setFiles(prev => ({ ...prev, [fieldName]: file }));
  };

  const [showToast, setShowToast] = useState(false)
  const [toastMessage, setToastMessage] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // client-side validation: ensure required file fields are present in state
    if (!files.buktiKemitraanBudaya) {
      alert('Bukti Kemitraan Budaya wajib diunggah')
      return
    }
    if (!files.suratPernyataanIP) {
      alert('Surat Pernyataan IP wajib diunggah')
      return
    }

    (async () => {
      try {
        // Try to gather previous steps data from localStorage
        const accountRaw = localStorage.getItem('register_account_data')
        const assetRaw = localStorage.getItem('register_cultural_asset') || localStorage.getItem('register_company_profile')
        const account = accountRaw ? JSON.parse(accountRaw) : {}
        const asset = assetRaw ? JSON.parse(assetRaw) : {}

        const fd = new FormData()
        if (account.email) fd.append('email', account.email)
        if (account.kataSandi) fd.append('password', account.kataSandi)
        if (account.namaLengkap) fd.append('fullName', account.namaLengkap)
        if (account.nomorTelepon) fd.append('nomorTelepon', account.nomorTelepon)
        fd.append('role', 'CULTURAL_PARTNER')

        // organization profile (server will normalize keys)
        fd.append('companyProfile', JSON.stringify({
          namaOrganisasi: asset.namaOrganisasi,
          jenisOrganisasi: asset.jenisOrganisasi,
          alamatOrganisasi: asset.alamatOrganisasi,
          tautanPortofolio: asset.tautanPortofolio,
        }))

        // attach files if provided
        if (files.buktiKemitraanBudaya) fd.append('buktiKemitraanBudaya', files.buktiKemitraanBudaya)
        if (files.dokumenLegal) fd.append('dokumenLegal', files.dokumenLegal)
        if (files.suratPernyataanIP) fd.append('suratPernyataanIP', files.suratPernyataanIP)
        if (files.dokumenKYC) fd.append('dokumenKYC', files.dokumenKYC)

        fd.append('uploadFolder', 'users')

        const res = await fetch('/api/auth/register', { method: 'POST', body: fd })
        if (!res.ok) {
          const err = await res.json().catch(() => ({ message: 'Unknown error' }))
          alert('Gagal mendaftar: ' + (err.message || res.statusText))
          return
        }

        // cleanup
        localStorage.removeItem('register_account_data')
        localStorage.removeItem('register_cultural_asset')
        localStorage.removeItem('register_company_profile')

        // show toast then navigate to success page
        setToastMessage('Pendaftaran berhasil')
        setShowToast(true)
        setTimeout(() => {
          router.push('/auth/cultural-partner/register/registration-success')
        }, 900)
      } catch (err: any) {
        console.error(err)
        alert('Terjadi kesalahan saat mengirim data. Cek konsol untuk detail.')
      }
    })()
  };

  const FileUploadField = ({ 
    id, 
    label, 
    required = false, 
    description, 
    file 
  }: {
    id: string;
    label: string;
    required?: boolean;
    description: string;
    file: File | null;
  }) => (
    <div>
      <label
        htmlFor={id}
        className="block text-sm font-medium text-gray-700 mb-2"
      >
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <div className="relative">
        <input
          type="file"
          id={id}
          name={id}
          onChange={(e) => handleFileChange(e, id)}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
          required={required}
        />
        <div className="w-full px-4 py-6 border-2 border-dashed border-gray-300 rounded-xl hover:border-blue-400 transition-colors cursor-pointer">
          <div className="flex flex-col items-center justify-center text-center">
            <Upload className="w-8 h-8 text-gray-400 mb-2" />
            {file ? (
              <div>
                <p className="text-sm font-medium text-gray-900">{file.name}</p>
                <p className="text-xs text-gray-500">Klik untuk mengganti file</p>
              </div>
            ) : (
              <div>
                <p className="text-sm font-medium text-gray-700">Klik untuk upload file</p>
                <p className="text-xs text-gray-500">PDF, DOC, JPG, PNG (Max 10MB)</p>
              </div>
            )}
          </div>
        </div>
      </div>
      <p className="text-xs text-gray-500 mt-1">{description}</p>
    </div>
  );

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
                  ✓
                </div>
                <div className="w-8 h-1 bg-primary"></div>
                <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center text-sm font-medium">
                  3
                </div>
              </div>
            </div>
            <p className="text-center text-sm text-gray-600">Langkah 3 dari 3</p>
          </div>

          {/* Header */}
          <div className="p-5">
            <div className="flex items-center justify-center">
              <h1 className="text-2xl justify-center font-semibold text-gray-900">
                Dokumen Verifikasi
              </h1>
            </div>
          </div>

          {/* Form Content */}
          <div className="p-6">
            <form onSubmit={handleSubmit} className="space-y-5" noValidate>
              {/* Bukti Kemitraan Budaya */}
              <FileUploadField
                id="buktiKemitraanBudaya"
                label="Bukti Kemitraan Budaya"
                required={true}
                description="Surat/bukti resmi kerja sama dengan pemilik budaya"
                file={files.buktiKemitraanBudaya}
              />

              {/* Dokumen Legal */}
              <FileUploadField
                id="dokumenLegal"
                label="Dokumen Legal"
                required={false}
                description="Akta/yayasan/registrasi legal"
                file={files.dokumenLegal}
              />

              {/* Surat Pernyataan IP */}
              <FileUploadField
                id="suratPernyataanIP"
                label="Surat Pernyataan IP"
                required={true}
                description="Pernyataan kepemilikan/pengelolaan IP budaya"
                file={files.suratPernyataanIP}
              />

              {/* Dokumen KYC */}
              <FileUploadField
                id="dokumenKYC"
                label="Dokumen KYC"
                required={false}
                description="KTP/Paspor PIC"
                file={files.dokumenKYC}
              />

              {/* Tombol Selesai */}
              <button
                type="submit"
                className="block w-full p-5 bg-primary text-white rounded-full font-medium shadow-sm hover:bg-primary transition-all duration-200 text-center"
              >
                Selesaikan Pendaftaran
              </button>
            </form>

            {/* Navigation */}
            <div className="mt-6 text-center">
              <Link
                href="/auth/cultural-partner/register/cultural-asset-verification-document"
                className="inline-block w-full p-5 border border-gray-300 text-gray-700 rounded-full font-medium hover:bg-gray-50 transition-all duration-200 text-center"
              >
                Kembali
              </Link>
            </div>
          </div>
        </div>
      </div>
      {showToast && <Toast message={toastMessage} onClose={() => setShowToast(false)} />}
    </div>
  );
};

export default CulturalPartnerRegisterCulturalPartnerProfilePage;
