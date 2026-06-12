const ITEMS = [
  "Ortopedia Geral",
  "Túnel do Carpo",
  "Dedo em Gatilho",
  "Rizartrose",
  "Dor no Ombro",
  "CRM-MG 69719",
  "RQE 50592",
];

export function Marquee() {
  return (
    <div className="bg-teal-mid py-3.5 overflow-hidden whitespace-nowrap">
      <div
        className="inline-flex"
        style={{ animation: "marquee 35s linear infinite" }}
      >
        {[...ITEMS, ...ITEMS].map((item, i) => (
          <span
            key={i}
            className="inline-flex items-center gap-3.5 px-10 text-[1.125rem] font-normal text-white/70 uppercase tracking-[2px]"
          >
            <span className="w-1 h-1 bg-teal-pale rotate-45" />
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
