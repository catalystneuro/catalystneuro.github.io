import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { blogPosts } from "@/utils/blogLoader";

export const LatestPosts = () => {
  const latestPosts = blogPosts.slice(0, 3);

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-gradient-start to-gradient-end relative">
      {/* Top section divider */}
      <div className="absolute top-0 left-0 w-full h-8 bg-gradient-to-b from-white to-transparent"></div>
      <div className="container mx-auto px-4">
        <div className="mb-10 md:mb-16 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-secondary">Latest News & Events</h2>
          <div className="w-24 h-1 bg-primary mx-auto mt-4 rounded-full"></div>
          <p className="text-secondary/75 max-w-2xl mx-auto mt-5 text-lg">Stay updated with our latest developments, research breakthroughs, and community events</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {latestPosts.map((post) => (
            <Link to={`/blog/${post.slug}`} key={post.slug} className="block group">
              <Card className="h-full transition-all duration-300 border border-transparent bg-white shadow-sm group-hover:shadow-lg group-hover:border-primary/10 overflow-hidden">
                <div className="relative overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-52 md:h-56 object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <CardHeader className="pb-0 pt-5">
                  <CardTitle className="text-lg md:text-xl line-clamp-2 text-secondary group-hover:text-primary transition-colors duration-300">{post.title}</CardTitle>
                  <CardDescription className="line-clamp-3 text-secondary/75 mt-3">{post.description}</CardDescription>
                </CardHeader>
                <CardContent className="pt-4">
                  <div className="flex flex-wrap gap-2 mb-4">
                    {post.keywords.slice(0, 3).map((keyword) => (
                      <span
                        key={keyword}
                        className="px-3 py-1 bg-primary/5 text-primary rounded-full text-xs font-medium group-hover:bg-primary/10 transition-colors duration-300"
                      >
                        {keyword}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-secondary/65 font-medium">{post.date}</span>
                    <span className="text-primary text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center">
                      Read more 
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-1">
                        <path d="M5 12h14"></path>
                        <path d="m12 5 7 7-7 7"></path>
                      </svg>
                    </span>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
        <div className="flex justify-center mt-12">
          <Link 
            to="/blog" 
            className="inline-flex items-center px-8 py-3 rounded-md bg-white border border-gray-200 text-primary font-medium hover:shadow-md hover:border-primary/30 transition-all duration-300"
          >
            View All Posts
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-2">
              <path d="M5 12h14"></path>
              <path d="m12 5 7 7-7 7"></path>
            </svg>
          </Link>
        </div>
      </div>
      
      {/* Bottom section divider */}
      <div className="absolute bottom-0 left-0 w-full h-8 bg-gradient-to-t from-white to-transparent"></div>
      
      {/* Subtle wave pattern at top and bottom */}
      <div className="absolute top-0 left-0 w-full">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 48" fill="none" preserveAspectRatio="none" className="w-full h-6 text-white/50">
          <path d="M0 48L60 42.6667C120 37.3333 240 26.6667 360 21.3333C480 16 600 16 720 18.6667C840 21.3333 960 26.6667 1080 32C1200 37.3333 1320 42.6667 1380 45.3333L1440 48V0H1380C1320 0 1200 0 1080 0C960 0 840 0 720 0C600 0 480 0 360 0C240 0 120 0 60 0H0V48Z" fill="currentColor" fillOpacity="0.1"/>
        </svg>
      </div>
      
      <div className="absolute bottom-0 left-0 w-full rotate-180">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 48" fill="none" preserveAspectRatio="none" className="w-full h-6 text-white/50">
          <path d="M0 48L60 42.6667C120 37.3333 240 26.6667 360 21.3333C480 16 600 16 720 18.6667C840 21.3333 960 26.6667 1080 32C1200 37.3333 1320 42.6667 1380 45.3333L1440 48V0H1380C1320 0 1200 0 1080 0C960 0 840 0 720 0C600 0 480 0 360 0C240 0 120 0 60 0H0V48Z" fill="currentColor" fillOpacity="0.1"/>
        </svg>
      </div>
    </section>
  );
};
