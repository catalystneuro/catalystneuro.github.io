import { Contact } from "@/components/Contact";
import { Mail, MapPin } from "lucide-react";

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-background">
    <Contact />
      <section className="py-20 bg-white">
        <div className="container max-w-4xl">
          <h2 className="text-3xl font-bold text-center mb-12">Contact Us</h2>
          
          <div className="text-center mb-16 space-y-12">

            <div className="space-y-2">
              <div className="inline-flex items-center justify-center gap-2 text-lg">
                <MapPin className="h-5 w-5" />
                <span className="font-semibold">Mailing Address:</span>
              </div>
              <div className="text-lg">
                <p>CatalystNeuro</p>
                <p>150 E B St Lbby #1810 SMB#45673</p>
                <p>Casper, WY 82601</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
