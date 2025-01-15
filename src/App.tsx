import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Footer from "./components/Footer";
import Index from "./pages/Index";
import Team from "./pages/Team";
import Blog from "./pages/Blog";
import { BlogPost } from "./components/BlogPost";
import NWBConversions from "./pages/NWBConversions";
import Software from "./pages/Software";
import Openings from "./pages/Openings";
import JobPosition from "./pages/JobPosition";
import About from "./pages/About";
import FundedProjects from "./pages/FundedProjects";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/team" element={<Team />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="/nwb-conversions" element={<NWBConversions />} />
          <Route path="/software" element={<Software />} />
          <Route path="/openings" element={<Openings />} />
          <Route path="/openings/:id" element={<JobPosition />} />
          <Route path="/about" element={<About />} />
          <Route path="/funded-projects" element={<FundedProjects />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
