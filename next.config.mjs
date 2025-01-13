/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "utfs.io" },
      { protocol: "https", hostname: "axl8uyhwd5.ufs.sh" },
    ],
  },
};

export default nextConfig;
