import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { loadOpenings } from "@/utils/contentLoader";
import PageLayout from "@/components/PageLayout";

const Openings = () => {
  const positions = loadOpenings();

  return (
    <PageLayout
      title="Open Positions"
      subtitle="Join our team and help shape the future of neuroscience data management."
    >
      {positions.filter(position => position.enabled !== false).length === 0 ? (
        <div className="text-center backdrop-blur-sm bg-white/80 p-8 rounded-2xl shadow-sm border border-primary/10 max-w-2xl mx-auto">
          <p className="text-xl text-secondary/75">
            We currently don't have any open positions. Please check back later!
          </p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2">
          {positions.filter(position => position.enabled !== false).map((position) => (
            <Card key={position.id} className="flex flex-col hover:shadow-lg transition-shadow backdrop-blur-sm bg-white/80 border-primary/10 hover:border-primary/30">
              <img
                src={position.image}
                alt={position.title}
                className="w-full h-48 object-cover rounded-t-lg"
              />
              <CardHeader>
                <CardTitle className="text-secondary">{position.title}</CardTitle>
                <CardDescription className="text-primary font-medium">{position.type} • {position.location}</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-secondary/75">{position.description}</p>
              </CardContent>
              <CardFooter>
                <a href={`/openings/${position.id}`} className="w-full">
                  <Button className="w-full group">
                    View Position
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </a>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </PageLayout>
  );
};

export default Openings;
