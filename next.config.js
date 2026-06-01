// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  // 允許從本地 public/ 資料夾讀取圖片
  images: {
    domains: [],
    // 所有 result_*.png 圖放在 /public/ 下即可直接使用
  },
};

module.exports = nextConfig;
