const PRODUCTION_URL = "https://mohamed-kebe-data-ia-software-engin.vercel.app";

/** Accepts a URL or bare host, and rejects values that are not a usable public host. */
function parseSiteUrl(value: string | undefined): URL | null {
  const trimmed = value?.trim();
  if (!trimmed) return null;
  try {
    const url = new URL(/^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`);
    return url.hostname.includes(".") || url.hostname === "localhost" ? url : null;
  } catch {
    return null;
  }
}

/**
 * Canonical origin of the site. It deliberately ignores VERCEL_URL, which is
 * unique per deployment and would point canonical links at preview hosts.
 */
export const siteUrl = parseSiteUrl(process.env.NEXT_PUBLIC_SITE_URL) ?? new URL(PRODUCTION_URL);
