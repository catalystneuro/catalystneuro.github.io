import { useState } from "react";
import { Button } from "@/components/ui/button";

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
    <div id="contact">
      <h3 className="text-xl font-semibold mb-2">
        Stay Updated
      </h3>
      <p className="text-secondary/70 text-sm mb-6">
        Subscribe to our newsletter for the latest news and updates.
      </p>
      {subscribed ? (
        <div className="text-green-600">
          Thanks for subscribing! We'll keep you updated with our latest news.
        </div>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="space-y-3"
        >
          <input
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            disabled={loading}
          />
          <Button type="submit" disabled={loading} className="w-full">
            {loading ? "Subscribing..." : "Subscribe"}
          </Button>
        </form>
      )}
      {error && (
        <div className="mt-2 text-red-600 text-sm">
          {error}
        </div>
      )}
    </div>
  );
};
