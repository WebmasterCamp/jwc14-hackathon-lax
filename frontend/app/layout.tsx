import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "readdiva",
  description: "readdiva - แอปจับเวลาอ่านหนังสือ และแข่งขันยึดพื้นที่ในรูปแบบ gamification",
  keywords: ["study app", "gamification", "reading", "territory", "Bangkok", "co-working"],
  authors: [{ name: "readdiva team" }],
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "readdiva",
  },
  openGraph: {
    title: "readdiva",
    description: "แอปจับเวลาอ่านหนังสือ และแข่งขันยึดพื้นที่ในรูปแบบ gamification",
    type: "website",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#08080F",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="bg-app antialiased">
        {children}
      </body>
    </html>
  );
}