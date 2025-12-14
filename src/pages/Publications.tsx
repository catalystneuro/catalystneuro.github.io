import PageLayout from "@/components/PageLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ExternalLink, FileText, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Publication {
  title: string;
  authors: string;
  journal: string;
  year: number;
  doi?: string;
  url: string;
  abstract: string;
}

const publications: Publication[] = [
  {
    title: "NeuroConv: Streamlining Neurophysiology Data Conversion to the NWB Standard",
    authors: "Mayorquin H, Baker C, Adkisson-Floro P, Weigl S, Trappani A, Tauffer L, Rübel O, Dichter B",
    journal: "SciPy Proceedings",
    year: 2025,
    doi: "10.25080/cehj4257",
    url: "https://proceedings.scipy.org/articles/cehj4257",
    abstract: "Modern neurophysiology generates increasingly complex, multimodal datasets that require standardized formats for effective sharing and reuse. We present NeuroConv, an open-source Python library that automates the conversion of neurophysiology data from 47 distinct formats into NWB through a unified, modular architecture."
  },
  {
    title: "Facilitating analysis of open neurophysiology data on the DANDI Archive using large language model tools",
    authors: "Magland JF, Ly R, Rübel O, Dichter B",
    journal: "bioRxiv (Preprint)",
    year: 2025,
    doi: "10.1101/2025.07.17.663965",
    url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC12330691/",
    abstract: "We introduce an AI-powered, agentic chat assistant and a notebook generation pipeline for exploring DANDI datasets. The system leverages large language models (LLMs) to guide users through data access, visualization, and preliminary analysis of NWB neurophysiology data."
  },
  {
    title: "Neurosift: DANDI exploration and NWB visualization in the browser",
    authors: "Magland J, Soules J, Li AE, Dichter B",
    journal: "Journal of Open Source Software",
    year: 2024,
    doi: "10.21105/joss.06590",
    url: "https://joss.theoj.org/papers/10.21105/joss.06590",
    abstract: "Neurosift is a browser-based tool for exploring the DANDI Archive and visualizing NWB (Neurodata Without Borders) neurophysiology files. It provides interactive visualizations for various data modalities including electrophysiology, calcium imaging, and behavioral data."
  },
  {
    title: "The Neurodata Without Borders ecosystem for neurophysiological data science",
    authors: "Rübel O, Tritt A, Ly R, Dichter BK, Ghosh S, Niu L, Baker P, Soltesz I, Ng L, Svoboda K, Frank L, Bouchard KE",
    journal: "eLife",
    year: 2022,
    doi: "10.7554/eLife.78362",
    url: "https://elifesciences.org/articles/78362",
    abstract: "The neurophysiology of cells and tissues are monitored electrophysiologically and optically in diverse experiments and species. Understanding the brain requires integration of data across this diversity, requiring data to be findable, accessible, interoperable, and reusable (FAIR). We describe design and implementation principles for a language for neurophysiology data through open-source software (Neurodata Without Borders, NWB)."
  }
];

const Publications = () => {
  return (
    <PageLayout
      title="Publications"
      subtitle="Research publications and scientific contributions from the CatalystNeuro team."
    >
      <div className="max-w-6xl mx-auto px-4 space-y-8">
        {/* Publication Cards */}
        <div className="flex flex-col gap-6">
          {publications.map((pub, index) => (
            <Card key={index} className="backdrop-blur-sm bg-white/80 border-primary/10 hover:border-primary/30 transition-all hover:shadow-lg flex flex-col">
              <CardHeader className="flex-none">
                <div className="flex items-start gap-2">
                  <FileText className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
                  <CardTitle className="text-lg leading-tight">{pub.title}</CardTitle>
                </div>
                <div className="text-sm text-secondary/65 mt-2">
                  <p className="font-medium text-primary">{pub.journal} ({pub.year})</p>
                  <p className="mt-1 text-xs">{pub.authors}</p>
                </div>
              </CardHeader>
              <CardContent className="flex-grow flex flex-col">
                <p className="text-secondary/75 text-sm leading-relaxed flex-grow">
                  {pub.abstract}
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  <Button asChild size="sm" variant="outline">
                    <a 
                      href={pub.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center gap-1"
                    >
                      <ExternalLink className="h-3 w-3" />
                      Read Paper
                    </a>
                  </Button>
                  {pub.doi && (
                    <Button asChild size="sm" variant="ghost">
                      <a 
                        href={`https://doi.org/${pub.doi}`} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 text-xs"
                      >
                        DOI: {pub.doi}
                      </a>
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Additional Resources */}
        <Card className="backdrop-blur-sm bg-white/80 border-primary/10">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-6 w-6 text-primary" />
              More Publications
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-secondary/75">
              CatalystNeuro team members contribute to numerous scientific publications 
              in neuroscience data standards, software tools, and open science. 
              For a complete list of publications, visit our profiles:
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild variant="outline" className="flex-1">
                <a 
                  href="https://scholar.google.com/citations?user=w4fggRkAAAAJ" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2"
                >
                  <ExternalLink className="h-4 w-4" />
                  Google Scholar
                </a>
              </Button>
              <Button asChild variant="outline" className="flex-1">
                <a 
                  href="https://orcid.org/0000-0001-5725-6910" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2"
                >
                  <ExternalLink className="h-4 w-4" />
                  ORCID Profile
                </a>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </PageLayout>
  );
};

export default Publications;
