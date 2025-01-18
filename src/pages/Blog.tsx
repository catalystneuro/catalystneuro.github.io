import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { BookOpen } from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { getBlogPosts, BlogPost } from "@/utils/blogLoader";

const POSTS_PER_PAGE = 6;

const Blog = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPosts = async () => {
      try {
        const loadedPosts = await getBlogPosts();
        setPosts(loadedPosts);
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
      <div className="min-h-screen bg-gradient-to-br from-gradient-start to-gradient-end pt-16">
        <div className="container mx-auto px-4 py-8 text-center">
          Loading posts...
        </div>
      </div>
    );
  }

  const filteredPosts = posts.filter((post) => {
    const searchLower = searchTerm.toLowerCase();
    return (
      post.title.toLowerCase().includes(searchLower) ||
      post.description.toLowerCase().includes(searchLower) ||
      post.keywords.some((keyword) => keyword.toLowerCase().includes(searchLower))
    );
  });

  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);
  const currentPosts = filteredPosts.slice(
    (currentPage - 1) * POSTS_PER_PAGE,
    currentPage * POSTS_PER_PAGE
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gradient-start to-gradient-end pt-16">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8 text-center">Blog</h1>
        
        <div className="max-w-xl mx-auto mb-8">
          <Input
            type="search"
            placeholder="Search posts by title, description, or keywords..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentPosts.map((post) => (
            <a href={`/blog/${post.slug}`} key={post.slug}>
              <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full flex flex-col">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-48 object-cover rounded-t-lg"
                />
                <CardHeader className="flex-none">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-muted-foreground">{post.date}</span>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <BookOpen className="w-4 h-4 mr-1" />
                      {post.readTime}
                    </div>
                  </div>
                  <CardTitle className="text-xl">{post.title}</CardTitle>
                  <CardDescription>{post.description}</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col flex-grow">
                  <div className="flex-grow">
                    <div className="flex flex-wrap gap-2 mb-4">
                      {post.keywords.map((keyword) => (
                        <span
                          key={keyword}
                          className="px-2 py-1 bg-secondary text-secondary-foreground rounded-full text-xs"
                        >
                          {keyword}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="mt-auto pt-4">
                    <span className="text-primary hover:text-primary/80 transition-colors">
                      Read More →
                    </span>
                  </div>
                </CardContent>
              </Card>
            </a>
          ))}
        </div>

        {totalPages > 1 && (
          <div className="flex justify-center gap-2 mt-8">
            <Button
              variant="outline"
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
            >
              Previous
            </Button>
            {Array.from({ length: totalPages }, (_, i) => (
              <Button
                key={i + 1}
                variant={currentPage === i + 1 ? "default" : "outline"}
                onClick={() => setCurrentPage(i + 1)}
              >
                {i + 1}
              </Button>
            ))}
            <Button
              variant="outline"
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
            >
              Next
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Blog;
