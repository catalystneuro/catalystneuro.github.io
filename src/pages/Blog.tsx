import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { BookOpen } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { blogPosts } from "@/utils/blogLoader";
import PageLayout from "@/components/PageLayout";

const POSTS_PER_PAGE = 6;

const Blog = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const filteredPosts = blogPosts.filter((post) => {
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
    <PageLayout
      title="Blog"
      subtitle="Insights, updates, and technical articles from our team."
    >
      <div className="max-w-3xl mx-auto mb-8 p-4 bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm">
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
          <Link to={`/blog/${post.slug}`} key={post.slug} className="no-underline">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full flex flex-col backdrop-blur-sm bg-white/80 border-primary/10 hover:border-primary/30">
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-48 object-cover rounded-t-lg"
              />
              <CardHeader className="flex-none">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-secondary/65">{post.date}</span>
                  <div className="flex items-center text-sm text-secondary/65">
                    <BookOpen className="w-4 h-4 mr-1" />
                    {post.readTime}
                  </div>
                </div>
                <CardTitle className="text-xl text-secondary">{post.title}</CardTitle>
                <CardDescription className="text-secondary/75">{post.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col flex-grow">
                <div className="flex-grow">
                  <div className="flex flex-wrap gap-2 mb-4">
                    {post.keywords.map((keyword) => (
                      <span
                        key={keyword}
                        className="px-2 py-1 bg-primary/10 text-primary rounded-full text-xs font-medium"
                      >
                        {keyword}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="mt-auto pt-4">
                  <span className="text-primary hover:text-primary/80 transition-colors font-medium">
                    Read More →
                  </span>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center gap-2 mt-8">
          <Button
            variant="outline"
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="border-primary/30 hover:bg-accent hover:text-accent-foreground"
          >
            Previous
          </Button>
          {Array.from({ length: totalPages }, (_, i) => (
            <Button
              key={i + 1}
              variant={currentPage === i + 1 ? "default" : "outline"}
              onClick={() => setCurrentPage(i + 1)}
              className={currentPage === i + 1 ? "bg-primary hover:bg-primary/90" : "border-primary/30 hover:bg-accent hover:text-accent-foreground"}
            >
              {i + 1}
            </Button>
          ))}
          <Button
            variant="outline"
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="border-primary/30 hover:bg-accent hover:text-accent-foreground"
          >
            Next
          </Button>
        </div>
      )}
    </PageLayout>
  );
};

export default Blog;
