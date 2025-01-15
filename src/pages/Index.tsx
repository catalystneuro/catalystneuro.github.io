import { Hero } from "@/components/Hero";
import { Navigation } from "@/components/Navigation";
import { Services } from "@/components/Services";
import { LatestPosts } from "@/components/LatestPosts";
import { Contact } from "@/components/Contact";
import { BrandBanner } from "@/components/BrandBanner";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <Hero />
      <Services />
      <LatestPosts />
      <BrandBanner />
      <Contact />
    </div>
  );
};

export default Index;
