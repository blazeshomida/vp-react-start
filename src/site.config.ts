export interface SiteConfig {
  name: string;
  title: string;
  description: string;
  url: string;
  image: string;
  type: "website" | "article";
}

export const siteConfig = {
  name: "vp-react-start",
  title: "vp-react-start",
  description: "A React app starter built with Vite+, TanStack Start, and TypeScript.",
  url: "https://example.com",
  image: "/og-image.png",
  type: "website",
} satisfies SiteConfig;

export function absoluteUrl(path = "/") {
  return new URL(path, siteConfig.url).toString();
}
