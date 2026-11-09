import { afterEach, describe, expect, it, vi } from "vitest";

const load = async (value?: string) => {
  vi.resetModules();
  vi.stubEnv("NEXT_PUBLIC_SITE_URL", value ?? "");
  return (await import("@/lib/site-url")).siteUrl.origin;
};

const production = "https://mohamed-kebe-data-ia-software-engin.vercel.app";

afterEach(() => vi.unstubAllEnvs());

describe("siteUrl", () => {
  it("defaults to the production host", async () => {
    expect(await load()).toBe(production);
  });

  it("accepts a bare domain", async () => {
    expect(await load("example.com")).toBe("https://example.com");
  });

  it("ignores a value that is not a real host", async () => {
    expect(await load("mohamed-kebe-data-ia-software-engineer")).toBe(production);
  });
});
