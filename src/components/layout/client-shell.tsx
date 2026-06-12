"use client";

import dynamic from "next/dynamic";

const WhatsAppButton = dynamic(
  () => import("./whatsapp-button").then((m) => m.WhatsAppButton),
  { ssr: false }
);
const ScrollToTop = dynamic(
  () => import("./scroll-to-top").then((m) => m.ScrollToTop),
  { ssr: false }
);
// CustomCursor desabilitado — interferia nos cliques de navegação
// const CustomCursor = dynamic(
//   () => import("./custom-cursor").then((m) => m.CustomCursor),
//   { ssr: false }
// );
const Toaster = dynamic(
  () => import("sonner").then((m) => m.Toaster),
  { ssr: false }
);
const WebVitals = dynamic(
  () => import("../seo/web-vitals").then((m) => m.WebVitals),
  { ssr: false }
);
export function ClientShell() {
  return (
    <>
      <WebVitals />
      <WhatsAppButton />
      <ScrollToTop />
      {/* <CustomCursor /> */}
      <Toaster position="top-center" richColors />
    </>
  );
}
