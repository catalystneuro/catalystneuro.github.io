import { Calendar, Brain, FileCode, Database, Cloud, Users, BarChart, Book, Share2, Code } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const ServiceCard = ({ 
  title, 
  description, 
  icon: Icon, 
  buttonText, 
  buttonLink,
  features = [],
  showLink = false
}: { 
  title: string;
  description: string;
  icon: any;
  buttonText: string;
  buttonLink: string;
  features?: string[];
  showLink?: boolean;
}) => (
  <Card data-testid="service-card" className="group hover:shadow-md transition-shadow duration-300 bg-white border-gray-200">
    <CardHeader>
      <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
        <Icon className="w-6 h-6 text-primary" />
      </div>
      <CardTitle className="text-2xl text-secondary">{title}</CardTitle>
      <CardDescription className="text-base text-secondary/75">{description}</CardDescription>
    </CardHeader>
    <CardContent className="space-y-4">
      {features.length > 0 && (
        <ul className="space-y-2">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start gap-2 text-secondary/75">
              <div className="w-1.5 h-1.5 rounded-full bg-primary/60 flex-shrink-0 mt-2" />
              {feature}
            </li>
          ))}
        </ul>
      )}
      {showLink && (
        <a href={buttonLink} className="inline-flex items-center text-primary hover:text-primary/80 font-medium transition-colors">
          {buttonText}
          <span className="ml-1">→</span>
        </a>
      )}
    </CardContent>
  </Card>
);

export const Services = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container">
        <div className="max-w-2xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-secondary">Our Services</h2>
          <p className="text-secondary/75 max-w-2xl mx-auto mt-4 text-lg">
            CatalystNeuro has worked successfully with diverse scientific research groups in a variety of capacities. 
            All work we do with scientific research groups is open source, so our team can fit seamlessly with research 
            groups without worry of expensive licensing fees or vendor lock-in.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          <ServiceCard
            title="Open Data Management"
            description="Convert your data to Neurodata Without Borders (NWB) and publish on the DANDI Archive."
            icon={Database}
            buttonText="View Our Work"
            buttonLink="/nwb-conversions"
            showLink={true}
            features={[
              "Open source conversion pipeline",
              "Compliance with government and foundation funders",
              "Includes notebooks demonstrating data use",
              "Experience with 60+ labs"
            ]}
          />

          <ServiceCard
            title="Software Engineering"
            description="Integrate existing analysis, visualization, and data management tools with open data via NWB and DANDI."
            icon={Code}
            buttonText="View Our Work"
            buttonLink="/analysis-software"
            showLink={true}
            features={[
              "Professionalize software through packaging, testing, and documentation",
              "Create reproducible workflows for data processing and analysis"
            ]}
          />

          <ServiceCard
            title="AI in Neuro"
            description="Leverage AI and machine learning to accelerate neuroscience research."
            icon={Brain}
            buttonText="Get Started"
            buttonLink="/contact"
            features={[
              "Develop agents to automate processing steps",
              "Data curation for building neural foundation models",
              "Training in agentic code generation"
            ]}
          />
        </div>

        <div className="mt-16 max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-8 text-secondary">Additional Capabilities</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { icon: Cloud, label: "Cloud Integration" },
              { icon: Users, label: "Team Training" },
              { icon: BarChart, label: "Data Analytics" },
              { icon: Share2, label: "Open Source" },
            ].map((item, index) => (
              <div key={index} className="flex flex-col items-center text-center bg-white p-4 rounded-lg border border-gray-200">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-3">
                  <item.icon className="w-6 h-6 text-primary" />
                </div>
                <span className="text-sm font-medium">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
