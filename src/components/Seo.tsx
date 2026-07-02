import { Head } from "vite-react-ssg";
import { useLocation } from "react-router-dom";

export interface SeoProps {
  title?: string;
  description?: string;
  image?: string;
  type?: "website" | "article";
}

const SITE_NAME = "CatalystNeuro";
const SITE_URL = "https://catalystneuro.com";
const DEFAULT_TITLE = `${SITE_NAME} - Neurophysiology Data & Software Solutions`;
const DEFAULT_DESCRIPTION =
  "CatalystNeuro empowers neuroscience labs with data standardization, NWB conversions, spike sorting pipelines, and open-source software tools for neurophysiology research.";
const DEFAULT_IMAGE = "/social-card.png";

// Netlify's pretty-URL handling 301s interior pages to the trailing-slash
// form, so canonicals must use it too or they point at a redirect.
const canonicalUrl = (pathname: string) =>
  `${SITE_URL}${pathname.endsWith("/") ? pathname : `${pathname}/`}`;

const absoluteUrl = (pathOrUrl: string) =>
  pathOrUrl.startsWith("http") ? pathOrUrl : `${SITE_URL}${pathOrUrl}`;

/**
 * Per-route document head, rendered through react-helmet-async (via
 * vite-react-ssg's <Head>). The Layout renders this on every route from the
 * matched route `handle`; dynamic pages render their own <Head> with
 * content-derived values that override these defaults (helmet dedupes by tag).
 *
 * The site-wide title/description/OG/Twitter tags formerly hardcoded in
 * index.html now live here so there is a single source of truth per route.
 */
export const Seo = ({
  title,
  description = DEFAULT_DESCRIPTION,
  image = DEFAULT_IMAGE,
  type = "website",
}: SeoProps) => {
  const fullTitle = title ? `${title} — ${SITE_NAME}` : DEFAULT_TITLE;
  const url = canonicalUrl(useLocation().pathname);
  const imageUrl = absoluteUrl(image);
  return (
    <Head>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />

      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={imageUrl} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={url} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imageUrl} />
    </Head>
  );
};

export default Seo;
