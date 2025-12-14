import { loadAbout } from "@/utils/contentLoader";
import PageLayout from "@/components/PageLayout";
import ReactMarkdown from "react-markdown";
import rehypeSlug from "rehype-slug";

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
    </PageLayout>
  );
};

export default About;
