import { Quote } from "lucide-react";

interface Testimonial {
  quote: string;
  name: string;
  title: string;
  institution: string;
}

const testimonials: Testimonial[] = [
  {
    quote: "Working with the team at CatalystNeuro was a terrific, highly productive experience. They revamped a bespoke volumetric imaging pipeline we had developed, integrated it with our behavioral data, and made it all compatible with NWB. My lab has already used their CatalystNeuro pipeline in publication, and will undoubtedly find their NWB toolkit of great use in the future.",
    name: "Dr. Thomas Clandinin",
    title: "Professor",
    institution: "Stanford University"
  }
];

export const Testimonials = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="container max-w-5xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-secondary">What Our Clients Say</h2>
          <div className="w-24 h-1 bg-primary mx-auto mt-4 rounded-full"></div>
        </div>
        
        <div className="relative">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index}
              className="relative bg-white rounded-2xl shadow-lg p-8 md:p-12 border border-primary/10"
            >
              {/* Decorative quote marks */}
              <Quote className="absolute top-6 left-6 h-12 w-12 text-primary/10" />
              <Quote className="absolute bottom-6 right-6 h-12 w-12 text-primary/10 rotate-180" />
              
              <div className="relative z-10">
                <blockquote className="text-lg md:text-xl text-secondary/85 leading-relaxed italic text-center mb-8">
                  "{testimonial.quote}"
                </blockquote>
                
                <div className="flex flex-col items-center">
                  <div className="w-16 h-1 bg-primary/30 rounded-full mb-4"></div>
                  <div className="text-center">
                    <p className="font-semibold text-secondary text-lg">{testimonial.name}</p>
                    <p className="text-secondary/70">{testimonial.title}</p>
                    <p className="text-primary font-medium">{testimonial.institution}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
