import nihLogo from "/images/sponsors/nih_logo.png";
import allenLogo from "/images/sponsors/allen_institute_logo.jpeg";
import kavliLogo from "/images/sponsors/kavli_foundation_logo.png";
import mjffLogo from "/images/sponsors/MJFF_logo.jpg";
import simonsLogo from "/images/sponsors/simons_foundation_logo.avif";
import mitLogo from "/images/sponsors/MIT_logo.png";

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
    <section className="py-16 bg-gray-50">
      <div className="container max-w-5xl">
        <h2 className="text-sm font-medium text-secondary/60 uppercase tracking-wider text-center mb-10">Our Partners</h2>
        <div className="grid grid-cols-3 md:grid-cols-6 gap-8 items-center">
          {brands.map((brand, index) => (
            <div
              key={`${brand.name}-${index}`}
              data-testid="logo-container"
              className="flex items-center justify-center h-16 grayscale hover:grayscale-0 transition-all duration-300"
            >
              <img
                src={brand.logo}
                alt={brand.name}
                className="max-h-full max-w-full object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
