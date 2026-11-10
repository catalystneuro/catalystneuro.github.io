// Builders for the schema.org structured data emitted through JsonLd.astro.
import { SITE } from "../consts";

const abs = (path: string) => new URL(path, SITE.url).href;

/** The organization. Nodes on other pages point at it by @id, and carry the
 *  name and URL too so each page's markup stands on its own. */
export const ORG_ID = `${SITE.url}/#organization`;
export const orgRef = { "@type": "Organization", "@id": ORG_ID, name: SITE.name, url: SITE.url };

/** Breadcrumb trail. Each item is [label, site-relative path]. */
export function breadcrumbs(trail: [string, string][]) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: trail.map(([name, path], i) => ({
      "@type": "ListItem",
      position: i + 1,
      name,
      item: abs(path),
    })),
  };
}

interface SoftwareEntry { name: string; description: string; github?: string; docs?: string; site?: string; paper?: string }

/** One open-source tool. `url` prefers a hosted instance, then docs, then the repository. */
export function software(s: SoftwareEntry) {
  const url = s.site ?? s.docs ?? s.github;
  return {
    "@type": "SoftwareSourceCode",
    name: s.name,
    description: s.description,
    ...(url && { url }),
    ...(s.github && { codeRepository: s.github }),
    ...(s.paper && { citation: s.paper }),
  };
}

/** An ordered list wrapper, for index pages that present a set of things. */
export function itemList(name: string, items: Record<string, unknown>[]) {
  return {
    "@type": "ItemList",
    name,
    numberOfItems: items.length,
    itemListElement: items.map((item, i) => ({ "@type": "ListItem", position: i + 1, item })),
  };
}

export { abs };

/** A page node: WebPage, AboutPage, ContactPage, CollectionPage, and so on.
 *  `extra` adds type-specific properties such as mainEntity. */
export function webPage(type: string, name: string, description: string, path: string, extra: Record<string, unknown> = {}) {
  return {
    "@type": type,
    "@id": `${abs(path)}#webpage`,
    name,
    description,
    url: abs(path),
    isPartOf: { "@type": "WebSite", "@id": `${SITE.url}/#website`, name: SITE.name, url: SITE.url },
    publisher: orgRef,
    ...extra,
  };
}

/** A service CatalystNeuro offers. */
export function service(name: string, description: string, path: string, serviceType: string[]) {
  return {
    "@type": "Service",
    name,
    description,
    url: abs(path),
    serviceType,
    provider: orgRef,
    areaServed: "Worldwide",
  };
}

/** A list of site pages, each [name, site-relative path], for collection pages. */
export function pageList(name: string, pages: [string, string][]) {
  return itemList(name, pages.map(([n, p]) => ({ "@type": "WebPage", name: n, url: abs(p) })));
}
