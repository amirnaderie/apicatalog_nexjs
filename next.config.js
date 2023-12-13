/** @type {import('next').NextConfig} */
const withPWA = require("@ducanh2912/next-pwa").default({
  dest: "public",
  cacheOnFrontEndNav: true,
  aggressiveFrontEndNavCaching: true,
  reloadOnOnline: true,
  swcMinify: true,
  disable: false,
  workboxOptions: {
    disableDevLogs: true,
    exclude: [
      /^.*docx\/.*$/,
  ]
  },
  fallbacks: {
    document: "/offline", // if you want to fallback to a custom page other than /_offline
  },
});
const nextConfig = {
  // experimental: {
  //   appDir: true,
  // },
  async headers() {
    return [
      {
        source: "/(.*)?", // Matches all pages
        headers: [
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
        ],
      },
    ];
  },
};

module.exports = withPWA(nextConfig);
