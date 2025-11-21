import Link from "next/link";

const LicenseBuyerRegistrationSuccess = () => {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Card Container */}
        <div className="bg-white rounded-xl">
          {/* Header */}
          <div className="p-8 text-center">
            {/* Success Icon */}
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <div className="text-4xl text-green-600">✓</div>
            </div>

            {/* Title */}
            <h1 className="text-2xl font-semibold text-gray-900 mb-4">
              Pendaftaran berhasil!
            </h1>

            {/* Status Message */}
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
              <p className="text-sm font-medium text-gray-900 mb-2">Status:</p>
              <p className="text-sm text-gray-700">
                Akun Anda sedang menunggu verifikasi dari tim LumbungRupa.
              </p>
            </div>

            {/* Estimation Time */}
            <div className="bg-gray-50 rounded-xl p-4 mb-8">
              <p className="text-sm font-medium text-gray-900 mb-1">
                Estimasi waktu review:
              </p>
              <p className="text-sm text-gray-600">1–3 hari kerja</p>
            </div>

            {/* Button */}
            <Link
              href="/"
              className="block w-full p-5 bg-primary text-white rounded-full font-medium shadow-sm hover:bg-primary transition-all duration-200 text-center"
            >
              Pergi ke Beranda
            </Link>

            {/* Additional Info */}
            <p className="text-xs text-gray-500 mt-4">
              Kami akan mengirimkan notifikasi melalui email setelah verifikasi
              selesai.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LicenseBuyerRegistrationSuccess;
