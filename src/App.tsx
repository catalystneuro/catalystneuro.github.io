import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Routes, Route } from "react-router-dom";
import { Navigation } from "./components/Navigation";
import Footer from "./components/Footer";
import Index from "./pages/Index";
import Team from "./pages/Team";
import Blog from "./pages/Blog";
import { BlogPost } from "./components/BlogPost";
import NWBConversions from "./pages/NWBConversions";
import NWBSoftware from "./pages/NWBSoftware";
import AnalysisSoftware from "./pages/AnalysisSoftware";
import Openings from "./pages/Openings";
import JobPosition from "./pages/JobPosition";
import About from "./pages/About";
import FundedProjects from "./pages/FundedProjects";
import Success from "./pages/Success";
import FundedProject from "./pages/FundedProject";
import Contact from "./pages/Contact";
import Guide from "./pages/Guide";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
          <Toaster />
          <Sonner />
          <div className="min-h-screen flex flex-col">
            <Navigation />
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/team" element={<Team />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/blog/:slug" element={<BlogPost />} />
                <Route path="/nwb-conversions" element={<NWBConversions />} />
                <Route path="/nwb-software" element={<NWBSoftware />} />
                <Route path="/analysis-software" element={<AnalysisSoftware />} />
                <Route path="/openings" element={<Openings />} />
                <Route path="/openings/:position" element={<JobPosition />} />
                <Route path="/about" element={<About />} />
                <Route path="/funded-projects" element={<FundedProjects />} />
                <Route path="/funded-projects/:project" element={<FundedProject />} />
                <Route path="/success" element={<Success />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/guides/:id" element={<Guide />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
