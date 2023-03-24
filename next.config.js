/** @type {import('next').NextConfig} */
const withPWA = require('next-pwa')({
  dest: 'public',
  disable: process.env.NODE_ENV === 'development',
  register: true,
  scope: '/',
  
})

module.exports = withPWA({
  images: {
   
    cacheDuration: 365 * 24 * 60 * 60, // cache for 1 year
    path: '/_next/image-cache/',
    deviceSizes: [320, 640, 750, 1080, 1200],
    imageSizes: [16, 32, 48, 64, 96],
  },
  // next.js config
})
// const nextConfig = {
//   reactStrictMode: true,
// }

// module.exports = nextConfig
