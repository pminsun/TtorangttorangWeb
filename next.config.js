/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: '/api/clova/script', // 요청한 경로
        destination: `https://ttorang.site:8080/api/clova/scrip`, // 내가 사용할 경로
      },
    ];
  },
};
