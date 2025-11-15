/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**', // OMDb posters come from various domains
      },
      {
        protocol: 'http',
        hostname: '**', // Some posters may use http
      },
    ],
  },
}

module.exports = nextConfig

