import { Navigation } from "@/components/Navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Brain, Users, Globe, Database } from "lucide-react";
import { loadAbout } from "@/utils/contentLoader";

const iconMap = {
  Brain,
  Users,
  Globe,
  Database,
};

const About = () => {
  const { sections } = loadAbout();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gradient-start to-gradient-end">
      <Navigation />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8 text-center">About CatalystNeuro</h1>

        <section className="mb-16">
          {sections.map((section, index) => {
            const Icon = iconMap[section.icon as keyof typeof iconMap];
            return (
              <Card key={index} className="mb-8">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Icon className="h-6 w-6 text-primary" />
                    {section.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-lg">
                  {section.content.split('\n\n').map((paragraph, idx) => (
                    <p key={idx}>{paragraph}</p>
                  ))}
                </CardContent>
              </Card>
            );
          })}
        </section>
      </div>
    </div>
  );
};

export default About;