import { loadAbout } from "@/utils/contentLoader";
import PageLayout from "@/components/PageLayout";
import ReactMarkdown from "react-markdown";
import rehypeSlug from "rehype-slug";
import { YouTubeEmbed } from "@/components/YouTubeEmbed";

const About = () => {
  const { body } = loadAbout();

  return (
    <PageLayout
      title="About CatalystNeuro"
      subtitle="Our mission, vision, and approach to advancing neuroscience data standards."
    >
      <article className="prose prose-lg max-w-none prose-headings:text-secondary prose-p:text-secondary/75 prose-strong:text-secondary prose-li:text-secondary/75">
        <ReactMarkdown rehypePlugins={[rehypeSlug]}>
          {body}
        </ReactMarkdown>
      </article>

      <div className="mt-16 max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold text-secondary text-center mb-6">Life at CatalystNeuro</h2>
        <YouTubeEmbed videoId="uRYOrGt1wMo" />
      </div>
    </PageLayout>
  );
};

export default About;
