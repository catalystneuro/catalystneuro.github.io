import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

const GA_ID = import.meta.env.VITE_GA_MEASUREMENT_ID;

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: (...args: unknown[]) => void;
  }
}

/**
 * Google Analytics 4 integration.
 *
 * No-ops unless VITE_GA_MEASUREMENT_ID is set at build time, so local dev and
 * deploy previews stay untracked. The gtag script is injected on mount (never
 * during SSR, since effects don't run there), and because this is a
 * single-page app we send a page_view on every route change — the base gtag
 * snippet only fires one on the initial load.
 */
const Analytics = () => {
  const { pathname, search } = useLocation();
  const initialized = useRef(false);

  useEffect(() => {
    if (!GA_ID) return;

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
