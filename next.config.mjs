/** @type {import('next').NextConfig} */
const nextConfig = {
experimental: { serverActions: { allowedOrigins: ["bj6wpd1n-3000.euw.devtunnels.ms", "localhost:3000"] } }, 
logging: {
    level: "verbose",
  },
  
};
console.log("Next.js config loaded:", nextConfig); // Добавьте этот лог

export default nextConfig;
