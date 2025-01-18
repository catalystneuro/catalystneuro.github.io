import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import { getBlogPosts, BlogPost as BlogPostType } from "@/utils/blogLoader";
import { Gallery } from "@/components/Gallery";
import { useEffect, useState } from "react";

export const BlogPost = () => {
  const [post, setPost] = useState<BlogPostType | null>(null);
  const [loading, setLoading] = useState(true);
  const slug = window.location.pathname.split('/blog/')[1];

  useEffect(() => {
    const loadPost = async () => {
      try {
        const posts = await getBlogPosts();
        const foundPost = posts.find(p => p.slug === slug);
        setPost(foundPost || null);
      } catch (error) {
        console.error('Error loading blog post:', error);
      } finally {
        setLoading(false);
      }
    };

    loadPost();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background pt-16">
        <div className="container mx-auto px-4 py-8 text-center">
          Loading post...
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-background pt-16">
        <div className="container mx-auto px-4 py-8 text-center">
          Post not found
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pt-16">
      <div className="container mx-auto px-4 py-8">
        <article className="prose prose-lg dark:prose-invert max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
          <div className="flex items-center justify-between text-sm text-muted-foreground mb-8">
            <span>{post.date}</span>
            <span>{post.readTime}</span>
          </div>
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-64 object-cover rounded-lg mb-8"
          />
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
                  <code className="bg-secondary px-2 py-1 rounded text-sm" {...props}>
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
              <h2 className="text-2xl font-semibold mb-6">Image Gallery</h2>
              <Gallery 
                images={post.gallery} 
                aspectRatio="16/9"
                width="100%"
              />
            </div>
          )}
        </article>
      </div>
    </div>
  );
};
