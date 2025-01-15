import { Navigation } from "@/components/Navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Github, ExternalLink, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
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
          item.tags.forEach(tag => {
            if (methods.includes(tag)) {
              if (!acc[tag]) acc[tag] = [];
              acc[tag].push(item);
            }
          });
          return acc;
        }, {} as Record<string, PortfolioItem[]>);
      case "area":
        return items.reduce((acc, item) => {
          item.tags.forEach(tag => {
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

  // Get unique institutions and tags for filter dropdowns
  const institutions = ["All", ...new Set(portfolioItems.map(item => item.institution))].sort();
  const tags = ["All", ...new Set(portfolioItems.flatMap(item => item.tags || []))].sort();

  // Filter items based on search term, institution, method, and research area
  const filteredItems = portfolioItems.filter((item) => {
    const searchLower = searchTerm.toLowerCase();
    const matchesSearch = item.lab.toLowerCase().includes(searchLower) ||
      item.institution.toLowerCase().includes(searchLower) ||
      item.description.toLowerCase().includes(searchLower);
    
    const matchesInstitution = selectedInstitution === "All" || item.institution === selectedInstitution;
    const matchesMethod = selectedMethod === "All" || (item.tags && item.tags.some(tag => methods.includes(tag) && (selectedMethod === "All" || tag === selectedMethod)));
    const matchesArea = selectedArea === "All" || (item.tags && item.tags.some(tag => researchAreas.includes(tag) && (selectedArea === "All" || tag === selectedArea)));
    return matchesSearch && matchesInstitution && matchesMethod && matchesArea;
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
    <div className="min-h-screen bg-gradient-to-br from-gradient-start to-gradient-end">
      <Navigation />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8 text-center">NWB Conversions</h1>
        <p className="text-center text-lg text-muted-foreground mb-12 max-w-2xl mx-auto">
          We've collaborated with leading research institutions worldwide to advance neuroscience data standardization and analysis.
        </p>

        <div className="max-w-4xl mx-auto mb-8 space-y-4">
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
                  <Button variant="outline">
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
                  <Button variant="outline">
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
                </DropdownMenuContent>
              </DropdownMenu>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline">
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
          <p className="text-sm text-muted-foreground text-center">
            Showing {currentItems.length} of {filteredItems.length} entries
          </p>
        </div>

        <div className="space-y-8">
          {Object.entries(groupItems(sortedItems)).map(([group, items]) => (
            <div key={group}>
              {groupBy !== "none" && (
                <h2 className="text-2xl font-bold mb-4">{group}</h2>
              )}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {items
                  .slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE)
                  .map((item, index) => (
                  <Card key={index} className="hover:shadow-lg transition-shadow">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-xl">{item.lab}</CardTitle>
                      <div className="flex items-center justify-between">
                        <CardDescription className="text-primary font-medium">
                          {item.institution}
                        </CardDescription>
                        <CardDescription className="text-sm text-muted-foreground">
                          {item.date}
                        </CardDescription>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-muted-foreground text-sm leading-relaxed">
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
                                  className="flex items-center"
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
      </div>
    </div>
  );
};

export default NWBConversions;
