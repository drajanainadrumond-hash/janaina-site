/** Medical-style SVG illustrations showing hands/wrists close-up for each exercise */

/* ====== 1. Círculos de Punho (Túnel do Carpo) ====== */
export function IllustWristCircles({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 200" fill="none" className={className}>
      {/* Forearm */}
      <rect x="70" y="110" width="60" height="90" rx="20" fill="#D4B59E" />
      {/* Wrist */}
      <ellipse cx="100" cy="110" rx="32" ry="14" fill="#D4B59E" />
      {/* Hand */}
      <g>
        <animateTransform attributeName="transform" type="rotate" values="0,100,90;15,100,90;0,100,90;-15,100,90;0,100,90" dur="3s" repeatCount="indefinite" />
        <rect x="72" y="50" width="56" height="65" rx="20" fill="#E8C8A9" />
        {/* Thumb */}
        <ellipse cx="128" cy="85" rx="12" ry="8" fill="#E8C8A9" transform="rotate(-20,128,85)" />
        {/* Fingers */}
        <rect x="76" y="20" width="12" height="38" rx="6" fill="#E8C8A9" />
        <rect x="90" y="14" width="12" height="42" rx="6" fill="#E8C8A9" />
        <rect x="104" y="16" width="12" height="40" rx="6" fill="#E8C8A9" />
        <rect x="116" y="24" width="11" height="34" rx="5.5" fill="#E8C8A9" />
      </g>
      {/* Rotation arrow */}
      <path d="M55 70 A45 45 0 0 1 145 70" stroke="#003E51" strokeWidth="2" strokeLinecap="round" fill="none" strokeDasharray="4 4" opacity="0.5">
        <animate attributeName="stroke-dashoffset" values="0;-16" dur="1.5s" repeatCount="indefinite" />
      </path>
      <polygon points="145,70 140,62 150,66" fill="#003E51" opacity="0.5">
        <animateTransform attributeName="transform" type="rotate" values="0,145,70;5,145,70;0,145,70" dur="1.5s" repeatCount="indefinite" />
      </polygon>
      <path d="M145 70 A45 45 0 0 1 55 70" stroke="#003E51" strokeWidth="2" strokeLinecap="round" fill="none" strokeDasharray="4 4" opacity="0.3">
        <animate attributeName="stroke-dashoffset" values="0;-16" dur="1.5s" repeatCount="indefinite" />
      </path>
    </svg>
  );
}

/* ====== 2. Flexão de Dedos (Dedo em Gatilho) ====== */
export function IllustFingerFlex({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 200" fill="none" className={className}>
      {/* Palm */}
      <rect x="60" y="80" width="80" height="75" rx="22" fill="#E8C8A9" />
      {/* Thumb */}
      <ellipse cx="140" cy="120" rx="14" ry="9" fill="#E8C8A9" transform="rotate(-15,140,120)" />
      {/* Fingers — open and close */}
      {[
        { x: 68, baseY: 42, w: 14, h: 44, rx: 7 },
        { x: 84, baseY: 32, w: 14, h: 52, rx: 7 },
        { x: 100, baseY: 34, w: 14, h: 50, rx: 7 },
        { x: 115, baseY: 42, w: 13, h: 42, rx: 6.5 },
      ].map((f, i) => (
        <g key={i}>
          {/* Straight finger */}
          <rect x={f.x} y={f.baseY} width={f.w} height={f.h} rx={f.rx} fill="#E8C8A9" opacity="1">
            <animate attributeName="opacity" values="1;0;1" dur="2.5s" repeatCount="indefinite" />
          </rect>
          {/* Curled finger */}
          <rect x={f.x} y={f.baseY + 20} width={f.w} height={f.h - 18} rx={f.rx} fill="#E8C8A9" opacity="0">
            <animate attributeName="opacity" values="0;1;0" dur="2.5s" repeatCount="indefinite" />
          </rect>
        </g>
      ))}
      {/* Arrow indicators */}
      <path d="M96 28 L96 18" stroke="#003E51" strokeWidth="2" strokeLinecap="round" opacity="0.4">
        <animate attributeName="d" values="M96 28 L96 18;M96 52 L96 62;M96 28 L96 18" dur="2.5s" repeatCount="indefinite" />
      </path>
      <polygon points="96,16 92,22 100,22" fill="#003E51" opacity="0.4">
        <animate attributeName="points" values="96,16 92,22 100,22;96,64 92,58 100,58;96,16 92,22 100,22" dur="2.5s" repeatCount="indefinite" />
      </polygon>
      {/* Label */}
      <text x="100" y="190" textAnchor="middle" fill="#003E51" fontSize="10" opacity="0.4" fontFamily="sans-serif">abrir e fechar</text>
    </svg>
  );
}

