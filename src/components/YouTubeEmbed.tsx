interface YouTubeEmbedProps {
  videoId: string;
}

export const YouTubeEmbed = ({ videoId }: YouTubeEmbedProps) => {
  return (
    <div className="relative w-full max-w-4xl mx-auto rounded-lg overflow-hidden shadow-lg aspect-video">
      <iframe
        src={`https://www.youtube.com/embed/${videoId}`}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="w-full h-full"
      />
    </div>
  );
};
