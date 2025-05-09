import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Github, ExternalLink, ChevronDown, Link as LinkIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { loadPortfolio } from "@/utils/contentLoader";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import PageLayout from "@/components/PageLayout";

type SortOption = "name" | "date" | "institution";
type PortfolioItem = {
  lab: string;
  institution: string;
  description: string;
  github: string;
  dandi?: string | { url: string; name: string; }[];
  date: string;
  tags?: string[];
  funded_project?: string;
  species?: string | string[];
};

interface BadgeProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

const Badge = ({ children, className = "", onClick }: BadgeProps) => (
  <span 
    className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ring-1 ring-inset ${className} ${onClick ? "cursor-pointer hover:opacity-80" : ""}`}
    onClick={onClick}
  >
    {children}
  </span>
);

const ITEMS_PER_PAGE = 9;

const NWBConversions = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedInstitution, setSelectedInstitution] = useState<string>("All");
  const [selectedMethod, setSelectedMethod] = useState<string>("All");
  const [selectedArea, setSelectedArea] = useState<string>("All");
  const [selectedFundedProject, setSelectedFundedProject] = useState<string>("All");
  const [selectedSpecies, setSelectedSpecies] = useState<string>("All");
  const [sortBy, setSortBy] = useState<SortOption>("name");
  const [groupBy, setGroupBy] = useState<"none" | "institution" | "method" | "area" | "species">("none");
  const portfolioItems = loadPortfolio() as PortfolioItem[];

  // Separate methods and research areas
  const methods = ["All", "electrophysiology", "calcium imaging", "behavioral tracking", "brain-computer interface", "fiber photometry", "pose estimation", "video", "optogenetics"];
  const researchAreas = ["All", "visual processing", "motor control", "social behavior", "spatial navigation", "Parkinson's disease", "autism"];

  // Group items based on selection
  const groupItems = (items: PortfolioItem[]) => {
    switch (groupBy) {
      case "institution":
        return items.reduce((acc, item) => {
          const group = item.institution;
          if (!acc[group]) acc[group] = [];
          acc[group].push(item);
          return acc;
        }, {} as Record<string, PortfolioItem[]>);
      case "method":
        return items.reduce((acc, item) => {
          item.tags?.forEach(tag => {
            if (methods.includes(tag)) {
              if (!acc[tag]) acc[tag] = [];
              acc[tag].push(item);
            }
          });
          return acc;
        }, {} as Record<string, PortfolioItem[]>);
      case "area":
        return items.reduce((acc, item) => {
          item.tags?.forEach(tag => {
            if (researchAreas.includes(tag)) {
              if (!acc[tag]) acc[tag] = [];
              acc[tag].push(item);
            }
          });
          return acc;
        }, {} as Record<string, PortfolioItem[]>);
      case "species":
        return items.reduce((acc, item) => {
          if (!item.species) {
            if (!acc["Unknown"]) acc["Unknown"] = [];
            acc["Unknown"].push(item);
            return acc;
          }
          
          const species = Array.isArray(item.species) ? item.species : [item.species];
          species.forEach(sp => {
            if (!acc[sp]) acc[sp] = [];
            acc[sp].push(item);
          });
          return acc;
        }, {} as Record<string, PortfolioItem[]>);
      default:
        return { "All": items };
    }
  };

  // Get unique institutions, tags, funded projects, and species for filter dropdowns
  const institutions = ["All", ...new Set(portfolioItems.map(item => item.institution))].sort();
  const tags = ["All", ...new Set(portfolioItems.flatMap(item => item.tags || []))].sort();
  const fundedProjects = ["All", ...new Set(portfolioItems.map(item => item.funded_project).filter(Boolean))].sort();
  const speciesList = ["All", ...new Set(portfolioItems.flatMap(item => {
    if (!item.species) return [];
    return Array.isArray(item.species) ? item.species : [item.species];
  }))].sort();

  // Filter items based on search term, institution, method, research area, and species
  const filteredItems = portfolioItems.filter((item) => {
    const searchLower = searchTerm.toLowerCase();
    const matchesSearch = item.lab.toLowerCase().includes(searchLower) ||
      item.institution.toLowerCase().includes(searchLower) ||
      item.description.toLowerCase().includes(searchLower);
    
    const matchesInstitution = selectedInstitution === "All" || item.institution === selectedInstitution;
    const matchesMethod = selectedMethod === "All" || (item.tags && item.tags.some(tag => methods.includes(tag) && (selectedMethod === "All" || tag === selectedMethod)));
    const matchesArea = selectedArea === "All" || (item.tags && item.tags.some(tag => researchAreas.includes(tag) && (selectedArea === "All" || tag === selectedArea)));
    const matchesFundedProject = selectedFundedProject === "All" || item.funded_project === selectedFundedProject;
    const matchesSpecies = selectedSpecies === "All" || 
      (item.species && (
        (Array.isArray(item.species) && item.species.includes(selectedSpecies)) || 
        (!Array.isArray(item.species) && item.species === selectedSpecies)
      ));
    
    return matchesSearch && matchesInstitution && matchesMethod && matchesArea && matchesFundedProject && matchesSpecies;
  });

  // Sort filtered items
  const sortedItems = [...filteredItems].sort((a, b) => {
    switch (sortBy) {
      case "name":
        return a.lab.localeCompare(b.lab);
      case "date":
        return b.date.localeCompare(a.date);
      case "institution":
        return a.institution.localeCompare(b.institution);
      default:
        return 0;
    }
  });

  const totalPages = Math.ceil(sortedItems.length / ITEMS_PER_PAGE);
  const currentItems = sortedItems.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <PageLayout
      title="NWB Conversions"
      subtitle="We've collaborated with leading research institutions worldwide to advance neuroscience data standardization and analysis."
    >
      <div className="max-w-4xl mx-auto mb-8 space-y-4">
        <div className="p-4 bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm">
          <div className="flex flex-col gap-4">
            <Input
              type="search"
              placeholder="Search by lab, institution, or description..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full"
            />
            <div className="flex flex-wrap gap-2 justify-center">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button 
                    variant="outline" 
                    className={selectedMethod !== "All" ? "bg-amber-50 border-amber-200" : ""}
                  >
                    Method: {selectedMethod}
                    <ChevronDown className="w-4 h-4 ml-2" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  {methods.map((method) => (
                    <DropdownMenuItem
                      key={method}
                      onClick={() => {
                        setSelectedMethod(method);
                        setCurrentPage(1);
                      }}
                    >
                      {method}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button 
                    variant="outline"
                    className={selectedArea !== "All" ? "bg-amber-50 border-amber-200" : ""}
                  >
                    Research Area: {selectedArea}
                    <ChevronDown className="w-4 h-4 ml-2" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  {researchAreas.map((area) => (
                    <DropdownMenuItem
                      key={area}
                      onClick={() => {
                        setSelectedArea(area);
                        setCurrentPage(1);
                      }}
                    >
                      {area}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline">
                    Group by
                    <ChevronDown className="w-4 h-4 ml-2" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem onClick={() => setGroupBy("none")}>
                    None
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setGroupBy("institution")}>
                    Institution
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setGroupBy("method")}>
                    Method
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setGroupBy("area")}>
                    Research Area
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setGroupBy("species")}>
                    Species
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button 
                    variant="outline"
                    className={selectedInstitution !== "All" ? "bg-amber-50 border-amber-200" : ""}
                  >
                    Institution: {selectedInstitution}
                    <ChevronDown className="w-4 h-4 ml-2" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  {institutions.map((inst) => (
                    <DropdownMenuItem
                      key={inst}
                      onClick={() => {
                        setSelectedInstitution(inst);
                        setCurrentPage(1);
                      }}
                    >
                      {inst}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button 
                    variant="outline"
                    className={selectedSpecies !== "All" ? "bg-amber-50 border-amber-200" : ""}
                  >
                    Species: {selectedSpecies}
                    <ChevronDown className="w-4 h-4 ml-2" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  {speciesList.map((species) => (
                    <DropdownMenuItem
                      key={species}
                      onClick={() => {
                        setSelectedSpecies(species);
                        setCurrentPage(1);
                      }}
                    >
                      {species}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button 
                    variant="outline"
                    className={selectedFundedProject !== "All" ? "bg-amber-50 border-amber-200" : ""}
                  >
                    Funded Project: {selectedFundedProject}
                    <ChevronDown className="w-4 h-4 ml-2" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  {fundedProjects.map((project) => (
                    <DropdownMenuItem
                      key={project}
                      onClick={() => {
                        setSelectedFundedProject(project);
                        setCurrentPage(1);
                      }}
                    >
                      {project}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline">
                    Sort by
                    <ChevronDown className="w-4 h-4 ml-2" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem onClick={() => setSortBy("name")}>
                    Lab Name
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSortBy("institution")}>
                    Institution
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSortBy("date")}>
                    Date
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
          <p className="text-sm text-secondary/65 text-center mt-4">
            Showing {currentItems.length} of {filteredItems.length} entries
          </p>
        </div>
      </div>

      <div className="space-y-8">
        {Object.entries(groupItems(sortedItems)).map(([group, items]) => (
          <div key={group}>
            {groupBy !== "none" && (
              <div className="flex items-center mb-4">
                <h2 className="text-2xl font-bold text-secondary">{group}</h2>
                <div className="h-px flex-grow ml-4 bg-gradient-to-r from-primary/20 to-transparent"></div>
              </div>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {items
                .slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE)
                .map((item, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow backdrop-blur-sm bg-white/80 border-primary/10 hover:border-primary/30 flex flex-col h-full">
                  <div className="absolute top-3 right-3">
                    <span className="text-xs text-secondary/65 bg-white/70 px-2 py-1 rounded-md">
                      {item.date}
                    </span>
                  </div>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-xl">{item.lab}</CardTitle>
                    <div className="space-y-1">
                      <div className="flex items-center">
                        <CardDescription 
                          className="text-primary font-medium cursor-pointer hover:text-primary/80 transition-colors"
                          onClick={() => {
                            setSelectedInstitution(item.institution);
                            setCurrentPage(1);
                          }}
                        >
                          {item.institution}
                        </CardDescription>
                      </div>
                      {item.funded_project && (
                        <a 
                          href={`/funded-projects/${item.funded_project === "Michael J. Fox ASAP" ? "asap-nwb-adoption" : 
                            item.funded_project === "SCGB NWB Adoption" ? "scgb-nwb-adoption" : 
                            item.funded_project?.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`} 
                          className="no-underline"
                        >
                          <CardDescription className="text-sm text-purple-600 font-medium hover:text-purple-800 transition-colors flex items-center gap-1">
                            <LinkIcon className="w-3 h-3" />
                            {item.funded_project}
                          </CardDescription>
                        </a>
                      )}
                      {item.species && (
                        <div className="flex flex-wrap gap-1 items-center">
                          {Array.isArray(item.species) ? (
                            item.species.map((species, i) => (
                              <span 
                                key={i}
                                className="text-sm text-amber-700 font-medium cursor-pointer hover:text-amber-900 hover:underline transition-colors"
                                onClick={() => {
                                  setSelectedSpecies(species);
                                  setCurrentPage(1);
                                }}
                              >
                                {species}{i < item.species.length - 1 ? "," : ""}
                              </span>
                            ))
                          ) : (
                            <span 
                              className="text-sm text-amber-700 font-medium cursor-pointer hover:text-amber-900 hover:underline transition-colors"
                              onClick={() => {
                                setSelectedSpecies(item.species as string);
                                setCurrentPage(1);
                              }}
                            >
                              {item.species}
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4 flex-grow">
                    <p className="text-secondary/75 text-sm leading-relaxed">
                      {item.description}
                    </p>
                    {item.tags && (
                      <div className="flex flex-wrap gap-2">
                        {item.tags.map((tag, i) => (
                          <Badge
                            key={i}
                            className={
                              methods.includes(tag)
                                ? "bg-blue-100 text-blue-800 ring-blue-600/20"
                                : researchAreas.includes(tag)
                                ? "bg-green-100 text-green-800 ring-green-600/20"
                                : "bg-primary/10 text-primary ring-primary/20"
                            }
                            onClick={() => {
                              if (methods.includes(tag)) {
                                setSelectedMethod(tag);
                                setCurrentPage(1);
                              } else if (researchAreas.includes(tag)) {
                                setSelectedArea(tag);
                                setCurrentPage(1);
                              }
                            }}
                          >
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </CardContent>
                  <CardFooter className="pt-0 mt-auto">
                    <div className="flex space-x-2">
                      {item.github && (
                        <Button variant="outline" size="sm" asChild>
                          <a
                            href={item.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center"
                          >
                            <Github className="w-4 h-4 mr-2" />
                            GitHub
                          </a>
                        </Button>
                      )}
                      {item.dandi &&
                        (typeof item.dandi === "string" ? (
                          <Button variant="outline" size="sm" asChild>
                            <a
                              href={item.dandi}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center"
                            >
                              <ExternalLink className="w-4 h-4 mr-2" />
                              DANDI
                            </a>
                          </Button>
                        ) : (
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button
                                variant="outline"
                                size="sm"
                              >
                                <ExternalLink className="w-4 h-4 mr-2" />
                                DANDI
                                <ChevronDown className="w-4 h-4 ml-2" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                              {item.dandi.map((dataset, i) => (
                                <DropdownMenuItem key={i}>
                                  <a
                                    href={dataset.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center w-full"
                                  >
                                    {dataset.name}
                                  </a>
                                </DropdownMenuItem>
                              ))}
                            </DropdownMenuContent>
                          </DropdownMenu>
                        ))}
                    </div>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        ))}
      </div>

      {Number(totalPages) > 1 ? (
        <div className="flex justify-center gap-2 mt-8">
          <Button
            variant="outline"
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
          >
            Previous
          </Button>
          {Array.from({ length: totalPages }, (_, i) => (
            <Button
              key={i + 1}
              variant={currentPage === i + 1 ? "default" : "outline"}
              onClick={() => setCurrentPage(i + 1)}
            >
              {i + 1}
            </Button>
          ))}
          <Button
            variant="outline"
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
          >
            Next
          </Button>
        </div>
      ) : null}
    </PageLayout>
  );
};

export default NWBConversions;
