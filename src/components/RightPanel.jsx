import { useState, useCallback } from "react";

const langLabels = {
  kotlin: "Kotlin",
  swift: "Swift",
  python: "Python",
  nodejs: "Node.js",
  java: "Java",
  c: "C",
  ruby: "Ruby",
  curl: "cURL",
  csharp: "C#",
  php: "PHP",
  go: "Go",
};

function CopyButton({ text }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }, [text]);

  return (
    <button className="copy-btn" onClick={handleCopy} title="Copy to clipboard">
      {copied ? (
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="20 6 9 17 4 12" />
        </svg>
      ) : (
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
          <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
        </svg>
      )}
      <span>{copied ? "Copied!" : "Copy"}</span>
    </button>
  );
}

export default function RightPanel({ data }) {
  // §3.5 examples[] — array of { language, code }
  const examples = data.examples || [];
  const langs = examples.map((e) => e.language);
  const [activeLang, setActiveLang] = useState(langs[0] || "kotlin");

  const activeExample = examples.find((e) => e.language === activeLang);

  // Per-language response synced with active tab
  const responses = data.responses || [];
  const activeResponse = responses.find((r) => r.language === activeLang);

  // Fallback returns preview when no per-language response
  const returnsPreview = data.returns
    ? `// Returns: ${data.returns.type}\n// ${data.returns.description}${
        data.returns.example ? `\n// Example: ${data.returns.example}` : ""
      }`
    : null;

  return (
    <aside className="right-panel">
      {/* CODE EXAMPLES */}
      <div className="rp-section">
        <div className="rp-header">
          <span className="rp-title">Code Examples</span>
        </div>
        {langs.length > 0 && (
          <div className="rp-lang-tabs">
            {langs.map((lang) => (
              <button
                key={lang}
                className={`rp-lang-tab ${activeLang === lang ? "active" : ""}`}
                onClick={() => setActiveLang(lang)}
              >
                {langLabels[lang] || lang}
              </button>
            ))}
          </div>
        )}
        <div className="rp-code-block">
          <CopyButton text={activeExample ? activeExample.code : ""} />
          <pre>
            <code>
              {activeExample ? activeExample.code : "// No example available"}
            </code>
          </pre>
        </div>
      </div>

      {/* RESPONSE (per-language) or RETURNS fallback */}
      {activeResponse ? (
        <div className="rp-section">
          <div className="rp-header">
            <span className="rp-title">
              Response — {langLabels[activeLang] || activeLang}
            </span>
          </div>
          <div className="rp-code-block rp-returns">
            <CopyButton text={activeResponse.code} />
            <pre>
              <code>{activeResponse.code}</code>
            </pre>
          </div>
        </div>
      ) : returnsPreview ? (
        <div className="rp-section">
          <div className="rp-header">
            <span className="rp-title">Returns</span>
          </div>
          <div className="rp-code-block rp-returns">
            <CopyButton text={returnsPreview} />
            <pre>
              <code>{returnsPreview}</code>
            </pre>
          </div>
        </div>
      ) : null}

      {/* ERRORS QUICK REF */}
      {data.errors && data.errors.length > 0 && (
        <div className="rp-section">
          <div className="rp-header">
            <span className="rp-title">Errors</span>
          </div>
          <div className="rp-errors-list">
            {data.errors.map((e) => (
              <div key={e.variant} className="rp-error-item">
                <code>{e.variant}</code>
                <span className={e.recoverable ? "rp-recover" : "rp-fatal"}>
                  {e.recoverable ? "↻" : "✕"}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </aside>
  );
}
