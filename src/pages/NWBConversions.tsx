import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Github, ExternalLink, ChevronDown, Link as LinkIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { loadPortfolio } from "@/utils/contentLoader";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

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
};

interface BadgeProps {
  children: React.ReactNode;
  className?: string;
}

const Badge = ({ children, className = "" }: BadgeProps) => (
  <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ring-1 ring-inset ${className}`}>
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
  const [sortBy, setSortBy] = useState<SortOption>("name");
  const [groupBy, setGroupBy] = useState<"none" | "institution" | "method" | "area">("none");
  const portfolioItems = loadPortfolio() as PortfolioItem[];

  // Separate methods and research areas
  const methods = ["All", "electrophysiology", "calcium imaging", "behavioral tracking", "brain-computer interface"];
  const researchAreas = ["All", "visual processing", "motor control", "social behavior", "neural computation", "spatial navigation"];

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
      default:
        return { "All": items };
    }
  };

  // Get unique institutions, tags, and funded projects for filter dropdowns
  const institutions = ["All", ...new Set(portfolioItems.map(item => item.institution))].sort();
  const tags = ["All", ...new Set(portfolioItems.flatMap(item => item.tags || []))].sort();
  const fundedProjects = ["All", ...new Set(portfolioItems.map(item => item.funded_project).filter(Boolean))].sort();

  // Filter items based on search term, institution, method, and research area
  const filteredItems = portfolioItems.filter((item) => {
    const searchLower = searchTerm.toLowerCase();
    const matchesSearch = item.lab.toLowerCase().includes(searchLower) ||
      item.institution.toLowerCase().includes(searchLower) ||
      item.description.toLowerCase().includes(searchLower);
    
    const matchesInstitution = selectedInstitution === "All" || item.institution === selectedInstitution;
    const matchesMethod = selectedMethod === "All" || (item.tags && item.tags.some(tag => methods.includes(tag) && (selectedMethod === "All" || tag === selectedMethod)));
    const matchesArea = selectedArea === "All" || (item.tags && item.tags.some(tag => researchAreas.includes(tag) && (selectedArea === "All" || tag === selectedArea)));
    const matchesFundedProject = selectedFundedProject === "All" || item.funded_project === selectedFundedProject;
    return matchesSearch && matchesInstitution && matchesMethod && matchesArea && matchesFundedProject;
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
    <div className="min-h-screen bg-gradient-to-b from-primary/5 via-primary/10 to-transparent pt-16 relative">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMxNDY2QTciIGZpbGwtb3BhY2l0eT0iMC4wNCIgdHJhbnNmb3JtPSJyb3RhdGUoNDUgLTE3NC42NiA1NC44OCkiPjxjaXJjbGUgY3g9IjEiIGN5PSIxIiByPSIxIi8+PC9nPjwvZz48L3N2Zz4=')] opacity-50"></div>
      
      {/* Animated background shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="animate-blob-1 absolute top-[10%] -left-[5%] w-64 h-64 bg-primary/5 rounded-full mix-blend-multiply filter blur-3xl opacity-50"></div>
        <div className="animate-blob-2 absolute top-[15%] right-[10%] w-72 h-72 bg-accent/5 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animation-delay-2000"></div>
        <div className="animate-blob-3 absolute bottom-[15%] left-[20%] w-56 h-56 bg-primary/5 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animation-delay-4000"></div>
      </div>
      
      <div className="container mx-auto px-4 py-8 relative z-10">
        <div className="transition-opacity duration-1000 opacity-100">
          <h1 className="text-4xl font-bold mb-2 text-center text-secondary animate-fade-in-slide-up">NWB Conversions</h1>
          <div className="h-1 w-24 bg-primary mx-auto mb-8 rounded animate-width-expand"></div>
          
          <p className="text-center text-lg text-secondary/85 mb-12 max-w-2xl mx-auto animate-fade-in-slide-up animation-delay-300">
            We've collaborated with leading research institutions worldwide to advance neuroscience data standardization and analysis.
          </p>
        </div>

        <div className="max-w-4xl mx-auto mb-8 space-y-4">
          <div className="p-4 bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm">
            <div className="flex flex-col sm:flex-row gap-4">
              <Input
                type="search"
                placeholder="Search by lab, institution, or description..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1);
                }}
                className="flex-grow"
              />
              <div className="flex flex-wrap gap-2">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="border-primary/30 hover:bg-primary/5 hover:border-primary/50">
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
                    <Button variant="outline" className="border-primary/30 hover:bg-primary/5 hover:border-primary/50">
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
                    <Button variant="outline" className="border-primary/30 hover:bg-primary/5 hover:border-primary/50">
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
                  </DropdownMenuContent>
                </DropdownMenu>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="border-primary/30 hover:bg-primary/5 hover:border-primary/50">
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
                    <Button variant="outline" className="border-primary/30 hover:bg-primary/5 hover:border-primary/50">
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
                    <Button variant="outline" className="border-primary/30 hover:bg-primary/5 hover:border-primary/50">
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
          {Object.entries(groupItems(sortedItems)).map(([group, items], groupIndex) => (
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
                  <Card key={index} className="hover:shadow-lg transition-shadow backdrop-blur-sm bg-white/80 border-primary/10 hover:border-primary/30">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-xl">{item.lab}</CardTitle>
                      <div className="space-y-1">
                        <div className="flex items-center justify-between">
                          <CardDescription className="text-primary font-medium">
                            {item.institution}
                          </CardDescription>
                          <CardDescription className="text-sm text-secondary/65">
                            {item.date}
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
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
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
                            >
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      )}
                      <div className="flex space-x-2">
                        {item.github && (
                          <Button variant="outline" size="sm" className="border-primary/30 hover:bg-primary/5" asChild>
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
                            <Button variant="outline" size="sm" className="border-primary/30 hover:bg-primary/5" asChild>
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
                                  className="border-primary/30 hover:bg-primary/5 flex items-center"
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
                    </CardContent>
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
              className="border-primary/30 hover:bg-primary/5"
            >
              Previous
            </Button>
            {Array.from({ length: totalPages }, (_, i) => (
              <Button
                key={i + 1}
                variant={currentPage === i + 1 ? "default" : "outline"}
                onClick={() => setCurrentPage(i + 1)}
                className={currentPage === i + 1 ? "bg-primary hover:bg-primary/90" : "border-primary/30 hover:bg-primary/5"}
              >
                {i + 1}
              </Button>
            ))}
            <Button
              variant="outline"
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="border-primary/30 hover:bg-primary/5"
            >
              Next
            </Button>
          </div>
        ) : null}
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent"></div>
    </div>
  );
};

export default NWBConversions;
