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

const App = () => {
  // For multi-page app, we only need to render the current page
  const renderPage = () => {
    const path = window.location.pathname;
    
    // Remove trailing slash if present
    const normalizedPath = path.endsWith('/') ? path.slice(0, -1) : path;

    // For root path, render Index
    if (normalizedPath === '' || normalizedPath === '/') {
      return <Index />;
    }

    // For other paths, render the corresponding component
    const routes = {
      '/team': <Team />,
      '/blog': <Blog />,
      '/nwb-conversions': <NWBConversions />,
      '/software': <Software />,
      '/openings': <Openings />,
      '/about': <About />,
      '/funded-projects': <FundedProjects />
    };

    // Handle dynamic routes
    if (normalizedPath.startsWith('/blog/')) {
      return <BlogPost />;
    }
    if (normalizedPath.startsWith('/openings/')) {
      return <JobPosition />;
    }

    return routes[normalizedPath] || <div>Page not found</div>;
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <div className="min-h-screen flex flex-col">
          <Navigation />
          <main className="flex-grow">
            {renderPage()}
          </main>
          <Footer />
        </div>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
