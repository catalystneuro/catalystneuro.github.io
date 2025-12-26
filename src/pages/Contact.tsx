import { MapPin, Mail, Github, Linkedin, Calendar } from "lucide-react";
import { Contact } from "@/components/Contact";
import PageLayout from "@/components/PageLayout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function ContactPage() {
  return (
    <PageLayout
      title="Contact Us"
      subtitle="We'd love to hear from you. Get in touch with our team."
    >
      <div className="max-w-5xl mx-auto">
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Contact Methods */}
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Mail className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-secondary mb-1">Email Us</h3>
                  <a
                    href="mailto:info@catalystneuro.com"
                    className="text-primary hover:underline"
                  >
                    info@catalystneuro.com
                  </a>
                  <p className="text-sm text-secondary/60 mt-1">We typically respond within 1-2 business days</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Calendar className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-secondary mb-1">Schedule a Consultation</h3>
                  <p className="text-secondary/75 text-sm mb-3">Book a free 30-minute call to discuss your project</p>
                  <Link to="/consultation">
                    <Button size="sm" className="bg-primary hover:bg-primary/90">
                      Book a Call
                    </Button>
                  </Link>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <MapPin className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-secondary mb-1">Mailing Address</h3>
                  <div className="text-secondary/75 text-sm">
                    <p>CatalystNeuro</p>
                    <p>150 E B St Lbby #1810 SMB#45673</p>
                    <p>Casper, WY 82601</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <h3 className="font-semibold text-secondary mb-3">Connect With Us</h3>
              <div className="flex gap-4">
                <a
                  href="https://github.com/catalystneuro"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-lg bg-secondary/5 flex items-center justify-center text-secondary/70 hover:bg-secondary/10 hover:text-secondary transition-colors"
                >
                  <Github className="h-5 w-5" />
                </a>
                <a
                  href="https://www.linkedin.com/company/catalyst-neuro"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-lg bg-secondary/5 flex items-center justify-center text-secondary/70 hover:bg-secondary/10 hover:text-secondary transition-colors"
                >
                  <Linkedin className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>

          {/* Newsletter */}
          <div className="bg-white p-8 rounded-lg border border-gray-200 h-fit">
            <Contact />
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
