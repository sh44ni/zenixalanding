import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { ClientLayout } from "@/components/shared/client-layout";

const GA_MEASUREMENT_ID = "G-VP3DZG8HEZ";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://zenixa.pk"),
  title: "Zenixa - Your Online Store Live in 72 Hours | No Monthly Fees",
  description:
    "Complete e-commerce solution for Pakistani businesses. PKR 45,000 one-time, no monthly fees ever. Live in 72 hours with .pk domain, hosting, JazzCash, EasyPaisa, Stripe included.",
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
    title: "Zenixa - Your Online Store Live in 72 Hours | No Monthly Fees",
    description:
      "Complete e-commerce solution for Pakistani businesses. PKR 45,000 one-time, no monthly fees ever.",
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
    title: "Zenixa - Your Online Store Live in 72 Hours | No Monthly Fees",
    description:
      "Complete e-commerce solution for Pakistani businesses. PKR 45,000 one-time, no monthly fees ever.",
    images: ["/og-image.png"],
    creator: "@projektspk",
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/logo_favicon.svg",
    apple: "/logo_favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        {/* Google Analytics */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}');
          `}
        </Script>
      </head>
      <body className={`${inter.variable} font-sans antialiased`}>
        <ClientLayout>
          {children}
        </ClientLayout>
        <Toaster />
      </body>
    </html>
  );
}
