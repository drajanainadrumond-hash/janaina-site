import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";

/** Evita pré-render estático de /admin sem variáveis Supabase no ambiente de build. */
export const dynamic = "force-dynamic";

export const metadata: Metadata = buildPageMetadata({
  title: "Admin — Dra. Janaína Drumond",
  description: "Painel administrativo.",
  path: "/admin",
  noIndex: true,
});

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <style>{`
        header.fixed { display: none !important; }
        footer { display: none !important; }
        .skip-link, .whatsapp-float, .cookie-consent { display: none !important; }
        #main { flex: none !important; padding: 0 !important; }
        body { background: #f5f5f0 !important; }
      `}</style>
      {children}
    </>
  );
}
