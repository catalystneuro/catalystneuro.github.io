import { ExternalLink } from "lucide-react";

interface Membership {
  name: string;
  url: string;
  description: string;
}

const memberships: Membership[] = [
  {
    name: "INCF",
    url: "https://www.incf.org/",
    description: "International Neuroinformatics Coordinating Facility"
  }
];

export const MemberOf = () => {
  return (
    <section className="py-12 bg-white">
      <div className="container max-w-5xl">
        <div className="text-center mb-8">
          <h2 className="text-sm font-medium text-primary/70 uppercase tracking-wider">Member Of</h2>
          <div className="w-16 h-1 bg-primary mx-auto mt-3 rounded-full"></div>
        </div>
        
        <div className="flex justify-center gap-6">
          {memberships.map((membership, index) => (
            <a
              key={index}
              href={membership.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-3 px-6 py-4 rounded-xl border border-gray-200 hover:border-primary/30 hover:shadow-lg transition-all duration-300 bg-gradient-to-br from-white to-gray-50/50"
            >
              <div className="text-center">
                <span className="text-lg font-bold text-primary group-hover:text-primary/80 transition-colors">
                  {membership.name}
                </span>
                <p className="text-xs text-secondary/60 mt-1">
                  {membership.description}
                </p>
              </div>
              <ExternalLink className="h-4 w-4 text-gray-400 group-hover:text-primary transition-colors" />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};
