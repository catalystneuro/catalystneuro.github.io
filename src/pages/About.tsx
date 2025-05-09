import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Brain, Users, Globe, Database } from "lucide-react";
import { loadAbout } from "@/utils/contentLoader";
import PageLayout from "@/components/PageLayout";

const iconMap = {
  Brain,
  Users,
  Globe,
  Database,
};

const About = () => {
  const { sections } = loadAbout();

  return (
    <PageLayout
      title="About CatalystNeuro"
      subtitle="Our mission, vision, and approach to advancing neuroscience data standards."
    >
      <section className="space-y-8">
        {sections.map((section, index) => {
          const Icon = iconMap[section.icon as keyof typeof iconMap];
          return (
            <Card key={index} className="backdrop-blur-sm bg-white/80 border-primary/10 hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-secondary">
                  <Icon className="h-6 w-6 text-primary" />
                  {section.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-lg">
                {section.content.split('\n\n').map((paragraph, idx) => (
                  <p key={idx} className="text-secondary/75">{paragraph}</p>
                ))}
              </CardContent>
            </Card>
          );
        })}
      </section>
    </PageLayout>
  );
};

export default About;
