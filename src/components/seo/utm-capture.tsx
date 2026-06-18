"use client";

import { useEffect } from "react";
import { captureAttribution } from "@/lib/utm";

/** Dispara a captura de UTMs/gclid no carregamento de qualquer página. */
export function UtmCapture() {
  useEffect(() => {
    captureAttribution();
  }, []);
  return null;
}
