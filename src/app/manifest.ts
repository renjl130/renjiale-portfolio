import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

  return {
    name: "任佳乐个人作品集 | Ren Jiale Portfolio",
    short_name: "任佳乐作品集",
    description: "任佳乐的个人作品集，记录产品、内容、品牌传播、海外运营、影像制作与校园实践。",
    start_url: `${basePath}/`,
    display: "standalone",
    background_color: "#f5f5f0",
    theme_color: "#f5f5f0",
    icons: [{ src: `${basePath}/icon.svg`, sizes: "any", type: "image/svg+xml" }],
  };
}