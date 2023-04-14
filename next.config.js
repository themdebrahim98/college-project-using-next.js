// /** @type {import('next').NextConfig} */
// const withPWA = require('next-pwa')({
//   dest: 'public',
//   disable: process.env.NODE_ENV === 'development',
//   register: true,
//   scope: '/',
  
// })

// module.exports = withPWA({
//   // next.js config
// })
// // const nextConfig = {
// //   reactStrictMode: true,
// // }

// // // module.exports = nextConfig


/** @type {import('next').NextConfig} */
const withPWA = require('next-pwa')({
    dest: 'public',
    disable: process.env.NODE_ENV === 'development',
    register: true,
    scope: '/',
    
  })
  
  module.exports = withPWA({
    // next.js config
  })
  // const nextConfig = {
  //   reactStrictMode: true,
  // }
  
  // // module.exports = nextConfig