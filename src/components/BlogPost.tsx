import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import rehypeSlug from "rehype-slug";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import { blogPosts } from "@/utils/blogLoader";
import { Gallery } from "@/components/Gallery";
import { useParams, useLocation } from "react-router-dom";
import { useEffect } from "react";
import PageLayout from "@/components/PageLayout";

export const BlogPost = () => {
  const { slug } = useParams();
  const { hash } = useLocation();
  const post = blogPosts.find(p => p.slug === slug);

  useEffect(() => {
    if (hash) {
      const element = document.querySelector(hash);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [hash]);
  
  if (!post) {
    return <div>Post not found</div>;
  }

  return (
    <PageLayout
      title={post.title}
      subtitle={`Published on ${post.date} • ${post.readTime}${post.author ? ` • By ${post.author}` : ''}`}
    >
      <article className="prose prose-lg max-w-4xl mx-auto backdrop-blur-sm bg-white/80 p-8 rounded-2xl shadow-sm border border-primary/10">
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-64 object-cover rounded-lg mb-8"
        />
        <ReactMarkdown
          rehypePlugins={[rehypeRaw, rehypeSlug]}
          components={{
            h1: ({node, ...props}) => (
              <h1 className="text-4xl font-bold mt-8 mb-4 group relative flex items-center text-secondary" {...props}>
                <a href={`#${props.id}`} className="absolute -left-6 opacity-0 group-hover:opacity-100 transition-opacity">
                  #
                </a>
                {props.children}
              </h1>
            ),
            h2: ({node, ...props}) => (
              <h2 className="text-3xl font-bold mt-6 mb-3 group relative flex items-center text-secondary" {...props}>
                <a href={`#${props.id}`} className="absolute -left-5 opacity-0 group-hover:opacity-100 transition-opacity">
                  #
                </a>
                {props.children}
              </h2>
            ),
            h3: ({node, ...props}) => (
              <h3 className="text-2xl font-bold mt-5 mb-2 group relative flex items-center text-secondary" {...props}>
                <a href={`#${props.id}`} className="absolute -left-5 opacity-0 group-hover:opacity-100 transition-opacity">
                  #
                </a>
                {props.children}
              </h3>
            ),
            h4: ({node, ...props}) => (
              <h4 className="text-xl font-bold mt-4 mb-2 group relative flex items-center text-secondary" {...props}>
                <a href={`#${props.id}`} className="absolute -left-5 opacity-0 group-hover:opacity-100 transition-opacity">
                  #
                </a>
                {props.children}
              </h4>
            ),
            p: ({node, ...props}) => <p className="my-4 leading-relaxed text-secondary/75" {...props} />,
            ul: ({node, ...props}) => <ul className="list-disc list-inside my-4 text-secondary/75" {...props} />,
            ol: ({node, ...props}) => <ol className="list-decimal list-inside my-4 text-secondary/75" {...props} />,
            li: ({node, ...props}) => <li className="my-2" {...props} />,
            img: ({node, src, alt, ...props}) => (
              <img
                src={src}
                alt={alt}
                className="w-full rounded-lg my-8 shadow-lg"
                {...props}
              />
            ),
            code({className, children, ...props}) {
              const match = /language-(\w+)/.exec(className || '');
              return match ? (
                <SyntaxHighlighter
                  style={vscDarkPlus}
                  language={match[1]}
                  className="rounded-lg my-6"
                  PreTag="div"
                >
                  {String(children).replace(/\n$/, '')}
                </SyntaxHighlighter>
              ) : (
                <code className="bg-secondary/10 px-2 py-1 rounded text-sm text-secondary" {...props}>
                  {children}
                </code>
              )
            },
            div: ({node, ...props}) => {
              if (props.className === 'gallery') {
                const images = props['data-images']?.split('|') || [];
                const width = props['data-width'];
                const aspect = props['data-aspect'];
                return (
                  <Gallery 
                    images={images} 
                    className="my-8"
                    aspectRatio={aspect}
                    width={width}
                  />
                );
              }
              return <div {...props} />;
            }
          }}
        >
          {post.content}
        </ReactMarkdown>
        
        {post.gallery && post.gallery.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl font-semibold mb-6 text-secondary">Image Gallery</h2>
            <Gallery 
              images={post.gallery} 
              aspectRatio="16/9"
              width="100%"
            />
          </div>
        )}
      </article>
    </PageLayout>
  );
};
