import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { ClientLayout } from "@/components/shared/client-layout";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Zenixa - Launch Your Online Store in 24 Hours | E-commerce Solution Pakistan",
  description:
    "Complete e-commerce solution for Pakistani businesses. One payment, no monthly fees. Launch your professional online store in just 24 hours with Zenixa by Projekts Vision.",
  keywords: [
    "e-commerce Pakistan",
    "online store Pakistan",
    "Shopify alternative",
    "no monthly fees",
    "e-commerce solution",
    "online business Pakistan",
    "Karachi e-commerce",
    "JazzCash integration",
    "EasyPaisa store",
    "COD Pakistan",
  ],
  authors: [
    {
      name: "Projekts Vision (Private) Limited",
      url: "https://projekts.pk",
    },
  ],
  creator: "Projekts Vision",
  publisher: "Projekts Vision (Private) Limited",
  openGraph: {
    type: "website",
    locale: "en_PK",
    url: "https://zenixa.pk",
    siteName: "Zenixa",
    title: "Zenixa - Launch Your Online Store in 24 Hours",
    description:
      "Complete e-commerce solution for Pakistani businesses. One payment, no monthly fees.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Zenixa E-commerce Platform",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Zenixa - Launch Your Online Store in 24 Hours",
    description:
      "Complete e-commerce solution for Pakistani businesses. One payment, no monthly fees.",
    images: ["/og-image.png"],
    creator: "@projektspk",
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} font-sans antialiased`}>
        <ClientLayout>
          {children}
        </ClientLayout>
        <Toaster />
      </body>
    </html>
  );
}
