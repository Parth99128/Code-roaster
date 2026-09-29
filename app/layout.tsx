import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Noto_Sans_Devanagari, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { APP } from "@/config/app.config";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

const notoDevanagari = Noto_Sans_Devanagari({
  variable: "--font-noto-devanagari",
  subsets: ["latin", "devanagari"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: `${APP.name} — Desi AI Code Critique`,
  description: `${APP.tagline} · ${APP.subTagline} Built for ${APP.event} by ${APP.chapter}`,
  icons: {
    icon: "/assets/GDG_Logo.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetbrainsMono.variable} ${spaceGrotesk.variable} ${notoDevanagari.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-cream text-ink font-sans selection:bg-mustard selection:text-ink">
        {children}
      </body>
    </html>
  );
}
