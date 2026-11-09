const PRODUCTION_URL = "https://mohamed-kebe-data-ia-software-engin.vercel.app";

const configured = process.env.NEXT_PUBLIC_SITE_URL?.trim() || PRODUCTION_URL;

/**
 * Canonical origin of the site. It deliberately ignores VERCEL_URL, which is
 * unique per deployment and would point canonical links at preview hosts.
 */
export const siteUrl = new URL(/^https?:\/\//i.test(configured) ? configured : `https://${configured}`);