/* ====== 3. Preensão com Bolinha (Rizartrose) ====== */
export function IllustHandSqueeze({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 200" fill="none" className={className}>
      {/* Palm */}
      <rect x="55" y="75" width="90" height="80" rx="25" fill="#E8C8A9" />
      {/* Thumb wrapping */}
      <ellipse cx="145" cy="110" rx="16" ry="10" fill="#E8C8A9" transform="rotate(-25,145,110)">
        <animate attributeName="rx" values="16;13;16" dur="2s" repeatCount="indefinite" />
      </ellipse>
      {/* Fingers curling around ball */}
      {[
        { x: 62, y: 40, w: 15, h: 42 },
        { x: 79, y: 30, w: 15, h: 50 },
        { x: 96, y: 32, w: 15, h: 48 },
        { x: 112, y: 40, w: 14, h: 40 },
      ].map((f, i) => (
        <rect key={i} x={f.x} y={f.y} width={f.w} rx={f.w / 2} fill="#E8C8A9">
          <animate attributeName="height" values={`${f.h};${f.h - 10};${f.h}`} dur="2s" repeatCount="indefinite" />
          <animate attributeName="y" values={`${f.y};${f.y + 5};${f.y}`} dur="2s" repeatCount="indefinite" />
        </rect>
      ))}
      {/* Ball */}
      <circle cx="100" cy="80" r="22" fill="#00565B" opacity="0.25">
        <animate attributeName="r" values="22;19;22" dur="2s" repeatCount="indefinite" />
      </circle>
      <circle cx="100" cy="80" r="22" stroke="#00565B" strokeWidth="2" fill="none" opacity="0.5">
        <animate attributeName="r" values="22;19;22" dur="2s" repeatCount="indefinite" />
      </circle>
      {/* Squeeze arrows */}
      <path d="M74 80 L82 80" stroke="#003E51" strokeWidth="1.5" strokeLinecap="round" opacity="0">
        <animate attributeName="opacity" values="0;0.5;0" dur="2s" repeatCount="indefinite" />
      </path>
      <path d="M126 80 L118 80" stroke="#003E51" strokeWidth="1.5" strokeLinecap="round" opacity="0">
        <animate attributeName="opacity" values="0;0.5;0" dur="2s" repeatCount="indefinite" />
      </path>
      <text x="100" y="190" textAnchor="middle" fill="#003E51" fontSize="10" opacity="0.4" fontFamily="sans-serif">apertar e soltar</text>
    </svg>
  );
}

/* ====== 4. Alongamento do Polegar (De Quervain) ====== */
export function IllustThumbStretch({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 200" fill="none" className={className}>
      {/* Hand flat */}
      <rect x="45" y="70" width="80" height="75" rx="22" fill="#E8C8A9" />
      {/* Fingers straight */}
      <rect x="50" y="30" width="13" height="46" rx="6.5" fill="#E8C8A9" />
      <rect x="65" y="22" width="13" height="52" rx="6.5" fill="#E8C8A9" />
      <rect x="80" y="24" width="13" height="50" rx="6.5" fill="#E8C8A9" />
      <rect x="94" y="32" width="12" height="42" rx="6" fill="#E8C8A9" />
      {/* Thumb being stretched */}
      <g>
        <animateTransform attributeName="transform" type="translate" values="0,0;-8,4;0,0" dur="3s" repeatCount="indefinite" />
        <rect x="28" y="80" width="24" height="14" rx="7" fill="#E8C8A9" transform="rotate(-30,40,87)" />
        <circle cx="22" cy="84" r="8" fill="#E8C8A9" />
      </g>
      {/* Other hand pulling */}
      <g>
        <animateTransform attributeName="transform" type="translate" values="0,0;-6,3;0,0" dur="3s" repeatCount="indefinite" />
        <rect x="130" y="60" width="45" height="55" rx="18" fill="#D4B59E" />
        <rect x="135" y="80" width="10" height="30" rx="5" fill="#D4B59E" transform="rotate(20,140,95)" />
        {/* Fingers wrapping thumb */}
        <path d="M140 72 Q125 75 18 88" stroke="#D4B59E" strokeWidth="10" strokeLinecap="round" fill="none" />
      </g>
      {/* Stretch direction arrow */}
      <path d="M30 98 L18 108" stroke="#003E51" strokeWidth="2" strokeLinecap="round" opacity="0.5">
        <animate attributeName="opacity" values="0.2;0.6;0.2" dur="3s" repeatCount="indefinite" />
      </path>
      <polygon points="16,110 22,106 20,114" fill="#003E51" opacity="0.4" />
      {/* Highlight stretch zone */}
      <circle cx="30" cy="87" r="14" stroke="#00565B" strokeWidth="1.5" fill="#00565B" opacity="0" strokeDasharray="3 3">
        <animate attributeName="opacity" values="0;0.15;0" dur="3s" repeatCount="indefinite" />
      </circle>
    </svg>
  );
}

