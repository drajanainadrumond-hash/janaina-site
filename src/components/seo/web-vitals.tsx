"use client";

import { useReportWebVitals } from "next/web-vitals";

export function WebVitals() {
  useReportWebVitals((metric) => {
    // Send to analytics when GTM is configured
    if (typeof window !== "undefined" && "dataLayer" in window) {
      (window as unknown as { dataLayer: Record<string, unknown>[] }).dataLayer.push({
        event: "web-vitals",
        metric_name: metric.name,
        metric_value: metric.value,
        metric_rating: metric.rating,
      });
    }
  });

  return null;
}
