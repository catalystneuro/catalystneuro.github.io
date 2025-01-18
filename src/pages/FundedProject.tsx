import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { loadFundedProjects, loadPortfolio } from "@/utils/contentLoader";
import { format } from "date-fns";
import { useEffect, useState } from "react";

const FundedProject = () => {
  const [project, setProject] = useState<any>(null);
  const [affiliatedConversions, setAffiliatedConversions] = useState<any[]>([]);

  useEffect(() => {
    // Get project ID from URL path
    const path = window.location.pathname;
    const projectId = path.split('/').pop();

    // Load project data
    const projects = loadFundedProjects();
    const currentProject = projects.find(p => p.title.toLowerCase().replace(/[^a-z0-9]+/g, '-') === projectId);
    setProject(currentProject);

    // Load affiliated NWB conversions
    const conversions = loadPortfolio();
    const affiliated = conversions.filter(conv => {
      const projectTitle = currentProject?.title;
      if (projectTitle === "ASAP NWB Adoption") {
        return conv.funded_project === "Michael J. Fox ASAP";
      }
      if (projectTitle === "SCGB NWB Adoption") {
        return conv.funded_project === "SCGB NWB Adoption";
      }
      return conv.funded_project === projectTitle;
    });
    setAffiliatedConversions(affiliated);
  }, []);

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
              <p className="text-lg mb-8">
                {project.body}
              </p>

              {affiliatedConversions.length > 0 && (
                <div>
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
