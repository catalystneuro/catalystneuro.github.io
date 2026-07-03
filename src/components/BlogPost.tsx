import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import rehypeSlug from "rehype-slug";
import { blogPosts } from "@/utils/blogLoader";
import { Gallery } from "@/components/Gallery";
import { useParams, useLocation } from "react-router-dom";
import { lazy, Suspense, useEffect } from "react";
import Seo from "@/components/Seo";
import PageLayout from "@/components/PageLayout";

const CodeBlock = lazy(() => import("@/components/CodeBlock"));

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
      <Seo title={post.title} description={post.description} image={post.image} type="article" />
      <article className="prose prose-lg max-w-4xl mx-auto backdrop-blur-sm bg-white/80 p-8 rounded-2xl shadow-sm border border-primary/10">
        <img
          src={post.image}
          alt={post.title}
          loading="lazy"
          decoding="async"
          className="w-full aspect-[3/1] object-cover rounded-lg mb-8"
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
                loading="lazy"
                decoding="async"
                className="w-full rounded-lg my-8 shadow-lg"
                {...props}
              />
            ),
            code({className, children, ...props}) {
              const match = /language-(\w+)/.exec(className || '');
              const value = String(children).replace(/\n$/, '');
              return match ? (
                <Suspense
                  fallback={
                    <pre className="rounded-lg my-6 bg-secondary/10 p-4 overflow-x-auto">
                      <code>{value}</code>
                    </pre>
                  }
                >
                  <CodeBlock language={match[1]} value={value} />
                </Suspense>
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