/* ====== 5. Flexão/Extensão de Punho (Fraturas) ====== */
export function IllustWristFlexExt({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 200" fill="none" className={className}>
      {/* Forearm */}
      <rect x="75" y="120" width="50" height="80" rx="18" fill="#D4B59E" />
      {/* Wrist */}
      <ellipse cx="100" cy="120" rx="28" ry="12" fill="#D4B59E" />
      {/* Hand — flexes up and down */}
      <g>
        <animateTransform attributeName="transform" type="rotate" values="0,100,108;-30,100,108;0,100,108;25,100,108;0,100,108" dur="4s" repeatCount="indefinite" />
        <rect x="72" y="55" width="56" height="58" rx="18" fill="#E8C8A9" />
        {/* Fingers */}
        <rect x="76" y="26" width="12" height="35" rx="6" fill="#E8C8A9" />
        <rect x="90" y="20" width="12" height="39" rx="6" fill="#E8C8A9" />
        <rect x="104" y="22" width="12" height="37" rx="6" fill="#E8C8A9" />
        <rect x="116" y="30" width="11" height="30" rx="5.5" fill="#E8C8A9" />
        {/* Thumb */}
        <ellipse cx="128" cy="82" rx="11" ry="7" fill="#E8C8A9" transform="rotate(-20,128,82)" />
      </g>
      {/* Up arrow */}
      <path d="M50 65 L50 45" stroke="#003E51" strokeWidth="1.5" strokeLinecap="round" opacity="0.4" />
      <polygon points="50,43 46,49 54,49" fill="#003E51" opacity="0.4" />
      {/* Down arrow */}
      <path d="M50 85 L50 105" stroke="#003E51" strokeWidth="1.5" strokeLinecap="round" opacity="0.4" />
      <polygon points="50,107 46,101 54,101" fill="#003E51" opacity="0.4" />
      <text x="48" y="76" textAnchor="middle" fill="#003E51" fontSize="8" opacity="0.35" fontFamily="sans-serif">↕</text>
    </svg>
  );
}

/* ====== 6. Alongamento do Antebraço (Cisto Sinovial) ====== */
export function IllustForearmStretch({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 200" fill="none" className={className}>
      {/* Arm horizontal */}
      <rect x="10" y="85" width="100" height="35" rx="16" fill="#D4B59E" />
      {/* Hand — pulled back by other hand */}
      <g>
        <animateTransform attributeName="transform" type="rotate" values="0,110,102;-20,110,102;0,110,102" dur="3s" repeatCount="indefinite" />
        <rect x="105" y="72" width="50" height="38" rx="16" fill="#E8C8A9" />
        {/* Fingers */}
        <rect x="148" y="74" width="10" height="14" rx="5" fill="#E8C8A9" />
        <rect x="148" y="90" width="10" height="14" rx="5" fill="#E8C8A9" />
        <rect x="150" y="82" width="12" height="12" rx="6" fill="#E8C8A9" />
      </g>
      {/* Other hand pushing fingers back */}
      <g>
        <animateTransform attributeName="transform" type="translate" values="0,0;2,-4;0,0" dur="3s" repeatCount="indefinite" />
        <rect x="140" y="48" width="40" height="30" rx="12" fill="#D4B59E" opacity="0.9" />
        <rect x="148" y="38" width="8" height="14" rx="4" fill="#D4B59E" opacity="0.9" />
        <rect x="158" y="40" width="8" height="12" rx="4" fill="#D4B59E" opacity="0.9" />
        <rect x="168" y="44" width="7" height="10" rx="3.5" fill="#D4B59E" opacity="0.9" />
      </g>
      {/* Stretch zone */}
      <ellipse cx="100" cy="105" rx="20" ry="8" stroke="#00565B" strokeWidth="1.5" fill="none" strokeDasharray="3 3" opacity="0">
        <animate attributeName="opacity" values="0;0.3;0" dur="3s" repeatCount="indefinite" />
      </ellipse>
      {/* Arrow */}
      <path d="M155 72 L155 58" stroke="#003E51" strokeWidth="1.5" strokeLinecap="round" opacity="0.4">
        <animate attributeName="opacity" values="0.2;0.5;0.2" dur="3s" repeatCount="indefinite" />
      </path>
      <polygon points="155,56 151,62 159,62" fill="#003E51" opacity="0.4" />
    </svg>
  );
}
