/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { dev, isServer }) => {
    if (dev) {
      console.log("Перезагрузка в режиме разработки...");
    }
    return config;
  },
experimental: { serverActions: { allowedOrigins: ["bj6wpd1n-3000.euw.devtunnels.ms", "localhost:3000"] } }, 
logging: {
    level: "verbose",
  },
  
};
console.log("Next.js config loaded:", nextConfig); // Добавьте этот лог

export default nextConfig;
