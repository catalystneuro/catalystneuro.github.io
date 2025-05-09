import { MapPin } from "lucide-react";
import { Contact } from "@/components/Contact";
import PageLayout from "@/components/PageLayout";

export default function ContactPage() {
  return (
    <PageLayout
      title="Contact Us"
      subtitle="We'd love to hear from you. Get in touch with our team."
    >
      <Contact />
      <section className="py-10">
        <div className="container max-w-4xl">
          <div className="text-center space-y-12 backdrop-blur-sm bg-white/80 p-8 rounded-2xl shadow-sm border border-primary/10">
            <div className="space-y-2">
              <div className="inline-flex items-center justify-center gap-2 text-lg">
                <MapPin className="h-5 w-5 text-primary" />
                <span className="font-semibold text-secondary">Mailing Address:</span>
              </div>
              <div className="text-lg text-secondary/75">
                <p>CatalystNeuro</p>
                <p>150 E B St Lbby #1810 SMB#45673</p>
                <p>Casper, WY 82601</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
