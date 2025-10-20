/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: "standalone",

  // تنظیمات ESLint و حذف console در production
  eslint: {
    ignoreDuringBuilds: true, // build با وجود هشدارهای ESLint متوقف نشه
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === "production", // consoleها در production حذف می‌شن
  },

  // تنظیمات تصاویر
  images: {
    deviceSizes: [320, 640, 768, 1024, 1280, 1600],
    imageSizes: [16, 32, 48, 64, 96],
    formats: ["image/webp", "image/avif"],

    dangerouslyAllowSVG: true, // اجازه‌ی استفاده از SVG

    contentSecurityPolicy:
      "default-src 'self'; img-src 'self' data: https: blob:; media-src 'none'; script-src 'none'; sandbox;",

    // تصاویر خارجی
    remotePatterns: [
      { protocol: "https", hostname: "picsum.photos", pathname: "/**" },
      { protocol: "https", hostname: "shata20.ir", pathname: "/**" },
      { protocol: "http", hostname: "185.173.104.229", pathname: "/**" },
      { protocol: "https", hostname: "loremflickr.com", pathname: "/**" },
      { protocol: "https", hostname: "api.shata20.ir", pathname: "/**" },
      { protocol: "https", hostname: "example.com", pathname: "/**" },
    ],
  },

  trailingSlash: false,
  assetPrefix: process.env.NODE_ENV === "production" ? "" : "",

  // تنظیمات Webpack برای SVG
  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ["@svgr/webpack"], // امکان استفاده از SVG به صورت React Component
    });
    return config;
  },

  // هدرهای امنیتی و cache
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-Content-Type-Options", value: "nosniff" },
        ],
      },
      {
        source: "/_next/static/(.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/_next/image(.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/:path*.svg",
        headers: [{ key: "Content-Type", value: "image/svg+xml" }],
      },
    ];
  },
};

export default nextConfig;