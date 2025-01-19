import { useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import frontMatter from "front-matter";

interface GuideAttributes {
  name: string;
  description: string;
  type: string;
  docs: string;
}

const Guide = () => {
  const { id } = useParams();
  const guides = import.meta.glob('../content/software/*.md', { as: 'raw', eager: true });
  
  const guide = Object.entries(guides)
    .find(([path]) => path.includes(id));

  if (!guide) {
    return (
      <div className="min-h-screen bg-background pt-16">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-4xl font-bold mb-8">Guide Not Found</h1>
          <p>The requested guide could not be found.</p>
        </div>
      </div>
    );
  }

  const { attributes, body } = frontMatter<GuideAttributes>(guide[1]);

  return (
    <div className="min-h-screen bg-background pt-16">
      <div className="container mx-auto px-4 py-8">
        <article className="prose prose-lg dark:prose-invert max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-4">{attributes.name}</h1>
          <div className="text-lg text-muted-foreground mb-8">{attributes.description}</div>
          <ReactMarkdown
            rehypePlugins={[rehypeRaw]}
            components={{
              h1: ({node, ...props}) => <h1 className="text-4xl font-bold mt-8 mb-4" {...props} />,
              h2: ({node, ...props}) => <h2 className="text-3xl font-bold mt-6 mb-3" {...props} />,
              h3: ({node, ...props}) => <h3 className="text-2xl font-bold mt-5 mb-2" {...props} />,
              h4: ({node, ...props}) => <h4 className="text-xl font-bold mt-4 mb-2" {...props} />,
              p: ({node, ...props}) => <p className="my-4 leading-relaxed" {...props} />,
              ul: ({node, ...props}) => <ul className="list-disc list-inside my-4" {...props} />,
              ol: ({node, ...props}) => <ol className="list-decimal list-inside my-4" {...props} />,
              li: ({node, ...props}) => <li className="my-2" {...props} />,
              blockquote: ({node, ...props}) => (
                <blockquote className="border-l-4 border-primary pl-4 my-4 italic" {...props} />
              ),
              a: ({node, ...props}) => (
                <a 
                  className="text-primary hover:text-primary/80 transition-colors" 
                  target="_blank"
                  rel="noopener noreferrer"
                  {...props}
                />
              ),
            }}
          >
            {body}
          </ReactMarkdown>
        </article>
      </div>
    </div>
  );
};

export default Guide;
