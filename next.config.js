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
      {
        protocol: "https",
        hostname: "*.public.blob.vercel-storage.com",
      },
    ],
  },
  async headers() {
    return [
      {
        // Hero image sequence — ~120 small WebP files. Cache aggressively on the browser
        // AND on Vercel's edge CDN. If the video is ever replaced, re-extract with
        // different frame count or rename the folder to bust cache.
        source: "/videos/frames/:file*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        // Same for the mobile fallback video
        source: "/videos/hero.mp4",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
