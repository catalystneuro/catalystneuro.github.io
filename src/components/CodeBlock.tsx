import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";

interface CodeBlockProps {
  language: string;
  value: string;
}

// Isolated so React.lazy can code-split react-syntax-highlighter (a large
// dependency) out of the main bundle. Only blog posts with fenced code blocks
// load this chunk.
const CodeBlock = ({ language, value }: CodeBlockProps) => (
  <SyntaxHighlighter
    style={vscDarkPlus}
    language={language}
    className="rounded-lg my-6"
    PreTag="div"
  >
    {value}
  </SyntaxHighlighter>
);

export default CodeBlock;
