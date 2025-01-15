import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { blogPosts } from "@/utils/blogLoader";
import { Link } from "react-router-dom";

export const LatestPosts = () => {
  const latestPosts = blogPosts.slice(0, 3);

  return (
    <section className="py-8 md:py-16" style={{ background: '#E8E9F2' }}>
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 md:mb-12 text-foreground">Latest News & Events</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          {latestPosts.map((post) => (
            <Link to={`/blog/${post.slug}`} key={post.slug} className="block">
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
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
