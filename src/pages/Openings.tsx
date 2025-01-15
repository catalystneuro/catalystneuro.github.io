import { Navigation } from "@/components/Navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { loadOpenings } from "@/utils/contentLoader";

const Openings = () => {
  const positions = loadOpenings();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gradient-start to-gradient-end">
      <Navigation />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8 text-center">Open Positions</h1>
        <p className="text-center text-lg text-muted-foreground mb-12 max-w-2xl mx-auto">
          Join our team and help shape the future of neuroscience data management.
        </p>
        {positions.filter(position => position.enabled !== false).length === 0 ? (
          <div className="text-center">
            <p className="text-xl text-muted-foreground">
              We currently don't have any open positions. Please check back later!
            </p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2">
            {positions.filter(position => position.enabled !== false).map((position) => (
            <Card key={position.id} className="flex flex-col">
              <img
                src={position.image}
                alt={position.title}
                className="w-full h-48 object-cover rounded-t-lg"
              />
              <CardHeader>
                <CardTitle>{position.title}</CardTitle>
                <CardDescription>{position.type} • {position.location}</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-muted-foreground">{position.description}</p>
              </CardContent>
              <CardFooter>
                <Link to={`/openings/${position.id}`}>
                  <Button className="w-full group">
                    View Position
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </CardFooter>
            </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Openings;
