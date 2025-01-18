interface YouTubeEmbedProps {
  videoId: string;
}

export const YouTubeEmbed = ({ videoId }: YouTubeEmbedProps) => {
  return (
    <div className="w-full max-w-4xl mx-auto rounded-lg overflow-hidden shadow-lg" style={{ height: '500px' }}>
      <iframe
        src={`https://www.youtube.com/embed/${videoId}`}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="w-full h-full"
      />
    </div>
  );
};
