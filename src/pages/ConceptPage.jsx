import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";

export default function ConceptPage() {
  const { slug } = useParams();
  const [markdown, setMarkdown] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    let cancelled = false;

    // Move setLoading and setError to a separate effect that runs when slug changes
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMarkdown(null);
    setLoading(true);
    setError(false);

    fetch(`${import.meta.env.BASE_URL}concepts/${slug}.md`)
      .then((res) => {
        if (!res.ok) throw new Error("Not found");
        return res.text();
      })
      .then((text) => {
        if (!cancelled) {
          setMarkdown(text);
          setLoading(false);
        }
      })
      .catch(() => {
        if (!cancelled) {
          setError(true);
          setLoading(false);
        }
      });
    return () => {
      cancelled = true;
    };
  }, [slug]);

  if (loading) {
    return (
      <div className="doc-center" style={{ padding: "40px 48px" }}>
        <p>Loading…</p>
      </div>
    );
  }

  if (error || !markdown) {
    return (
      <div className="doc-center" style={{ padding: "40px 48px" }}>
        <h1>Not Found</h1>
        <p>Concept page "{slug}" does not exist.</p>
      </div>
    );
  }

  return (
    <div className="doc-center concept-page" style={{ padding: "40px 48px" }}>
      <ReactMarkdown
        components={{
          code({ node, className, children, ...props }) {
            const isBlock =
              className ||
              (node?.position &&
                node.position.start.line !== node.position.end.line);
            if (isBlock) {
              return (
                <pre className="md-code-block">
                  <code className={className} {...props}>
                    {children}
                  </code>
                </pre>
              );
            }
            return (
              <code className="inline-code" {...props}>
                {children}
              </code>
            );
          },
          pre({ children }) {
            return <>{children}</>;
          },
          table({ children }) {
            return <table className="md-table">{children}</table>;
          },
        }}
      >
        {markdown}
      </ReactMarkdown>
    </div>
  );
}
