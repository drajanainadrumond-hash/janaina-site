import { ImageResponse } from "next/og";

export const runtime = "nodejs";
export const alt = "Dra. Janaína Drumond — Ortopedista em BH";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          background: "#003E51",
          padding: "80px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Grid background */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />

        {/* Decorative circle */}
        <div
          style={{
            position: "absolute",
            right: -100,
            top: "50%",
            transform: "translateY(-50%)",
            width: 500,
            height: 500,
            borderRadius: "50%",
            border: "1px solid rgba(255,255,255,0.06)",
          }}
        />
        <div
          style={{
            position: "absolute",
            right: -50,
            top: "50%",
            transform: "translateY(-50%)",
            width: 400,
            height: 400,
            borderRadius: "50%",
            border: "1px solid rgba(255,255,255,0.04)",
          }}
        />

        {/* Tag */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            marginBottom: 40,
          }}
        >
          <div
            style={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              background: "#0A6E75",
            }}
          />
          <span
            style={{
              fontSize: 14,
              color: "rgba(224,237,238,0.8)",
              letterSpacing: 3,
              textTransform: "uppercase" as const,
            }}
          >
            Ortopedia e Traumatologia · Belo Horizonte
          </span>
        </div>

        {/* Title */}
        <div
          style={{
            fontSize: 72,
            fontWeight: 300,
            color: "white",
            lineHeight: 1.1,
            letterSpacing: 2,
            textTransform: "uppercase" as const,
            marginBottom: 16,
          }}
        >
          Dra. Janaína
        </div>
        <div
          style={{
            fontSize: 72,
            fontWeight: 300,
            color: "white",
            lineHeight: 1.1,
            letterSpacing: 2,
            textTransform: "uppercase" as const,
            marginBottom: 24,
          }}
        >
          Drumond
        </div>

        {/* Subtitle */}
        <div
          style={{
            fontSize: 24,
            color: "#E6E5E2",
            fontStyle: "italic",
          }}
        >
          Mão e punho.
        </div>

        {/* Bottom info */}
        <div
          style={{
            position: "absolute",
            bottom: 40,
            left: 80,
            display: "flex",
            gap: 32,
            fontSize: 13,
            color: "rgba(255,255,255,0.3)",
            letterSpacing: 1.5,
            textTransform: "uppercase" as const,
          }}
        >
          <span>CRM-MG 69719</span>
          <span>RQE 50592</span>
          <span>janainadrumond.com.br</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
