import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

export const InstitutionsBanner = () => {
  const [showAll, setShowAll] = useState(false);

  const institutions = [
    { name: "Stanford", logo: "/images/institutions/stanford_logo.png" },
    { name: "Harvard", logo: "/images/institutions/harvard_logo.png" },
    { name: "MIT", logo: "/images/institutions/mit_logo.png" },
    { name: "Princeton", logo: "/images/institutions/princeton_logo.png" },
    { name: "Yale", logo: "/images/institutions/yale_logo.png" },
    { name: "Columbia", logo: "/images/institutions/columbia_logo.png" },
    { name: "NYU", logo: "/images/institutions/nyu_logo.png" },
    { name: "Berkeley", logo: "/images/institutions/berkeley_logo.png" },
    { name: "Northwestern", logo: "/images/institutions/northwestern_logo.png" },
    { name: "UCSF", logo: "/images/institutions/ucsf_logo.png" },
    { name: "Johns Hopkins", logo: "/images/institutions/jhu_logo.png" },
    { name: "Salk Institute", logo: "/images/institutions/salk_logo.png" },
    { name: "University of Washington", logo: "/images/institutions/washington_logo.png" },
    { name: "University of Pennsylvania", logo: "/images/institutions/upenn_logo.png" },
    { name: "UT Austin", logo: "/images/institutions/utaustin_logo.png" },
    { name: "Emory", logo: "/images/institutions/emory_logo.png" },
    { name: "Mount Sinai", logo: "/images/institutions/mountsinai_logo.png" },
    { name: "Cornell", logo: "/images/institutions/cornell_logo.png" },
    { name: "University of Pittsburgh", logo: "/images/institutions/pitt_logo.png" },
    { name: "Karolinska Institutet", logo: "/images/institutions/karolinska_logo.png" },
    { name: "International Brain Lab", logo: "/images/institutions/ibl_logo.png" },
    { name: "Case Western Reserve", logo: "/images/institutions/cwru_logo.png" },
    { name: "Vanderbilt", logo: "/images/institutions/vanderbilt_logo.png" },
    { name: "University of Edinburgh", logo: "/images/institutions/edinburgh_logo.png" },
    { name: "Boston University", logo: "/images/institutions/bu_logo.png" },
    { name: "Janelia Research Campus", logo: "/images/institutions/janelia_logo.png" },
    { name: "Brandeis", logo: "/images/institutions/brandeis_logo.png" },
    { name: "UC Santa Barbara", logo: "/images/institutions/ucsb_logo.png" },
    { name: "UC San Diego", logo: "/images/institutions/ucsd_logo.png" },
    { name: "Allen Institute", logo: "/images/institutions/allen_logo.png" },
  ];

  const visibleInstitutions = showAll ? institutions : institutions.slice(0, 15);

  return (
    <section className="py-12 bg-white">
      <div className="container max-w-5xl">
        <h2 className="text-sm font-medium text-secondary/60 uppercase tracking-wider text-center mb-8">
          Working with Labs at 30+ Institutions
        </h2>
        <div className="grid grid-cols-3 md:grid-cols-5 gap-6 items-center">
          {visibleInstitutions.map((institution, index) => (
            <div
              key={`${institution.name}-${index}`}
              className="flex items-center justify-center h-16 grayscale hover:grayscale-0 transition-all duration-300"
            >
              <img
                src={institution.logo}
                alt={institution.name}
                className="max-h-full max-w-full object-contain"
              />
            </div>
          ))}
        </div>
        
        <div className="flex justify-center mt-8">
          <button
            onClick={() => setShowAll(!showAll)}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-primary hover:text-primary/80 transition-colors"
          >
            {showAll ? (
              <>
                Show Less
                <ChevronUp className="h-4 w-4" />
              </>
            ) : (
              <>
                Show More Institutions
                <ChevronDown className="h-4 w-4" />
              </>
            )}
          </button>
        </div>
      </div>
    </section>
  );
};
