/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'imgsrv2.voi.id',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'placeholder.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
}

module.exports = nextConfig
