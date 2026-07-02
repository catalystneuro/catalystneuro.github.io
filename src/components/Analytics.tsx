import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

// Built-in Measurement ID, overridable per environment via the env var.
const GA_ID = import.meta.env.VITE_GA_MEASUREMENT_ID || "G-FRC1ZQ1WCF";

// Only report from the live site, so localhost and *.netlify.app deploy
// previews never pollute analytics.
const PRODUCTION_HOSTS = ["catalystneuro.com", "www.catalystneuro.com"];

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: (...args: unknown[]) => void;
  }
}

/**
 * Google Analytics 4 integration.
 *
 * The gtag script is injected on mount (never during SSR, since effects don't
 * run there), and only on the production host. Because this is a single-page
 * app we send a page_view on every route change — the base gtag snippet only
 * fires once on the initial load.
 */
const Analytics = () => {
  const { pathname, search } = useLocation();
  const initialized = useRef(false);

  useEffect(() => {
    if (!GA_ID || !PRODUCTION_HOSTS.includes(window.location.hostname)) return;

    if (!initialized.current) {
      const script = document.createElement("script");
      script.async = true;
      script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
      document.head.appendChild(script);

      window.dataLayer = window.dataLayer || [];
      window.gtag = function gtag() {
        // eslint-disable-next-line prefer-rest-params
        window.dataLayer.push(arguments);
      };
      window.gtag("js", new Date());
      // Route changes are tracked manually below, so disable automatic sends.
      window.gtag("config", GA_ID, { send_page_view: false });
      initialized.current = true;
    }

    window.gtag("event", "page_view", {
      page_path: `${pathname}${search}`,
      page_location: window.location.href,
      page_title: document.title,
    });
  }, [pathname, search]);

  return null;
};

export default Analytics;
