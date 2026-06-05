import Script from "next/script";
import { UMAMI_SCRIPT_URL, UMAMI_WEBSITE_ID } from "@/lib/umami";

export function UmamiAnalytics() {
  if (!UMAMI_WEBSITE_ID) return null;

  return (
    <Script
      src={UMAMI_SCRIPT_URL}
      data-website-id={UMAMI_WEBSITE_ID}
      strategy="lazyOnload"
    />
  );
}
