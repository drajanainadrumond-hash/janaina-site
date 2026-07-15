"use client";

import { useEffect } from "react";
import { captureAttribution, exposeOrbeeGlobal } from "@/lib/utm";

/** Dispara a captura de UTMs/gclid/fbclid no carregamento de qualquer página. */
export function UtmCapture() {
  useEffect(() => {
    captureAttribution();
    // Contrato do padrão Orbee (`window.Orbee.getAttribution()`) — deixa a
    // Auto-Captura oficial da Central rodar aqui sem adaptação, se um dia for colada.
    exposeOrbeeGlobal();
  }, []);
  return null;
}
