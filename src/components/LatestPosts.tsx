import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getBlogPosts, BlogPost } from "@/utils/blogLoader";
import { useEffect, useState } from "react";

export const LatestPosts = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPosts = async () => {
      try {
        const loadedPosts = await getBlogPosts();
        setPosts(loadedPosts.slice(0, 3));
      } catch (error) {
        console.error('Error loading blog posts:', error);
      } finally {
        setLoading(false);
      }
    };

    loadPosts();
  }, []);

  if (loading) {
    return (
      <section className="py-8 md:py-16" style={{ background: '#E8E9F2' }}>
        <div className="container mx-auto px-4 text-center">
          Loading latest posts...
        </div>
      </section>
    );
  }

  return (
    <section className="py-8 md:py-16" style={{ background: '#E8E9F2' }}>
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 md:mb-12 text-foreground">Latest News & Events</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          {posts.map((post) => (
            <a href={`/blog/${post.slug}`} key={post.slug} className="block">
              <Card className="h-full hover:shadow-lg transition-shadow">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-40 md:h-48 object-cover"
                />
                <CardHeader>
                  <CardTitle className="text-lg md:text-xl line-clamp-2">{post.title}</CardTitle>
                  <CardDescription className="line-clamp-3">{post.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {post.keywords.slice(0, 3).map((keyword) => (
                      <span
                        key={keyword}
                        className="px-2 py-1 bg-primary/10 text-primary rounded-full text-xs"
                      >
                        {keyword}
                      </span>
                    ))}
                  </div>
                  <span className="text-sm text-muted-foreground">{post.date}</span>
                </CardContent>
              </Card>
            </a>
          ))}
        </div>
        <div className="flex justify-center mt-8">
          <a 
            href="/blog" 
            className="inline-flex items-center px-6 py-3 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            View All Posts
          </a>
        </div>
      </div>
    </section>
  );
};
