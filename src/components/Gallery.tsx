import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface GalleryProps {
  images: string[];
  className?: string;
  aspectRatio?: string; // e.g., "16/9", "4/3", "1/1"
  width?: string;
}

export const Gallery = ({ 
  images, 
  className = "", 
  aspectRatio = "16/9", // default aspect ratio
  width = "100%"
}: GalleryProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  if (!images || images.length === 0) return null;

  const handleNextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const handlePrevImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? images.length - 1 : prev - 1
    );
  };

  const currentFile = images[currentImageIndex];
  const isYouTube = currentFile.includes('youtube.com') || currentFile.includes('youtu.be');
  const isLocalVideo = currentFile.toLowerCase().endsWith('.mp4') || currentFile.toLowerCase().endsWith('.webm');
  const videoType = currentFile.toLowerCase().endsWith('.webm') ? 'video/webm' : 'video/mp4';

  const getYouTubeId = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  return (
    <div className="flex justify-center">
      <div 
        className={`relative max-w-[3654px] ${className}`}
        style={{ aspectRatio, width }}
      >
        {isYouTube ? (
          <iframe
            className="w-full h-full rounded-lg shadow-lg"
            src={`https://www.youtube.com/embed/${getYouTubeId(currentFile)}?rel=0`}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : isLocalVideo ? (
          <video
            className="w-full h-full object-cover rounded-lg shadow-lg bg-black"
            controls
            playsInline
            loop
            preload="auto"
          >
            <source src={currentFile} type={videoType} />
          </video>
        ) : (
          <img
            src={currentFile}
            alt={`Gallery image ${currentImageIndex + 1}`}
            className="w-full h-full object-cover rounded-lg shadow-lg"
          />
        )}
        {images.length > 1 && (
          <>
            <Button
              variant="outline"
              size="icon"
              className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-background/80 hover:bg-background"
              onClick={handlePrevImage}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-background/80 hover:bg-background"
              onClick={handleNextImage}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
            <div className="flex justify-center mt-4 space-x-2">
              {images.map((_, idx) => (
                <div
                  key={idx}
                  className={`h-2 w-2 rounded-full transition-colors ${
                    idx === currentImageIndex ? 'bg-primary' : 'bg-muted'
                  }`}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};
