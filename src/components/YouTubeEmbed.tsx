interface YouTubeEmbedProps {
  videoId: string;
}

export const YouTubeEmbed = ({ videoId }: YouTubeEmbedProps) => {
  return (
    <div data-testid="youtube-container" className="relative w-full max-w-4xl mx-auto rounded-lg overflow-hidden shadow-lg aspect-video">
      <iframe
        title="YouTube video player"
        src={`https://www.youtube.com/embed/${videoId}`}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="w-full h-full"
      />
    </div>
  );
};
