import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { SITE } from "@/lib/constants";

/**
 * 1.3.5 — a imagem que aparece quando o link é compartilhado (WhatsApp, Facebook,
 * LinkedIn). Antes, toda página mandava a capa do Facebook (820×312, anunciada como
 * 1200×630): no WhatsApp, o canal principal dela, a prévia saía cortada e sem rosto.
 *
 * Um desenho só, com o assunto da página em cima: a foto dela à direita e, à esquerda,
 * nome + "médica ortopedista" + CRM + RQE — os mesmos fatos do Art. 4º da CFM 2.336/2023
 * que o site traz em toda página.
 */
export const OG_SIZE = { width: 1200, height: 630 };
export const OG_CONTENT_TYPE = "image/png";

export async function renderOgImage({ assunto, rodape }: { assunto: string; rodape?: string }) {
  const [foto, aire, century] = await Promise.all([
    readFile(join(process.cwd(), "public/janaina-hero.jpg"), "base64"),
    readFile(join(process.cwd(), "src/fonts/AireRomanPro.ttf")),
    readFile(join(process.cwd(), "src/fonts/CENTURY.ttf")),
  ]);
  const tamanhoAssunto = assunto.length > 34 ? 50 : assunto.length > 22 ? 58 : 66;

  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", background: "#003E51" }}>
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: "64px 56px 56px 72px",
          }}
        >
          <div
            style={{
              display: "flex",
              fontFamily: "Century",
              fontSize: 22,
              letterSpacing: 4,
              textTransform: "uppercase",
              color: "#E0EDEE",
            }}
          >
            {rodape ?? "Ortopedia e Traumatologia · BH"}
          </div>
          <div
            style={{
              display: "flex",
              fontFamily: "Aire",
              fontSize: tamanhoAssunto,
              lineHeight: 1.1,
              color: "white",
            }}
          >
            {assunto}
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <div style={{ display: "flex", fontFamily: "Aire", fontSize: 38, color: "#E6E5E2" }}>
              {SITE.name}
            </div>
            <div style={{ display: "flex", fontFamily: "Century", fontSize: 24, color: "rgba(255,255,255,0.75)" }}>
              {`Médica ortopedista · ${SITE.crm} · ${SITE.rqe}`}
            </div>
          </div>
        </div>
        {/* eslint-disable-next-line @next/next/no-img-element -- ImageResponse só aceita <img> */}
        <img
          src={`data:image/jpeg;base64,${foto}`}
          alt=""
          width={420}
          height={630}
          style={{ objectFit: "cover", objectPosition: "top" }}
        />
      </div>
    ),
    {
      ...OG_SIZE,
      fonts: [
        { name: "Aire", data: aire, weight: 400, style: "normal" },
        { name: "Century", data: century, weight: 400, style: "normal" },
      ],
    },
  );
}
