const deploymentHost = process.env.VERCEL_URL;
const configuredSiteUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim();
const siteUrlValue =
  configuredSiteUrl ||
  (deploymentHost ? `https://${deploymentHost}` : "https://magic-portfolio.vercel.app");

export const siteUrl = new URL(
  /^https?:\/\//i.test(siteUrlValue) ? siteUrlValue : `https://${siteUrlValue}`,
);
