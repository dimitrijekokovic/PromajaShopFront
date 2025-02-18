/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compiler: {
    styledComponents: true,
  },
  images: {
    domains: ["dimitrije-next-ecommerce.s3.amazonaws.com"],
  },
  async rewrites() {
    return [
      {
        source: "/api/:path*", // Sve API rute
        destination: "https://promaja-shop.vercel.app/api/:path*", // Novi backend URL
      },
    ];
  },
};

module.exports = nextConfig;