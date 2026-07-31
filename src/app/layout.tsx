import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { RouteTransition, ScrollProgress } from "@/components/motion-system";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3100"),
  title: "任佳乐 | 个人作品集",
  description: "任佳乐的个人作品集，记录产品、内容、品牌传播、海外运营、影像制作与校园实践。",
  keywords: ["任佳乐", "个人作品集", "产品实践", "内容运营", "品牌传播", "影像制作"],
  authors: [{ name: "任佳乐" }],
  openGraph: {
    title: "任佳乐 | 个人作品集",
    description: "把想法做成产品、内容与作品。",
    type: "website",
    locale: "zh_CN",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#f5f5f0",
  colorScheme: "light",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <ScrollProgress />
          <RouteTransition>{children}</RouteTransition>
        </ThemeProvider>
      </body>
    </html>
  );
}
