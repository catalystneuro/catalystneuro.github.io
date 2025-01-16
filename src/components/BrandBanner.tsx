import nihLogo from "../../images/sponsors/nih_logo.png";
import allenLogo from "../../images/sponsors/allen_institute_logo.jpeg";
import kavliLogo from "../../images/sponsors/kavli_foundation_logo.png";
import mjffLogo from "../../images/sponsors/MJFF_logo.jpg";
import simonsLogo from "../../images/sponsors/simons_foundation_logo.avif";
import mitLogo from "../../images/sponsors/MIT_logo.png";

export const BrandBanner = () => {
  const brands = [
    { name: "NIH", logo: nihLogo },
    { name: "Allen Institute", logo: allenLogo },
    { name: "Kavli Foundation", logo: kavliLogo },
    { name: "Michael J. Fox Foundation", logo: mjffLogo },
    { name: "Simons Foundation", logo: simonsLogo },
    { name: "MIT", logo: mitLogo },
  ];

  return (
    <section className="py-12 bg-white">
      <h2 className="text-2xl font-semibold text-center text-gray-600 mb-8">Trusted By Leading Institutions</h2>
      <div className="relative overflow-hidden">
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-white to-transparent z-10"></div>
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-white to-transparent z-10"></div>
        <div className="flex animate-scroll gap-12 whitespace-nowrap px-12">
          {/* First set of logos */}
          {brands.map((brand, index) => (
            <div 
              key={`${brand.name}-${index}`} 
              className="w-40 h-20 flex-shrink-0 grayscale hover:grayscale-0 transition-all"
            >
              <img
                src={brand.logo}
                alt={brand.name}
                className="w-full h-full object-contain"
              />
            </div>
          ))}
          {/* Duplicate set for seamless loop */}
          {brands.map((brand, index) => (
            <div 
              key={`${brand.name}-duplicate-${index}`} 
              className="w-40 h-20 flex-shrink-0 grayscale hover:grayscale-0 transition-all"
            >
              <img
                src={brand.logo}
                alt={brand.name}
                className="w-full h-full object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
