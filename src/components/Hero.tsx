import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Hero = () => {
  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-primary/5 via-primary/10 to-transparent py-20 sm:py-32">
      {/* Background Image */}
      <div
        className="absolute inset-0 z-0 opacity-10"
        style={{
          backgroundImage: "url('/images/stock/neuron-microscopy.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="relative z-10 max-w-3xl">
            <a href="/analysis-software" className="inline-flex items-center rounded-full border border-primary/30 bg-white/80 px-3 py-1 text-sm text-primary shadow-sm backdrop-blur-sm hover:bg-white hover:shadow-md transition-all duration-200">
              <span className="mr-2 rounded-full bg-primary px-1.5 py-0.5 text-xs text-white">New</span>
              Open source neurophysiology tools for researchers
            </a>
            
            <h1 className="mt-6 text-4xl font-bold tracking-tight text-secondary sm:text-6xl">
              Empowering Neurophysiology Data
              <span className="text-primary block">for Open Science</span>
            </h1>
            
            <p className="mt-6 text-lg leading-8 text-secondary/85 max-w-2xl">
              We help research labs standardize, share, and publish their neurophysiology data through custom software solutions and expert consulting.
            </p>
            
            <div className="mt-10 flex flex-wrap gap-4 md:gap-x-6">
              <a href="/nwb-software">
                <Button size="lg" className="group bg-primary hover:bg-primary/90">
                  Get Started
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </a>
              <a href="/about">
                <Button variant="outline" size="lg" className="border-primary/30 text-primary hover:bg-primary/5">
                  Learn More
                </Button>
              </a>
            </div>
        </div>
      </div>
    </div>
  );
};
