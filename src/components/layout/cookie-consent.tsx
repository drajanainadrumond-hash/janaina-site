"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const COOKIE_KEY = "cookie-consent";

type ConsentState = "pending" | "accepted" | "rejected";

export function CookieConsent() {
  const [consent, setConsent] = useState<ConsentState>("pending");
  // Inicia visível para ser renderizado no SSR (pinta no FCP, não atrasa o LCP).
  // Quem já consentiu é escondido antes do paint pelo script anti-flash no layout
  // (data-consent="given") e desmontado por este efeito.
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem(COOKIE_KEY);
    if (stored === "accepted" || stored === "rejected") {
      setConsent(stored);
      setVisible(false);
      if (stored === "accepted") injectAnalytics();
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

  function injectMetaPixel() {
    const pixelId = process.env.NEXT_PUBLIC_META_PIXEL_ID;
    if (!pixelId || document.getElementById("meta-pixel")) return;

    const script = document.createElement("script");
    script.id = "meta-pixel";
    script.innerHTML = `!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','${pixelId}');fbq('track','PageView');`;
    document.head.appendChild(script);
  }

  // Carrega os trackers (GTM/GA4 + Meta Pixel) — só após consentimento.
  function injectAnalytics() {
    injectGTM();
    injectMetaPixel();
  }

  function handleAccept() {
    localStorage.setItem(COOKIE_KEY, "accepted");
    setConsent("accepted");
    setVisible(false);
    injectAnalytics();
  }

  function handleReject() {
    localStorage.setItem(COOKIE_KEY, "rejected");
    setConsent("rejected");
    setVisible(false);
  }

  if (!visible || consent !== "pending") return null;

  return (
    <div className="cookie-consent-root fixed bottom-0 inset-x-0 z-[9999] p-4 sm:p-6">
      <div className="max-w-[440px] mx-auto bg-white rounded-2xl shadow-[0_8px_40px_rgba(0,0,0,0.12)] border border-black/[0.04] p-4 sm:p-5">
        <p className="text-[0.95rem] text-[#4A5E6B] leading-[1.6] mb-3">
          Usamos cookies para melhorar sua experiência. Ao aceitar, você concorda com nossa{" "}
          <Link href="/politica-de-privacidade" className="text-teal underline underline-offset-2">
            Política de Privacidade
          </Link>.
        </p>
        <div className="flex flex-col sm:flex-row gap-2.5">
          <button
            onClick={handleAccept}
            className="flex-1 py-2.5 rounded-full text-[1rem] tracking-[0.3px] bg-teal text-white hover:bg-teal-mid transition-colors"
          >
            Aceitar cookies
          </button>
          <button
            onClick={handleReject}
            className="flex-1 py-2.5 rounded-full text-[1rem] tracking-[0.3px] bg-cream-light text-[#4A5E6B] border border-cream-dark hover:bg-cream-dark/20 transition-colors"
          >
            Rejeitar
          </button>
        </div>
      </div>
    </div>
  );
}
