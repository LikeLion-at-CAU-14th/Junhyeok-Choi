import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 상위 폴더(Likelion14th-git)의 package-lock.json 때문에 루트를 잘못 잡지 않도록 week25를 루트로 지정
  turbopack: {
    root: __dirname,
  },
};

export default nextConfig;
