import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import DocsLayout from "./layout/DocsLayout";
import ApiPage from "./pages/ApiPage";
import ConceptPage from "./pages/ConceptPage";
import NotFound from "./pages/NotFound";

import sdkIndex from "./data/sdk-index.json";
import manifest from "./data/manifest.json";

// API and concept content is sourced directly from markdown files in
// `public/api/*.md` and `public/concepts/*.md`. JSON files under
// `src/data/apis/` and `src/data/concepts/` are no longer the content
// source — only `sdk-index.json` is used for sidebar metadata.

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

          {/* API pages — content sourced from public/api/<id>.md */}
          {sdkIndex.apis.map((entry) => (
            <Route
              key={entry.id}
              path={`api/${entry.id}`}
              element={<ApiPage />}
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
