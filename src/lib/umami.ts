/**
 * Umami analytics — website ID is public (sent to browsers). Override via env for forks.
 * API keys / account IDs are for dashboard API only; never use NEXT_PUBLIC_* for them.
 */
export const UMAMI_WEBSITE_ID =
  process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID ??
  "5abf3300-42ed-4f1f-9bea-dfadfe619261";

export const UMAMI_SCRIPT_URL =
  process.env.NEXT_PUBLIC_UMAMI_SCRIPT_URL ?? "https://cloud.umami.is/script.js";
