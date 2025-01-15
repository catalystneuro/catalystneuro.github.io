import { Calendar, Brain, FileCode, Database, Cloud, Users, BarChart, Book, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const ServiceCard = ({ 
  title, 
  description, 
  icon: Icon, 
  buttonText, 
  buttonLink,
  features = []
}: { 
  title: string;
  description: string;
  icon: any;
  buttonText: string;
  buttonLink: string;
  features?: string[];
}) => (
  <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
    <CardHeader>
      <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
        <Icon className="w-6 h-6 text-primary" />
      </div>
      <CardTitle className="text-2xl">{title}</CardTitle>
      <CardDescription className="text-base">{description}</CardDescription>
    </CardHeader>
    <CardContent className="space-y-4">
      {features.length > 0 && (
        <ul className="space-y-2">
          {features.map((feature, index) => (
            <li key={index} className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-primary/60" />
              {feature}
            </li>
          ))}
        </ul>
      )}
      <Button className="w-full group" onClick={() => window.open(buttonLink)}>
        {buttonText}
        <Icon className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
      </Button>
    </CardContent>
  </Card>
);

export const Services = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container">
        <div className="max-w-2xl mx-auto text-center mb-16">
          <h2 className="text-4xl font-bold mb-6">Our Services</h2>
          <p className="text-lg text-muted-foreground">
            CatalystNeuro has worked successfully with diverse scientific research groups in a variety of capacities. 
            All work we do with scientific research groups is open source, so our team can fit seamlessly with research 
            groups without worry of expensive licensing fees or vendor lock-in.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          <ServiceCard
            title="NWB Conversion Pipelines"
            description="Standardize and publish your experimental data with NWB and DANDI Archive."
            icon={Database}
            buttonText="Schedule a Consultation"
            buttonLink="#schedule-consultation"
            features={[
              "NIH data sharing policy compliance",
              "DANDI Archive integration",
              "Comprehensive metadata support",
              "Analysis tool ecosystem access"
            ]}
          />

          <ServiceCard
            title="Spike Sorting Pipelines"
            description="Custom spike sorting solutions using SpikeInterface for your specific needs."
            icon={Brain}
            buttonText="Request Consultation"
            buttonLink="#spike-sorting"
            features={[
              "Technology-specific customization",
              "Open source implementation",
              "Team training and support",
              "Pipeline modification guidance"
            ]}
          />

          <ServiceCard
            title="Grant Applications"
            description="Expert data infrastructure support for NIH grant applications."
            icon={FileCode}
            buttonText="Schedule Consultation"
            buttonLink="#grant-consultation"
            features={[
              "Data standardization & sharing",
              "Electronic lab notebooks",
              "Data dashboards & visualization",
              "Cloud technology integration"
            ]}
          />
        </div>

        <div className="mt-16 max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-8">Additional Capabilities</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { icon: Cloud, label: "Cloud Integration" },
              { icon: Users, label: "Team Training" },
              { icon: BarChart, label: "Data Analytics" },
              { icon: Share2, label: "Open Source" },
            ].map((item, index) => (
              <div key={index} className="flex flex-col items-center text-center group">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
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
