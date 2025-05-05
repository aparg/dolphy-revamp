/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "admin.dolphy.ca",
      },
      {
        protocol: "https",
        hostname: "api.toassign.com",
      },
    ],
  },
};

export default nextConfig;
