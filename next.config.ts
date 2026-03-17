import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      // LDraw: 프리미티브 파일이 parts/ 하위에서 요청될 때 p/ 로 리다이렉트
      // parts/<primitive>.dat → p/<primitive>.dat
      {
        source: "/ldraw/parts/:file((?!s/)(?!parts/)[^/]+\\.dat)",
        destination: "/ldraw/p/:file",
      },
      // parts/8/<file>.dat → p/8/<file>.dat
      {
        source: "/ldraw/parts/8/:file*",
        destination: "/ldraw/p/8/:file*",
      },
      // parts/parts/s/<file>.dat → parts/s/<file>.dat (이중 parts 접두사 제거)
      {
        source: "/ldraw/parts/parts/s/:file*",
        destination: "/ldraw/parts/s/:file*",
      },
      // p/parts/s/<file>.dat → parts/s/<file>.dat
      {
        source: "/ldraw/p/parts/s/:file*",
        destination: "/ldraw/parts/s/:file*",
      },
      // models/parts/s/<file>.dat → parts/s/<file>.dat
      {
        source: "/ldraw/models/parts/s/:file*",
        destination: "/ldraw/parts/s/:file*",
      },
      // parts/p/48/<file>.dat → p/48/<file>.dat
      {
        source: "/ldraw/parts/p/48/:file*",
        destination: "/ldraw/p/48/:file*",
      },
      // p/p/48/<file>.dat → p/48/<file>.dat (이중 p 접두사 제거)
      {
        source: "/ldraw/p/p/48/:file*",
        destination: "/ldraw/p/48/:file*",
      },
      // models/p/48/<file>.dat → p/48/<file>.dat
      {
        source: "/ldraw/models/p/48/:file*",
        destination: "/ldraw/p/48/:file*",
      },
    ];
  },
};

export default nextConfig;
