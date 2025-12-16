import { Hero } from "@/components/Hero";
import { Services } from "@/components/Services";
import { Testimonials } from "@/components/Testimonials";
import { YouTubeEmbed } from "@/components/YouTubeEmbed";
import { LatestPosts } from "@/components/LatestPosts";
import { Contact } from "@/components/Contact";
import { BrandBanner } from "@/components/BrandBanner";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Hero />
      <Services />
      <Testimonials />
      <LatestPosts />
      <div className="w-full max-w-5xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-8">Life at CatalystNeuro</h2>
        <YouTubeEmbed videoId="uRYOrGt1wMo" />
      </div>
      <BrandBanner />
      <Contact />
    </div>
  );
};

export default Index;
