import { useState } from "react";
import SchemaForm from "./SchemaForm";

export default function ApiPlayground({ apiData }) {
  const [jsonBody, setJsonBody] = useState({});
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const sendRequest = async () => {
    try {
      setLoading(true);

      const res = await fetch("https://api.test.com" + apiData.endpoint, {
        method: apiData.method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(jsonBody),
      });

      const data = await res.json();
      setResponse(JSON.stringify(data, null, 2));
    } catch (err) {
      setResponse("Error: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="playground">
      <h3>{apiData.name} Playground</h3>

      {/* FORM GENERATED FROM SCHEMA */}
      {apiData.requestSchema && (
        <SchemaForm schema={apiData.requestSchema} onChange={setJsonBody} />
      )}

      {/* JSON PREVIEW */}
      <h4>Generated JSON</h4>
      <pre>{JSON.stringify(jsonBody, null, 2)}</pre>

      {/* SEND BUTTON */}
      <button onClick={sendRequest} disabled={loading}>
        {loading ? "Sending..." : "Send Request"}
      </button>

      {/* RESPONSE */}
      <h4>Response</h4>
      <pre>{response}</pre>
    </div>
  );
}
