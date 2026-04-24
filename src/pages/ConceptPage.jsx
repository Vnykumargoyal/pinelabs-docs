import { useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import gettingStarted from "../data/concepts/getting-started.json";
import transports from "../data/concepts/transports.json";
import errorHandling from "../data/concepts/error-handling.json";

const conceptsMap = {
  "getting-started": gettingStarted,
  transports: transports,
  "error-handling": errorHandling,
};

export default function ConceptPage() {
  const { slug } = useParams();
  const concept = conceptsMap[slug];

  if (!concept) {
    return (
      <div className="doc-center" style={{ padding: "40px 48px" }}>
        <h1>Not Found</h1>
        <p>Concept page "{slug}" does not exist.</p>
      </div>
    );
  }

  return (
    <div className="doc-center" style={{ padding: "40px 48px" }}>
      <h1>{concept.title}</h1>
      {concept.description && (
        <p className="doc-summary">{concept.description}</p>
      )}

      {concept.sections.map((section, i) => (
        <section key={i} className="doc-section">
          <h2>{section.heading}</h2>
          {section.body && <ReactMarkdown>{section.body}</ReactMarkdown>}
          {section.content && <p>{section.content}</p>}
          {section.steps && (
            <ol className="concept-steps">
              {section.steps.map((step, j) => (
                <li key={j}>
                  {step
                    .split("`")
                    .map((part, k) =>
                      k % 2 === 1 ? (
                        <code key={k}>{part}</code>
                      ) : (
                        <span key={k}>{part}</span>
                      )
                    )}
                </li>
              ))}
            </ol>
          )}
        </section>
      ))}
    </div>
  );
}
