import RightPanel from "../components/RightPanel";
import { Link } from "react-router-dom";

export default function DocRenderer({ data }) {
  console.log("Rendering doc for:", data);
  return (
    <div className="doc-split">
      {/* CENTER PANEL */}
      <main className="doc-center">
        {/* HEADER */}
        <div className="doc-header">
          <div className="doc-header-top">
            <h1>{data.name}</h1>
            <span className={`stability-pill stability-${data.stability}`}>
              {data.stability}
            </span>
            <span className="since-pill">v{data.since}</span>
          </div>
          <p className="doc-summary">{data.summary}</p>
        </div>

        {/* DESCRIPTION */}
        <section className="doc-section">
          <h2>Description</h2>
          <p>{data.description}</p>
        </section>

        {/* PARAMETERS §3.1 */}
        {data.parameters && data.parameters.length > 0 && (
          <section className="doc-section">
            <h2>Parameters</h2>
            <div className="params-table">
              <div className="params-header">
                <span>Name</span>
                <span>Type</span>
                <span>Required</span>
                <span>Description</span>
              </div>
              {data.parameters.map((p) => (
                <div key={p.name} className="params-row">
                  <span className="param-name">
                    <code>{p.name}</code>
                  </span>
                  <span className="param-type">{p.type}</span>
                  <span className={`param-req ${p.required ? "required" : ""}`}>
                    {p.required ? "Required" : "Optional"}
                  </span>
                  <span className="param-desc">
                    {p.description}
                    {p.constraints && (
                      <span className="param-constraints">
                        {Object.entries(p.constraints).map(([k, v]) => (
                          <code key={k}>
                            {k}: {String(v)}
                          </code>
                        ))}
                      </span>
                    )}
                    {p.example !== undefined && (
                      <div className="param-example">
                        Example:{" "}
                        <code>
                          {typeof p.example === "object"
                            ? JSON.stringify(p.example)
                            : String(p.example)}
                        </code>
                      </div>
                    )}
                  </span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* RETURNS §3.2 */}
        {data.returns && (
          <section className="doc-section">
            <h2>Returns</h2>
            <div className="returns-block">
              <div className="returns-type">
                <code>{data.returns.type}</code>
              </div>
              <p>{data.returns.description}</p>
              {data.returns.example && (
                <div className="returns-example">
                  Example: <code>{String(data.returns.example)}</code>
                </div>
              )}
            </div>
          </section>
        )}

        {/* CALLBACKS §3.3 */}
        {data.callbacks && data.callbacks.length > 0 && (
          <section className="doc-section">
            <h2>Callbacks</h2>
            <div className="params-table">
              <div className="params-header callbacks-header">
                <span>Name</span>
                <span>Trigger</span>
                <span>Payload Type</span>
              </div>
              {data.callbacks.map((cb) => (
                <div key={cb.name} className="params-row callbacks-row">
                  <span className="param-name">
                    <code>{cb.name}</code>
                  </span>
                  <span className="param-desc">{cb.trigger}</span>
                  <span className="param-type">{cb.payload_type}</span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ERRORS §3.4 */}
        {data.errors && data.errors.length > 0 && (
          <section className="doc-section">
            <h2>Errors</h2>
            <div className="errors-table">
              {data.errors.map((e) => (
                <div key={e.variant} className="error-row">
                  <span className="error-variant">
                    <code>{e.variant}</code>
                    <span
                      className={`error-recover ${
                        e.recoverable ? "recoverable" : "fatal"
                      }`}
                    >
                      {e.recoverable ? "recoverable" : "non-recoverable"}
                    </span>
                  </span>
                  <span className="error-when">{e.when}</span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* SEE ALSO */}
        {data.see_also && data.see_also.length > 0 && (
          <section className="doc-section">
            <h2>See Also</h2>
            <div className="see-also-links">
              {data.see_also.map((id) => (
                <Link key={id} to={`/api/${id}`} className="see-also-link">
                  {id}
                </Link>
              ))}
            </div>
          </section>
        )}
      </main>

      {/* RIGHT PANEL — language-switched code examples */}
      <RightPanel data={data} />
    </div>
  );
}
