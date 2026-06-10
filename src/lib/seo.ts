import { absoluteUrl, siteConfig } from "#/site.config";

export interface SeoOptions {
  title?: string;
  description?: string;
  path?: string;
  image?: string;
  type?: "website" | "article";
  noIndex?: boolean;
}

interface MetaDescriptor {
  title?: string;
  name?: string;
  property?: string;
  content?: string;
}

interface LinkDescriptor {
  rel: string;
  href: string;
}

export interface SeoDescriptor {
  meta: MetaDescriptor[];
  links: LinkDescriptor[];
}

function getTitle(title?: string) {
  if (!title) {
    return siteConfig.title;
  }

  return `${title} | ${siteConfig.name}`;
}

function compact<T>(items: (T | undefined)[]) {
  return items.filter((item): item is T => Boolean(item));
}

export function seo(options: SeoOptions = {}): SeoDescriptor {
  const title = getTitle(options.title);
  const description = options.description ?? siteConfig.description;
  const url = absoluteUrl(options.path);
  const imageUrl = absoluteUrl(options.image ?? siteConfig.image);
  const type = options.type ?? siteConfig.type;

  return {
    meta: compact<MetaDescriptor>([
      { title },
      { name: "description", content: description },

      { property: "og:type", content: type },
      { property: "og:url", content: url },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:image", content: imageUrl },

      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
      { name: "twitter:image", content: imageUrl },

      options.noIndex ? { name: "robots", content: "noindex,nofollow" } : undefined,
    ]),

    links: [{ rel: "canonical", href: url }],
  };
}
