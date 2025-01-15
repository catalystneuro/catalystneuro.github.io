import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
      const formData = new FormData();
      formData.append('form-name', 'newsletter');
      formData.append('email', email);

      const response = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(formData as any).toString(),
      });

      if (!response.ok) {
        throw new Error('Failed to subscribe');
      }

      setSubscribed(true);
      setEmail("");
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to subscribe');
      console.error("Newsletter signup error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-20 bg-white" id="contact">
      <div className="container max-w-4xl">
        <h2 className="text-3xl font-bold text-center mb-12">Get in Touch</h2>
        
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center gap-2 text-lg mb-2">
            <Mail className="h-5 w-5" />
            <span>Email us at:</span>
          </div>
          <a 
            href="mailto:info@catalystneuro.com" 
            className="text-xl text-primary hover:underline"
          >
            info@catalystneuro.com
          </a>
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
              name="newsletter"
              method="POST"
              data-netlify="true"
              netlify-honeypot="bot-field"
            >
              <input type="hidden" name="form-name" value="newsletter" />
              <div hidden>
                <input name="bot-field" />
              </div>
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="flex-1"
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
