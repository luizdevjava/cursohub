import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { Providers } from "@/components/providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Educação Online - Plataforma de Cursos Gratuitos",
  description: "Aprenda com os melhores cursos online de forma gratuita. Cursos de programação, design e muito mais.",
  keywords: ["cursos online", "educação", "programação", "grátis", "aprendizado"],
  authors: [{ name: "Educação Online" }],
  openGraph: {
    title: "Educação Online",
    description: "Cursos online gratuitos para impulsionar sua carreira",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Educação Online",
    description: "Cursos online gratuitos para impulsionar sua carreira",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        <Providers>
          {children}
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
