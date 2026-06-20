import type { Metadata } from "next";
import localFont from "next/font/local";
import { Header } from "@/components/layout/header";
import { CookieConsent } from "@/components/layout/cookie-consent";
import { NewsletterPopup } from "@/components/layout/newsletter-popup";
import { Footer } from "@/components/layout/footer";
import { JsonLd } from "@/components/seo/json-ld";
import { ClientShell } from "@/components/layout/client-shell";
import { SITE } from "@/lib/constants";
import { absoluteUrl, DEFAULT_OG_IMAGE } from "@/lib/seo";
import "./globals.css";

const airePro = localFont({
  src: "../fonts/AireRomanPro.woff2",
  variable: "--font-heading",
  display: "swap",
});

const centuryGothic = localFont({
  src: "../fonts/CENTURY.woff2",
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default:
      "Dra. Janaína Drumond — Ortopedista em BH | Mão e Punho",
    template: "%s | Dra. Janaína Drumond",
  },
  description:
    "Ortopedista e Traumatologista em Belo Horizonte com atuação em condições da mão e punho. Cuidado personalizado e tratamento baseado em evidências. CRM-MG 69719 | RQE 50592.",
  keywords: [
    "ortopedista BH",
    "ortopedista mulher Belo Horizonte",
    "ortopedista de mão e punho BH",
    "síndrome do túnel do carpo",
    "dedo em gatilho",
    "ortopedia e traumatologia",
    "dor na mão e punho Belo Horizonte",
    "dor no punho",
    "rizartrose",
    "ortopedista mão BH",
  ],
  authors: [{ name: "Dra. Janaína Drumond Rocha Fraga" }],
  creator: "Dra. Janaína Drumond Rocha Fraga",
  publisher: "Dra. Janaína Drumond",
  formatDetection: {
    telephone: true,
    email: true,
  },
  icons: {
    icon: [{ url: "/favicon.ico", sizes: "any" }],
    apple: [{ url: "/logo.png", sizes: "180x180", type: "image/png" }],
  },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    siteName: SITE.name,
    images: [
      {
        url: absoluteUrl(DEFAULT_OG_IMAGE),
        width: 1200,
        height: 630,
        alt: SITE.fullName,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || "",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${centuryGothic.variable} ${airePro.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans">
        <a href="#main" className="skip-link">Pular para o conteúdo</a>
        <JsonLd />
        <Header />
        <main id="main" className="flex-1">{children}</main>
        <Footer />
        <ClientShell />
        <CookieConsent />
        <NewsletterPopup />
      </body>
    </html>
  );
}
