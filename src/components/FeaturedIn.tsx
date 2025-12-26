import { ExternalLink } from "lucide-react";

interface Article {
  title: string;
  publication: string;
  url: string;
  author: string;
  description?: string;
}

const articles: Article[] = [
  {
    title: "Neuroscience's open data revolution is just getting started",
    publication: "The Transmitter",
    url: "https://www.thetransmitter.org/open-neuroscience-and-data-sharing/neurosciences-open-data-revolution-is-just-getting-started/",
    author: "Benjamin Dichter",
    description: "How open data standards are transforming neuroscience research"
  },
  {
    title: "Should neuroscientists vibe code?",
    publication: "The Transmitter",
    url: "https://www.thetransmitter.org/craft-and-careers/should-neuroscientists-vibe-code/",
    author: "Benjamin Dichter",
    description: "Exploring the role of AI in scientific programming"
  }
];

export const FeaturedIn = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container max-w-5xl">
        {/* Featured In Section */}
        <div className="text-center mb-10">
          <h2 className="text-sm font-medium text-secondary/60 uppercase tracking-wider">Featured In</h2>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6">
          {articles.map((article, index) => (
            <a
              key={index}
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group block p-6 rounded-lg border border-gray-200 hover:shadow-md transition-shadow duration-300 bg-white"
            >
              <div className="flex items-start justify-between mb-3">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">
                  {article.publication}
                </span>
                <ExternalLink className="h-4 w-4 text-gray-400 group-hover:text-primary transition-colors" />
              </div>
              
              <h3 className="text-lg font-semibold text-secondary group-hover:text-primary transition-colors mb-2">
                {article.title}
              </h3>
              
              {article.description && (
                <p className="text-sm text-secondary/70 mb-3">
                  {article.description}
                </p>
              )}
              
              <p className="text-sm text-secondary/60">
                By {article.author}
              </p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};
