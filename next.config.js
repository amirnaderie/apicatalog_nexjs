/** @type {import('next').NextConfig} */
// const nextConfig = {
//     distDir: 'build',
// }

// module.exports = nextConfig

const withPWA = require('next-pwa')({
    dest: 'public',
    register: true,
    skipWaiting: true,
  })
  
  module.exports = withPWA({
    // next.js config
    reactStrictMode: false,
    swcMinify: false,
  })