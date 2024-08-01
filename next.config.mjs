/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [{ hostname: "lh3.googleusercontent.com" }],
  },
  experimental: {
    missingSuspenseWithCSRBailout: false,
  },
  env: {
    GOOGLE_MAPS_API_KEY: process.env.GOOGLE_MAPS_API_KEY,
    GOOGLE_MAPS_ID: process.env.GOOGLE_MAPS_ID,
  },
};

export default nextConfig;
