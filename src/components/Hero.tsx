import { ArrowRight, Code, Brain, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Hero = () => {
  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-primary/5 via-primary/10 to-transparent py-20 sm:py-32">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMxNDY2QTciIGZpbGwtb3BhY2l0eT0iMC4wNCIgdHJhbnNmb3JtPSJyb3RhdGUoNDUgLTE3NC42NiA1NC44OCkiPjxjaXJjbGUgY3g9IjEiIGN5PSIxIiByPSIxIi8+PC9nPjwvZz48L3N2Zz4=')] opacity-50"></div>
      
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="relative z-10 md:flex md:items-center md:justify-between">
          <div className="md:w-3/5">
            <div className="inline-flex items-center rounded-full border border-primary/30 bg-white/80 px-3 py-1 text-sm text-primary shadow-sm backdrop-blur-sm">
              <span className="mr-2 rounded-full bg-primary px-1.5 py-0.5 text-xs text-white">New</span>
              Open source neurophysiology tools for researchers
            </div>
            
            <h1 className="mt-6 text-4xl font-bold tracking-tight text-secondary sm:text-6xl">
              Transforming Neurophysiology Data
              <span className="text-primary block">for Open Science</span>
            </h1>
            
            <p className="mt-6 text-lg leading-8 text-secondary/85 max-w-2xl">
              We help research labs standardize, share, and publish their neurophysiology data through custom software solutions and expert consulting.
            </p>
            
            <div className="mt-10 flex flex-wrap gap-4 md:gap-x-6">
              <a href="/software">
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
          
          <div className="hidden md:block md:w-2/5">
            <div className="relative mt-10 md:mt-0">
              <div className="absolute -inset-0.5 rounded-lg bg-gradient-to-r from-primary to-accent opacity-30 blur"></div>
              <div className="relative rounded-lg bg-white p-6 shadow-lg">
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col items-center rounded-md bg-primary/5 p-4">
                    <Code className="h-8 w-8 text-primary mb-2" />
                    <h3 className="font-medium text-secondary">Standardize</h3>
                  </div>
                  <div className="flex flex-col items-center rounded-md bg-primary/5 p-4">
                    <Brain className="h-8 w-8 text-primary mb-2" />
                    <h3 className="font-medium text-secondary">Analyze</h3>
                  </div>
                  <div className="flex flex-col items-center rounded-md bg-primary/5 p-4">
                    <Share2 className="h-8 w-8 text-primary mb-2" />
                    <h3 className="font-medium text-secondary">Share</h3>
                  </div>
                  <div className="flex flex-col items-center rounded-md bg-primary/5 p-4">
                    <svg className="h-8 w-8 text-primary mb-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 4L12 20M12 4L8 8M12 4L16 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <h3 className="font-medium text-secondary">Publish</h3>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent"></div>
    </div>
  );
};
