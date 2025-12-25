import { Users, FolderGit2, Building2 } from "lucide-react";

const stats = [
  { label: "Research Labs", value: "60+", icon: Users },
  { label: "Funded Projects", value: "14", icon: FolderGit2 },
  { label: "Partner Institutions", value: "25+", icon: Building2 },
];

export const WhyUs = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container max-w-6xl">
        {/* Stats Banner */}
        <div className="grid grid-cols-3 gap-6 mb-16">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
                <stat.icon className="w-6 h-6 text-primary" />
              </div>
              <div className="text-3xl font-bold text-secondary">{stat.value}</div>
              <div className="text-sm text-secondary/60">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Differentiation */}
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-secondary mb-4">
            Research Software Engineers for Neuroscience
          </h2>
          <p className="text-lg text-secondary/75 mb-8">
            We bridge the gap between academic research and professional software engineering.
            Our team combines deep neuroscience domain expertise with production-grade development
            practices — delivering solutions that are both scientifically rigorous and built to last.
          </p>

          <div className="grid md:grid-cols-3 gap-6 text-left">
            <div className="bg-white p-5 rounded-lg border border-gray-200">
              <h3 className="font-semibold text-secondary mb-2">Domain Experts</h3>
              <p className="text-sm text-secondary/70">
                Our engineers have published research and understand the nuances of neurophysiology data.
              </p>
            </div>
            <div className="bg-white p-5 rounded-lg border border-gray-200">
              <h3 className="font-semibold text-secondary mb-2">100% Open Source</h3>
              <p className="text-sm text-secondary/70">
                No vendor lock-in. Every tool we build is open source and belongs to the community.
              </p>
            </div>
            <div className="bg-white p-5 rounded-lg border border-gray-200">
              <h3 className="font-semibold text-secondary mb-2">Production Quality</h3>
              <p className="text-sm text-secondary/70">
                Professional testing, documentation, and long-term maintainability. Not just research prototypes.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
