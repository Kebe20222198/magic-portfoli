/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  pageExtensions: ["ts", "tsx"],

  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "**",
      },
    ],
  },
};

export default nextConfig;
