import { SITE } from "@/lib/constants";

type ConsultorioMapProps = {
  className?: string;
};

/** Mapa embed — SEO local (Guia SEO / Livro-Guia cap. 8). */
export function ConsultorioMap({ className = "" }: ConsultorioMapProps) {
  const query = encodeURIComponent(SITE.address.full);
  const mapsLink = `https://www.google.com/maps/search/?api=1&query=${query}`;

  return (
    <div className={className}>
      <iframe
        title={`Localização do consultório — ${SITE.name}`}
        src={`https://maps.google.com/maps?q=${query}&z=15&output=embed`}
        className="w-full min-h-[280px] lg:min-h-[320px] border-0 rounded-2xl"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        allowFullScreen
      />
      <a
        href={mapsLink}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-3 inline-block text-[1rem] text-teal-mid hover:text-teal transition-colors"
      >
        Abrir no Google Maps →
      </a>
    </div>
  );
}
