import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Mail } from "lucide-react";

export const Contact = () => {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Submit directly to Netlify Forms
      const formData = new URLSearchParams();
      formData.append('form-name', 'newsletter');
      formData.append('email', email);

      const response = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: formData.toString(),
      });

      if (!response.ok) {
        throw new Error('Failed to subscribe');
      }

      setSubscribed(true);
      setEmail("");
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to subscribe');
      console.error("Newsletter signup error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-20 bg-white" id="contact">
      <div className="container max-w-4xl">
        <h2 className="text-3xl font-bold text-center mb-12">Get in Touch</h2>
        
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center gap-2 text-lg">
            <Mail className="h-5 w-5" />
            <span>Email us at:</span>
            <a 
              href="mailto:info@catalystneuro.com" 
              className="text-lg text-primary hover:underline cursor-pointer"
              target="_blank"
              rel="noopener noreferrer"
            >
              info@catalystneuro.com
            </a>
          </div>
        </div>

        <div className="max-w-xl mx-auto">
          <h3 className="text-xl font-semibold text-center mb-6">
            Stay Updated with Our Newsletter
          </h3>
          {subscribed ? (
            <div className="text-center text-green-600">
              Thanks for subscribing! We'll keep you updated with our latest news.
            </div>
          ) : (
            <form 
              onSubmit={handleSubmit} 
              className="flex gap-4"
            >
              <input
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                className="flex-1 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                disabled={loading}
              />
              <Button type="submit" disabled={loading}>
                {loading ? "Subscribing..." : "Subscribe"}
              </Button>
            </form>
          )}
          {error && (
            <div className="mt-2 text-center text-red-600 text-sm">
              {error}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
