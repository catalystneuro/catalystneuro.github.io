import { useEffect } from "react";
import PageLayout from "@/components/PageLayout";

export default function Consultation() {
  useEffect(() => {
    // Load the Calendly widget script
    const script = document.createElement("script");
    script.src = "https://assets.calendly.com/assets/external/widget.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      // Cleanup script on unmount
      const existingScript = document.querySelector(
        'script[src="https://assets.calendly.com/assets/external/widget.js"]'
      );
      if (existingScript) {
        existingScript.remove();
      }
    };
  }, []);

  return (
    <PageLayout
      title="Schedule a Consultation"
      subtitle="Book a time to discuss your project with our team."
    >
      <section className="py-10">
        <div className="container max-w-4xl">
          <div
            className="calendly-inline-widget"
            data-url="https://calendly.com/ben-dichter"
            style={{ minWidth: "320px", height: "700px" }}
          />
        </div>
      </section>
    </PageLayout>
  );
}
