import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export const Hero = () => {
  const navigate = useNavigate();
  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-primary/10 to-transparent py-20 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="relative z-10">
          <h1 className="text-4xl font-bold tracking-tight text-secondary sm:text-6xl">
            Transforming Neurophysiology Data
            <span className="text-primary block">for Open Science</span>
          </h1>
          <p className="mt-6 text-lg leading-8 text-secondary max-w-2xl">
            We help research labs standardize, share, and publish their neurophysiology data through custom software solutions and expert consulting.
          </p>
          <div className="mt-10 flex gap-x-6">
            <Button size="lg" className="group">
              Get Started
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button variant="outline" size="lg" onClick={() => navigate("/about")}>
              Learn More
            </Button>
          </div>
        </div>
      </div>
      {/* <div className="absolute inset-0 -z-5">
        <div className="absolute inset-0 bg-[linear-gradient(45deg,var(--tw-gradient-stops))] from-primary/20 via-accent/20 to-secondary/20 opacity-30" />
        <div className="absolute inset-y-0 right-1/2 -z-5 mr-16 w-[200%] origin-bottom-left skew-x-[-30deg] bg-white/80 shadow-xl shadow-primary/10 ring-1 ring-primary/10" />
        <div className="absolute inset-0 bg-[linear-gradient(-45deg,transparent_49.9%,#f1f0fb_49.9%,#f1f0fb_51%,transparent_51%)] bg-[length:50px_50px] opacity-20" />
      </div> */}
    </div>
  );
};
