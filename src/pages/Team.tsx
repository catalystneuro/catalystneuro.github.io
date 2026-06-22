import { Github, Link as LinkIcon, X } from "lucide-react";
import PageLayout from "@/components/PageLayout";
import teamData from '../content/team.json';

// Custom ORCID iD icon component using official SVG paths with evenodd fill rule
const OrcidIcon = ({ size = 20, className = "" }) => (
  <svg
    viewBox="0 0 256 256"
    width={size}
    height={size}
    fill="currentColor"
    fillRule="evenodd"
    className={className}
  >
    <path d="M256,128c0,70.7-57.3,128-128,128C57.3,256,0,198.7,0,128C0,57.3,57.3,0,128,0C198.7,0,256,57.3,256,128z M86.3,186.2H70.9V79.1h15.4V186.2z M88.7,56.8c0,5.5-4.5,10.1-10.1,10.1c-5.6,0-10.1-4.6-10.1-10.1c0-5.6,4.5-10.1,10.1-10.1C84.2,46.7,88.7,51.3,88.7,56.8z M108.9,79.1h41.6c39.6,0,57,28.3,57,53.6c0,27.5-21.5,53.6-56.8,53.6h-41.8V79.1z M124.3,172.4h24.5c34.9,0,42.9-26.5,42.9-39.7c0-21.5-13.7-39.7-43.7-39.7h-23.7V172.4z" />
  </svg>
);

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

const currentTeamMembers = teamData.members.filter(member => member.isActive);
const previousTeamMembers = teamData.members.filter(member => !member.isActive);

const Team = () => {
  return (
    <PageLayout
      title="Our Team"
      subtitle="Meet the skilled professionals behind CatalystNeuro's innovative solutions."
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {currentTeamMembers.map((member) => (
          <div 
            key={member.name}
            className="bg-white p-6 rounded-lg border border-gray-200 hover:shadow-md transition-shadow duration-300"
          >
            <div className="mb-4">
              <img 
                src={member.image}
                alt={member.name}
                className="w-48 h-48 rounded-full mx-auto object-cover"
              />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-center text-secondary">{member.name}</h3>
            <p className="text-primary mb-3 text-center">{member.role}</p>
            <p className="text-secondary/75 mb-4 text-sm">{member.description}</p>
            <div className="flex justify-center space-x-4">
              <a 
                href={member.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-secondary/65 hover:text-primary transition-colors"
                title="GitHub"
              >
                <Github size={20} />
              </a>
              {member.personalPage && (
                <a 
                  href={member.personalPage}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-secondary/65 hover:text-primary transition-colors"
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
                  className="text-secondary/65 hover:text-primary transition-colors"
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
                  className="text-secondary/65 hover:text-primary transition-colors"
                  title="Bluesky"
                >
                  <BlueSkyIcon size={20} />
                </a>
              )}
              {(member as any).orcid && (
                <a
                  href={(member as any).orcid}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-secondary/65 hover:text-primary transition-colors"
                  title="ORCID"
                >
                  <OrcidIcon size={20} />
                </a>
              )}
            </div>
          </div>
        ))}
      </div>

      {previousTeamMembers.length > 0 && (
        <div className="mt-16">
          <h2 className="text-3xl font-bold mb-8 text-secondary">Previous Team Members</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {previousTeamMembers.map((member) => (
              <div 
                key={member.name}
                className="bg-white p-4 rounded-lg border border-gray-200 hover:shadow-md transition-shadow duration-300"
              >
                <h3 className="text-lg font-semibold mb-1 text-center text-secondary">{member.name}</h3>
                <p className="text-primary/80 mb-2 text-center text-sm">{member.role}</p>
                <p className="text-secondary/75 mb-3 text-sm">{member.description}</p>
                <div className="flex justify-center space-x-3">
                  {member.github && (
                    <a
                      href={member.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-secondary/65 hover:text-primary transition-colors"
                      title="GitHub"
                    >
                      <Github size={18} />
                    </a>
                  )}
                  {(member as any).orcid && (
                    <a
                      href={(member as any).orcid}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-secondary/65 hover:text-primary transition-colors"
                      title="ORCID"
                    >
                      <OrcidIcon size={18} />
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </PageLayout>
  );
};

export default Team;
