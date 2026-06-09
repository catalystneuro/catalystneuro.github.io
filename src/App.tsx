import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Outlet, useMatches } from "react-router-dom";
import type { RouteRecord } from "vite-react-ssg";
import { Navigation } from "./components/Navigation";
import Footer from "./components/Footer";
import Seo from "./components/Seo";
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
import Publications from "./pages/Publications";
import Contact from "./pages/Contact";
import Guide from "./pages/Guide";
import Consultation from "./pages/Consultation";
import NotFound from "./pages/NotFound";
import { blogPosts } from "./utils/blogLoader";
import { fundedProjects, loadOpenings } from "./utils/contentLoader";

const queryClient = new QueryClient();

interface RouteMeta {
  title?: string;
  description?: string;
}

const Layout = () => {
  const matches = useMatches();
  const meta = [...matches]
    .reverse()
    .map((m) => m.handle as RouteMeta | undefined)
    .find((h) => h && (h.title || h.description));

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Seo title={meta?.title} description={meta?.description} />
        <Toaster />
        <Sonner />
        <div className="min-h-screen flex flex-col">
          <Navigation />
          <main className="flex-grow">
            <Outlet />
          </main>
          <Footer />
        </div>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

// Guide slugs are derived from the software content filenames.
const guideSlugs = Object.keys(
  import.meta.glob("./content/software/*.md")
).map((path) => path.split("/").pop()!.replace(/\.md$/, ""));

const projectSlug = (title: string) =>
  title.toLowerCase().replace(/[^a-z0-9]+/g, "-");

export const routes: RouteRecord[] = [
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Index /> },
      { path: "team", element: <Team />, handle: { title: "Team" } },
      { path: "blog", element: <Blog />, handle: { title: "Blog" } },
      {
        path: "blog/:slug",
        element: <BlogPost />,
        getStaticPaths: () => blogPosts.map((p) => `/blog/${p.slug}`),
      },
      {
        path: "nwb-conversions",
        element: <NWBConversions />,
        handle: { title: "NWB Conversions" },
      },
      {
        path: "nwb-software",
        element: <NWBSoftware />,
        handle: { title: "NWB Software" },
      },
      {
        path: "analysis-software",
        element: <AnalysisSoftware />,
        handle: { title: "Analysis Software" },
      },
      { path: "openings", element: <Openings />, handle: { title: "Openings" } },
      {
        path: "openings/:position",
        element: <JobPosition />,
        getStaticPaths: () => loadOpenings().map((o) => `/openings/${o.id}`),
      },
      { path: "about", element: <About />, handle: { title: "About" } },
      {
        path: "funded-projects",
        element: <FundedProjects />,
        handle: { title: "Funded Projects" },
      },
      {
        path: "funded-projects/:project",
        element: <FundedProject />,
        getStaticPaths: () =>
          fundedProjects.map((p) => `/funded-projects/${projectSlug(p.title)}`),
      },
      {
        path: "publications",
        element: <Publications />,
        handle: { title: "Publications" },
      },
      { path: "success", element: <Success /> },
      { path: "contact", element: <Contact />, handle: { title: "Contact" } },
      {
        path: "guides/:id",
        element: <Guide />,
        getStaticPaths: () => guideSlugs.map((slug) => `/guides/${slug}`),
      },
      {
        path: "consultation",
        element: <Consultation />,
        handle: { title: "Request a Consultation" },
      },
      {
        path: "*",
        element: <NotFound />,
        handle: { title: "Page Not Found" },
      },
    ],
  },
];
