const deploymentHost = process.env.VERCEL_URL;

export const siteUrl = new URL(
  process.env.NEXT_PUBLIC_SITE_URL ??
    (deploymentHost ? `https://${deploymentHost}` : "https://magic-portfolio.vercel.app"),
);
