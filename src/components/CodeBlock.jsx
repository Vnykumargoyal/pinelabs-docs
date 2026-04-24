import Prism from "prismjs";
import "prismjs/themes/prism.css";
import { useEffect } from "react";

export default function CodeBlock({ code, language }) {
  useEffect(() => {
    Prism.highlightAll();
  }, []);

  return (
    <pre>
      <code className={`language-${language}`}>{code}</code>
    </pre>
  );
}
