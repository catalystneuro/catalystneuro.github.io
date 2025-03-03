import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Github, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";
import { loadSoftware } from "@/utils/contentLoader";

const NWBSoftware = () => {
  const softwareList = loadSoftware();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gradient-start to-gradient-end pt-16">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8 text-center">NWB Software</h1>
        <p className="text-center text-lg text-muted-foreground mb-12 max-w-2xl mx-auto">
          We develop open-source tools to make neurophysiology data management and standardization accessible to all researchers.
        </p>

        <div className="mb-12">
          <h2 className="text-3xl font-bold mb-6">Core Tools</h2>
          <div className="grid gap-8 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
            {softwareList
              .filter(software => software.type === 'core')
              .map((software) => (
                <Card key={software.name} className="flex flex-col">
                  <img
                    src={software.image}
                    alt={software.name}
                    className="w-full h-48 object-contain rounded-t-lg bg-white p-4"
                  />
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-2xl">{software.name}</CardTitle>
                        <CardDescription className="text-primary font-medium">
                          Status: {software.status}
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <p className="text-muted-foreground">{software.description}</p>
                  </CardContent>
                  <CardFooter className="flex gap-4">
                    <Button variant="outline" size="sm" asChild>
                      <a
                        href={software.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center"
                      >
                        <Github className="w-4 h-4 mr-2" />
                        GitHub
                      </a>
                    </Button>
                    <Button variant="outline" size="sm" asChild>
                      <Link
                        to={software.docs}
                        className="flex items-center"
                      >
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Documentation
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
          </div>
        </div>

        <div className="mb-12">
          <h2 className="text-3xl font-bold mb-6">Neurodata Extensions</h2>
          <div className="grid gap-8 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
            {softwareList
              .filter(software => software.type === 'extension')
              .map((software) => (
                <Card key={software.name} className="flex flex-col">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-2xl">{software.name}</CardTitle>
                        <CardDescription className="text-primary font-medium">
                          Status: {software.status}
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <p className="text-muted-foreground">{software.description}</p>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" size="sm" asChild>
                      <a
                        href={software.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center"
                      >
                        <Github className="w-4 h-4 mr-2" />
                        GitHub
                      </a>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
          </div>
        </div>

        <div>
          <h2 className="text-3xl font-bold mb-6">Documentation & Guides</h2>
          <div className="grid gap-8 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
            {softwareList
              .filter(software => software.type === 'guide')
              .map((software) => (
                <Card key={software.name} className="flex flex-col">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-2xl">{software.name}</CardTitle>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <p className="text-muted-foreground">{software.description}</p>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" size="sm" asChild>
                      <Link
                        to={software.docs}
                        className="flex items-center"
                      >
                        <ExternalLink className="w-4 h-4 mr-2" />
                        View Guide
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NWBSoftware;
