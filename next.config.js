/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "emmanails.ro",
      },
      {
        protocol: "https",
        hostname: "academy.emmanails.ro",
      },
    ],
  },
};

module.exports = nextConfig;
