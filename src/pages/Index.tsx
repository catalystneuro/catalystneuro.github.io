import { Hero } from "@/components/Hero";
import { WhyUs } from "@/components/WhyUs";
import { Services } from "@/components/Services";
import { Testimonials } from "@/components/Testimonials";
import { FeaturedIn } from "@/components/FeaturedIn";
import { LatestPosts } from "@/components/LatestPosts";
import { Contact } from "@/components/Contact";
import { BrandBanner } from "@/components/BrandBanner";
import { InstitutionsBanner } from "@/components/InstitutionsBanner";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Hero />
      <WhyUs />
      <Services />
      <BrandBanner />
      <InstitutionsBanner />
      <FeaturedIn />
      <Testimonials />
      <LatestPosts />
      <section className="py-20 bg-white">
        <div className="container max-w-md mx-auto">
          <div className="bg-white p-8 rounded-lg border border-gray-200">
            <Contact />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
