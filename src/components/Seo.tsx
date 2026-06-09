import { Head } from "vite-react-ssg";

export interface SeoProps {
  title?: string;
  description?: string;
  image?: string;
}

const SITE_NAME = "CatalystNeuro";
const DEFAULT_DESCRIPTION =
  "CatalystNeuro empowers neuroscience labs with data standardization, NWB conversions, spike sorting pipelines, and open-source software tools for neurophysiology research.";

/**
 * Per-route document head. Static pages supply title/description through their
 * route `handle` (rendered centrally by the Layout); dynamic pages render their
 * own <Head> with content-derived values.
 */
export const Seo = ({ title, description = DEFAULT_DESCRIPTION, image }: SeoProps) => {
  const fullTitle = title
    ? `${title} — ${SITE_NAME}`
    : `${SITE_NAME} - Neurophysiology Data & Software Solutions`;
  return (
    <Head>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      {image && <meta property="og:image" content={image} />}
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      {image && <meta name="twitter:image" content={image} />}
    </Head>
  );
};

export default Seo;
