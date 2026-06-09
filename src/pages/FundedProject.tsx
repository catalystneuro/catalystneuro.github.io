import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Github } from "lucide-react";
import { fundedProjects, portfolio } from "@/utils/contentLoader";
import { format } from "date-fns";
import { useMemo } from "react";
import { useParams } from "react-router-dom";
import Seo from "@/components/Seo";

const FundedProject = () => {
  const { project: projectId } = useParams();

  const project = useMemo(
    () => fundedProjects.find(p => p.title.toLowerCase().replace(/[^a-z0-9]+/g, '-') === projectId),
    [projectId]
  );

  const affiliatedConversions = useMemo(() => {
    if (!project) return [];
    const projectTitle = project.title;
    return portfolio.filter(conv => {
      if (projectTitle === "ASAP NWB Adoption") {
        return conv.funded_project === "Michael J. Fox ASAP";
      }
      if (projectTitle === "SCGB NWB Adoption") {
        return conv.funded_project === "SCGB NWB Adoption";
      }
      if (projectTitle === "NYU Librarians NWB Adoption") {
        return conv.funded_project === "NYU Librarians";
      }
      if (projectTitle === "Ripple U19 NWB Adoption") {
        return conv.funded_project === "Ripple U19";
      }
      return conv.funded_project === projectTitle;
    });
  }, [project]);

  if (!project) {
    return <div>Loading...</div>;
  }

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'active':
        return 'bg-green-100 text-green-800 ring-green-600/20';
      case 'completed':
        return 'bg-gray-100 text-gray-800 ring-gray-600/20';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 ring-yellow-600/20';
      default:
        return 'bg-blue-100 text-blue-800 ring-blue-600/20';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gradient-start to-gradient-end pt-16">
      <Seo title={project.title} description={project.description} />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <Card className="mb-8">
            <CardHeader className="space-y-4">
              <div className="flex items-start justify-between">
                <CardTitle className="text-3xl">{project.title}</CardTitle>
                <Badge className={getStatusColor(project.status)} variant="outline">
                  {project.status}
                </Badge>
              </div>
              <div className="text-lg text-muted-foreground">
                <span className="font-medium">{project.funder}</span>
                <span className="mx-2">•</span>
                <span>Started {format(new Date(project.startDate), 'MMMM yyyy')}</span>
              </div>
              {project.image && (
                <div className="flex justify-center items-center h-32">
                  <img 
                    src={project.image} 
                    alt={`${project.funder} logo`}
                    className="max-h-full max-w-full object-contain"
                  />
                </div>
              )}
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                <p className="text-lg">
                  {project.body}
                </p>

                {project.github && project.github.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {project.github.map((repo, index) => (
                      <Button key={index} variant="outline" size="sm" asChild>
                        <a
                          href={repo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center"
                        >
                          <Github className="w-4 h-4 mr-2" />
                          {repo.split('/').pop()}
                        </a>
                      </Button>
                    ))}
                  </div>
                )}
              </div>

              {affiliatedConversions.length > 0 && (
                <div className="mt-16">
                  <h2 className="text-2xl font-bold mb-4">Affiliated NWB Conversions</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {affiliatedConversions.map((conv, index) => (
                      <Card key={index} className="hover:shadow-lg transition-shadow">
                        <CardHeader>
                          <CardTitle className="text-xl">{conv.lab}</CardTitle>
                          <div className="flex items-center justify-between">
                            <CardDescription className="text-primary font-medium">
                              {conv.institution}
                            </CardDescription>
                            <CardDescription className="text-sm text-muted-foreground">
                              {conv.date}
                            </CardDescription>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm text-muted-foreground">
                            {conv.description}
                          </p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default FundedProject;
