import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Navigation } from "./components/Navigation";
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
      <Navigation />
      {window.location.pathname === "/" && <Index />}
      {window.location.pathname === "/team" && <Team />}
      {window.location.pathname === "/blog" && <Blog />}
      {window.location.pathname.startsWith("/blog/") && <BlogPost />}
      {window.location.pathname === "/nwb-conversions" && <NWBConversions />}
      {window.location.pathname === "/software" && <Software />}
      {window.location.pathname === "/openings" && <Openings />}
      {window.location.pathname.startsWith("/openings/") && <JobPosition />}
      {window.location.pathname === "/about" && <About />}
      {window.location.pathname === "/funded-projects" && <FundedProjects />}
      <Footer />
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
