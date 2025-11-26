"use client";
import React, { useState } from "react";
import { Eye, EyeOff, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Toast from '../../../../components/Toast'

const LicenseBuyerAuthLoginPage = () => {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showToast, setShowToast] = useState(false)
  const [toastMessage, setToastMessage] = useState('')
  const [showErrorModal, setShowErrorModal] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })

      if (!res.ok) {
        const err = await res.json().catch(() => ({ message: res.statusText }))
        setErrorMessage('Login gagal: ' + (err.message || 'Unknown error'))
        setShowErrorModal(true)
        return
      }

      const data = await res.json()
      const { user, token } = data
      
      // Validate role - only LICENSE_BUYER allowed
      if (user?.role !== 'LICENSE_BUYER') {
        setErrorMessage('Akun ini bukan akun Pembeli Lisensi. Silakan gunakan halaman login yang sesuai dengan role Anda.')
        setShowErrorModal(true)
        return
      }
      
      if (token) localStorage.setItem('token', token)
      if (user) {
        localStorage.setItem('user', JSON.stringify(user))
        localStorage.setItem('roleUser', user.role)
      }

      // show toast then redirect
      setToastMessage('Berhasil masuk sebagai Pembeli Lisensi')
      setShowToast(true)
      setTimeout(() => {
        router.push('/product')
      }, 900)
    } catch (err) {
      console.error(err)
      setErrorMessage('Terjadi kesalahan saat login. Silakan coba lagi.')
      setShowErrorModal(true)
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Card Container */}
        <div className="bg-white rounded-xl">
          {/* Back Button */}
          <div className="p-5 border-b border-gray-200">
            <Link
              href="/"
              className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft size={16} className="mr-2" />
              Kembali ke Beranda
            </Link>
          </div>

          {/* Header */}
          <div className="p-5">
            <div className="flex items-center justify-center">
              <h1 className="text-2xl justify-center font-semibold text-gray-900">
                Masuk atau Daftar Pembeli Lisensi
              </h1>
            </div>
          </div>

          {/* Form Content */}
          <div className="p-6">
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Input Email */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Email atau nama pengguna
                </label>
                <input
                  type="text"
                  id="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 transition-all"
                  placeholder="Masukkan email Anda"
                />
              </div>

              {/* Input Password */}
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Kata Sandi
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-2.5 pr-12 border border-gray-300 rounded-xl focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 transition-all"
                    placeholder="Masukkan kata sandi Anda"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              {/* Link Lupa Password */}
              <div className="text-right">
                <Link
                  href="/forgot-password"
                  className="text-sm font-medium text-primary hover:primary hover:underline transition-colors"
                >
                  Lupa kata sandi?
                </Link>
              </div>

              {/* Tombol Login Utama */}
              <button
                type="submit"
                className="w-full p-5 bg-primary text-white rounded-full font-medium shadow-sm hover:bg-primary transition-all duration-200"
              >
                Masuk
              </button>
            </form>

            {/* Divider */}
            <div className="flex items-center gap-4 my-6">
              <hr className="flex-1 border-gray-300" />
              <span className="text-sm text-gray-500">
                atau lanjutkan dengan
              </span>
              <hr className="flex-1 border-gray-300" />
            </div>

            {/* Login Alternatif */}
            <div className="space-y-3">
              <button
                type="button"
                className="w-full p-5 border border-gray-300 text-gray-700 rounded-full font-medium hover:bg-gray-50 transition-all duration-200"
              >
                Masuk dengan SSO
              </button>
              <button
                type="button"
                className="w-full p-5 border border-gray-300 text-gray-700 rounded-full font-medium hover:bg-gray-50 transition-all duration-200 flex items-center justify-center gap-2"
              >
                <svg viewBox="0 0 24 24" className="w-5 h-5">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                Lanjutkan dengan Google
              </button>
              <button
                type="button"
                className="w-full p-5 border border-gray-300 text-gray-700 rounded-full font-medium hover:bg-gray-50 transition-all duration-200"
              >
                Lanjutkan dengan Facebook
              </button>
              <button
                type="button"
                className="w-full p-5 border border-gray-300 text-gray-700 rounded-full font-medium hover:bg-gray-50 transition-all duration-200"
              >
                Lanjutkan dengan Apple
              </button>
            </div>

            {/* Footer Register */}
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600 mb-3">
                Belum memiliki akun mitra budaya?
              </p>
              <Link
                href="/auth/license-buyer/register/account-data"
                className="inline-block w-full p-5 border border-gray-300 text-gray-700 rounded-full font-medium hover:bg-gray-50 transition-all duration-200 text-center"
              >
                Buat akun Anda
              </Link>
            </div>
          </div>
        </div>
        {showToast && <Toast message={toastMessage} onClose={() => setShowToast(false)} />}
        
        {/* Error Modal */}
        {showErrorModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl transform transition-all">
              <div className="flex flex-col items-center text-center">
                {/* Error Icon */}
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
                  <svg
                    className="w-8 h-8 text-red-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                
                {/* Error Title */}
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Login Gagal
                </h3>
                
                {/* Error Message */}
                <p className="text-gray-600 mb-6">
                  {errorMessage}
                </p>
                
                {/* Close Button */}
                <button
                  onClick={() => setShowErrorModal(false)}
                  className="w-full px-6 py-3 bg-primary text-white rounded-xl font-medium hover:bg-primary/90 transition-colors"
                >
                  Tutup
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LicenseBuyerAuthLoginPage;
