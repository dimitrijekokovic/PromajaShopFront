/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compiler: {
    styledComponents: true,
  },
  async rewrites() {
    return [
      {
        source: "/api/:path*", // Sve API rute
        destination: "http://localhost:3000/api/:path*", // Backend API adresa
      },
    ];
  },
};

module.exports = nextConfig;
