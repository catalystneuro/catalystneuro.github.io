import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { fundedProjects } from "@/utils/contentLoader";
import { format } from "date-fns";
import { useState, useMemo } from "react";
import PageLayout from "@/components/PageLayout";

type SortOption = "title" | "date" | "funder";

const ITEMS_PER_PAGE = 6;

const FundedProjects = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedStatus, setSelectedStatus] = useState<string>("All");
  const [selectedFunder, setSelectedFunder] = useState<string>("All");
  const [sortBy, setSortBy] = useState<SortOption>("date");

  // Get unique statuses and funders for filter dropdowns
  const statuses = useMemo(() => 
    ["All", ...new Set(fundedProjects.map(project => project.status))].sort(),
    []
  );
  
  const funders = useMemo(() => 
    ["All", ...new Set(fundedProjects.map(project => project.funder))].sort(),
    []
  );

  // Filter projects based on search term, status, and funder
  const filteredProjects = fundedProjects.filter((project) => {
    const searchLower = searchTerm.toLowerCase();
    const matchesSearch = 
      (project.title || "").toLowerCase().includes(searchLower) ||
      (project.funder || "").toLowerCase().includes(searchLower) ||
      (project.description || "").toLowerCase().includes(searchLower) ||
      (project.body || "").toLowerCase().includes(searchLower);
    
    const matchesStatus = selectedStatus === "All" || project.status === selectedStatus;
    const matchesFunder = selectedFunder === "All" || project.funder === selectedFunder;
    
    return matchesSearch && matchesStatus && matchesFunder;
  });

  // Sort filtered projects
  const sortedProjects = [...filteredProjects].sort((a, b) => {
    switch (sortBy) {
      case "title":
        return (a.title || "").localeCompare(b.title || "");
      case "date":
        // Convert dates to strings and handle undefined values
        const dateA = String(a.startDate || "");
        const dateB = String(b.startDate || "");
        // Compare dates as strings (YYYY-MM-DD format will sort correctly)
        return dateB > dateA ? 1 : dateB < dateA ? -1 : 0;
      case "funder":
        return (a.funder || "").localeCompare(b.funder || "");
      default:
        return 0;
    }
  });

  const totalPages = Math.ceil(sortedProjects.length / ITEMS_PER_PAGE);
  const currentProjects = sortedProjects.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

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
    <PageLayout
      title="Funded Projects"
      subtitle="Our work is supported by leading institutions committed to advancing neuroscience data standards and tools."
    >
      <div className="max-w-4xl mx-auto mb-8 space-y-4 px-4">
        <div className="p-4 bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm">
          <div className="flex flex-col gap-4">
            <Input
              type="search"
              placeholder="Search projects..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full"
            />
            <div className="flex flex-wrap gap-2 justify-center sm:justify-start w-full">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline">
                    Status: {selectedStatus}
                    <ChevronDown className="w-4 h-4 ml-2" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  {statuses.map((status) => (
                    <DropdownMenuItem
                      key={status}
                      onClick={() => {
                        setSelectedStatus(status);
                        setCurrentPage(1);
                      }}
                    >
                      {status}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline">
                    Funder: {selectedFunder}
                    <ChevronDown className="w-4 h-4 ml-2" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  {funders.map((funder) => (
                    <DropdownMenuItem
                      key={funder}
                      onClick={() => {
                        setSelectedFunder(funder);
                        setCurrentPage(1);
                      }}
                    >
                      {funder}
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
                  <DropdownMenuItem onClick={() => setSortBy("title")}>
                    Title
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSortBy("funder")}>
                    Funder
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSortBy("date")}>
                    Start Date
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
          <p className="text-sm text-secondary/65 text-center mt-4">
            Showing {currentProjects.length} of {filteredProjects.length} entries
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto mb-8 px-4">
        {currentProjects.map((project, index) => (
          <a 
            key={index}
            href={`/funded-projects/${project.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}
            className="no-underline h-full block"
          >
            <Card className="hover:shadow-lg transition-shadow h-full flex flex-col backdrop-blur-sm bg-white/80 border-primary/10 hover:border-primary/30">
              <CardHeader className="space-y-4 flex-none">
                <div className="flex items-start justify-between">
                  <CardTitle>{project.title}</CardTitle>
                  <Badge className={getStatusColor(project.status)} variant="outline">
                    {project.status}
                  </Badge>
                </div>
                <div className="text-sm text-secondary/65">
                  <span className="font-medium text-primary">{project.funder}</span>
                  <span className="mx-2">•</span>
                  <span>Started {format(new Date(project.startDate), 'MMMM yyyy')}</span>
                </div>
                {project.image && (
                  <div className="flex justify-center items-center h-24">
                    <img 
                      src={project.image} 
                      alt={`${project.funder} logo`}
                      className="max-h-full max-w-full object-contain"
                    />
                  </div>
                )}
              </CardHeader>
              <CardContent className="flex-grow flex flex-col">
                <p className="text-secondary/75 text-sm leading-relaxed flex-grow">
                  {project.body}
                </p>
              </CardContent>
            </Card>
          </a>
        ))}
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center gap-2 mt-8 mb-6">
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
      )}
    </PageLayout>
  );
};

export default FundedProjects;
