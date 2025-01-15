import { useParams } from "react-router-dom";
import { Navigation } from "@/components/Navigation";
import { loadOpenings } from "@/utils/contentLoader";
import { Button } from "@/components/ui/button";
import { Mail } from "lucide-react";

const JobPosition = () => {
  const { id } = useParams();
  const positions = loadOpenings();
  const position = positions.find(p => p.id === id);

  if (!position) {
    return <div>Position not found</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gradient-start to-gradient-end">
      <Navigation />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <img
            src={position.image}
            alt={position.title}
            className="w-full h-64 object-cover rounded-lg mb-8"
          />
          <h1 className="text-4xl font-bold mb-2">{position.title}</h1>
          <p className="text-lg text-primary mb-8">{position.type} • {position.location}</p>
          
          <div className="prose prose-blue max-w-none">
            <p className="text-lg mb-8">{position.description}</p>
            
            <h2 className="text-2xl font-semibold mb-4">Responsibilities</h2>
            <ul className="list-disc pl-6 mb-8">
              {position.responsibilities.map((resp, index) => (
                <li key={index} className="mb-2">{resp}</li>
              ))}
            </ul>
            
            <h2 className="text-2xl font-semibold mb-4">Requirements</h2>
            <ul className="list-disc pl-6 mb-8">
              {position.requirements.map((req, index) => (
                <li key={index} className="mb-2">{req}</li>
              ))}
            </ul>
          </div>
          
          <Button size="lg" className="w-full md:w-auto">
            <Mail className="mr-2 h-4 w-4" />
            Apply Now
          </Button>
        </div>
      </div>
    </div>
  );
};

export default JobPosition;