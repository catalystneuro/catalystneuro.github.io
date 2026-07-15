import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";
import { loadSoftware } from "@/utils/contentLoader";
import PageLayout from "@/components/PageLayout";

const Guides = () => {
  const guides = loadSoftware().filter((software) => software.type === "guide");

  return (
    <PageLayout
      title="Documentation & Guides"
      subtitle="Step-by-step guides and reference documentation for working with CatalystNeuro and the NWB ecosystem."
    >
      <div className="grid gap-8 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
        {guides.map((guide) => (
          <Card
            key={guide.name}
            className="flex flex-col hover:shadow-lg transition-shadow backdrop-blur-sm bg-white/80 border-primary/10 hover:border-primary/30"
          >
            <CardHeader>
              <CardTitle className="text-2xl">{guide.name}</CardTitle>
            </CardHeader>
            <CardContent className="flex-grow">
              <CardDescription className="text-secondary/75 text-base">
                {guide.description}
              </CardDescription>
            </CardContent>
            <CardFooter>
              <Button variant="outline" size="sm" asChild>
                <Link to={guide.docs} className="flex items-center">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  View Guide
                </Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </PageLayout>
  );
};

export default Guides;
