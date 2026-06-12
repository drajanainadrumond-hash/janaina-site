"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const COOKIE_KEY = "cookie-consent";

type ConsentState = "pending" | "accepted" | "rejected";

export function CookieConsent() {
  const [consent, setConsent] = useState<ConsentState>("pending");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(COOKIE_KEY);
    if (stored === "accepted" || stored === "rejected") {
      setConsent(stored);
      if (stored === "accepted") injectGTM();
    } else {
      setVisible(true);
    }
  }, []);

  useEffect(() => {
    if (visible && consent === "pending") {
      document.body.classList.add("cookie-banner-open");
    } else {
      document.body.classList.remove("cookie-banner-open");
    }
    return () => document.body.classList.remove("cookie-banner-open");
  }, [visible, consent]);

  function injectGTM() {
    const gtmId = process.env.NEXT_PUBLIC_GTM_ID;
    if (!gtmId || document.getElementById("gtm-script")) return;

    // GTM script
    const script = document.createElement("script");
    script.id = "gtm-script";
    script.innerHTML = `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
    new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
    j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
    'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
    })(window,document,'script','dataLayer','${gtmId}');`;
    document.head.appendChild(script);

    // GTM noscript
    const noscript = document.createElement("noscript");
    noscript.innerHTML = `<iframe src="https://www.googletagmanager.com/ns.html?id=${gtmId}" height="0" width="0" style="display:none;visibility:hidden"></iframe>`;
    document.body.insertBefore(noscript, document.body.firstChild);
  }

  function handleAccept() {
    localStorage.setItem(COOKIE_KEY, "accepted");
    setConsent("accepted");
    setVisible(false);
    injectGTM();
  }

  function handleReject() {
    localStorage.setItem(COOKIE_KEY, "rejected");
    setConsent("rejected");
    setVisible(false);
  }

  if (!visible || consent !== "pending") return null;

  return (
    <div className="fixed bottom-0 inset-x-0 z-[9999] p-4 sm:p-6">
      <div className="max-w-[600px] mx-auto bg-white rounded-2xl shadow-[0_8px_40px_rgba(0,0,0,0.12)] border border-black/[0.04] p-5 sm:p-6">
        <p className="text-[1.125rem] text-[#4A5E6B] leading-[1.7] mb-4">
          Utilizamos cookies analíticos para melhorar sua experiência de navegação.
          Ao aceitar, você concorda com o uso de cookies conforme nossa{" "}
          <Link href="/politica-de-privacidade" className="text-teal underline underline-offset-2">
            Política de Privacidade
          </Link>.
        </p>
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={handleAccept}
            className="flex-1 py-2.5 rounded-full text-[1.125rem] tracking-[0.3px] bg-teal text-white hover:bg-teal-mid transition-colors"
          >
            Aceitar cookies
          </button>
          <button
            onClick={handleReject}
            className="flex-1 py-2.5 rounded-full text-[1.125rem] tracking-[0.3px] bg-cream-light text-[#4A5E6B] border border-cream-dark hover:bg-cream-dark/20 transition-colors"
          >
            Rejeitar
          </button>
        </div>
      </div>
    </div>
  );
}
