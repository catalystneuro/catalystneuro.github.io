import { Navigation } from "@/components/Navigation";
import { Github, Link as LinkIcon, Twitter, X } from "lucide-react";

// Custom Bluesky icon component to match Lucide style
const BlueSkyIcon = ({ size = 20, className = "" }) => (
  <svg 
    viewBox="0 0 600 530" 
    width={size} 
    height={size} 
    fill="currentColor"
    className={className}
  >
    <path d="m135.72 44.03c66.496 49.921 138.02 151.14 164.28 205.46 26.262-54.316 97.782-155.54 164.28-205.46 47.98-36.021 125.72-63.892 125.72 24.795 0 17.712-10.155 148.79-16.111 170.07-20.703 73.984-96.144 92.854-163.25 81.433 117.3 19.964 147.14 86.092 82.697 152.22-122.39 125.59-175.91-31.511-189.63-71.766-2.514-7.3797-3.6904-10.832-3.7077-7.8964-0.0174-2.9357-1.1937 0.51669-3.7077 7.8964-13.714 40.255-67.233 197.36-189.63 71.766-64.444-66.128-34.605-132.26 82.697-152.22-67.108 11.421-142.55-7.4491-163.25-81.433-5.9562-21.282-16.111-152.36-16.111-170.07 0-88.687 77.742-60.816 125.72-24.795z" />
  </svg>
);

import teamData from '../content/team.json';
const currentTeamMembers = teamData.members.filter(member => member.isActive);
const previousTeamMembers = teamData.members.filter(member => !member.isActive);

const Team = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gradient-start to-gradient-end">
      <Navigation />
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-center mb-12">Our Team</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {currentTeamMembers.map((member) => (
            <div 
              key={member.name}
              className="bg-card p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="mb-4">
                <img 
                  src={member.image} 
                  alt={member.name}
                  className="w-40 h-40 rounded-full mx-auto object-cover"
                />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-center">{member.name}</h3>
              <p className="text-primary mb-3 text-center">{member.role}</p>
              <p className="text-muted-foreground mb-4 text-sm">{member.description}</p>
              <div className="flex justify-center space-x-4">
                <a 
                  href={member.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors"
                  title="GitHub"
                >
                  <Github size={20} />
                </a>
                {member.personalPage && (
                  <a 
                    href={member.personalPage}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-primary transition-colors"
                    title="Personal Page"
                  >
                    <LinkIcon size={20} />
                  </a>
                )}
                {member.twitter && (
                  <a 
                    href={member.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-primary transition-colors"
                    title="Twitter/X"
                  >
                    <X size={20} />
                  </a>
                )}
                {member.bluesky && (
                  <a 
                    href={member.bluesky}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-primary transition-colors"
                    title="Bluesky"
                  >
                    <BlueSkyIcon size={20} />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>

        {previousTeamMembers.length > 0 && (
          <div className="mt-16">
            <h2 className="text-3xl font-semibold text-center mb-8">Previous Team Members</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {previousTeamMembers.map((member) => (
                <div 
                  key={member.name}
                  className="bg-card/80 p-4 rounded-lg shadow hover:shadow-md transition-shadow"
                >
                  <h3 className="text-lg font-semibold mb-1 text-center">{member.name}</h3>
                  <p className="text-primary/80 mb-2 text-center text-sm">{member.role}</p>
                  <p className="text-muted-foreground mb-3 text-sm">{member.description}</p>
                  {member.github && (
                    <div className="flex justify-center">
                      <a 
                        href={member.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted-foreground hover:text-primary transition-colors"
                        title="GitHub"
                      >
                        <Github size={18} />
                      </a>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Team;
