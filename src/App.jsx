import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import DocsLayout from "./layout/DocsLayout";
import DocRenderer from "./pages/DocRenderer";
import ConceptPage from "./pages/ConceptPage";
import NotFound from "./pages/NotFound";

import sdkIndex from "./data/sdk-index.json";
import manifest from "./data/manifest.json";

// Per-API JSON (§3 schema)
import init from "./data/apis/init.json";
import doTransaction from "./data/apis/do-transaction.json";
import checkStatus from "./data/apis/check-status.json";
import customerCreate from "./data/apis/customer-create.json";

const apiDataMap = {
  init,
  "do-transaction": doTransaction,
  "check-status": checkStatus,
  "customer-create": customerCreate,
};

const basename = import.meta.env.BASE_URL.replace(/\/$/, "") || "/";

export default function App() {
  return (
    <BrowserRouter basename={basename}>
      <Routes>
        <Route
          path="/"
          element={<DocsLayout sdkIndex={sdkIndex} manifest={manifest} />}
        >
          <Route index element={<Navigate to="/api/init" replace />} />

          {/* API pages */}
          {sdkIndex.apis.map((entry) => (
            <Route
              key={entry.id}
              path={`api/${entry.id}`}
              element={
                <DocRenderer data={apiDataMap[entry.id]} index={entry} />
              }
            />
          ))}

          {/* Concept pages */}
          <Route path="concepts/:slug" element={<ConceptPage />} />

          {/* 404 — catch all unknown routes inside layout */}
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
