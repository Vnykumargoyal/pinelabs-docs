import { NavLink } from "react-router-dom";

const categoryLabels = {
  lifecycle: "Lifecycle",
  transaction: "Transaction",
  customer: "Customer",
  config: "Configuration",
  utility: "Utility",
};

const conceptPages = [
  { slug: "getting-started", title: "Getting Started" },
  // { slug: "transports", title: "Transports" },
  { slug: "error-handling", title: "Error Handling" },
];

export default function Sidebar({ sdkIndex, manifest }) {
  // Group APIs by category
  const grouped = {};
  sdkIndex.apis.forEach((api) => {
    const cat = api.category;
    if (!grouped[cat]) grouped[cat] = [];
    grouped[cat].push(api);
  });

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <rect width="24" height="24" rx="4" fill="#6366f1" />
          <path
            d="M7 8h10M7 12h10M7 16h6"
            stroke="#fff"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
        <span className="sidebar-title">Pine Labs SDK</span>
      </div>
      <div className="sidebar-subtitle">
        v{manifest.sdk_version} — Documentation
      </div>

      <div className="sidebar-search">
        <input type="text" placeholder="Search docs..." />
      </div>

      <nav className="sidebar-nav">
        {/* CONCEPTS */}
        <div className="nav-group">
          <div className="nav-category">Guides</div>
          {conceptPages.map((c) => (
            <NavLink
              key={c.slug}
              to={`/concepts/${c.slug}`}
              className={({ isActive }) =>
                `nav-item ${isActive ? "active" : ""}`
              }
            >
              <span className="nav-icon">📖</span>
              <span className="nav-label">{c.title}</span>
            </NavLink>
          ))}
        </div>

        {/* API REFERENCE grouped by category */}
        {Object.entries(grouped).map(([category, apis]) => (
          <div key={category} className="nav-group">
            <div className="nav-category">
              {categoryLabels[category] || category}
            </div>
            {apis.map((api) => (
              <NavLink
                key={api.id}
                to={`/api/${api.id}`}
                className={({ isActive }) =>
                  `nav-item ${isActive ? "active" : ""}`
                }
              >
                <span className={`stability-dot stability-${api.stability}`} />
                <span className="nav-label">{api.name}</span>
                {api.stability !== "stable" && (
                  <span
                    className={`stability-badge stability-${api.stability}`}
                  >
                    {api.stability}
                  </span>
                )}
              </NavLink>
            ))}
          </div>
        ))}
      </nav>

      <div className="sidebar-footer">
        <span className="sidebar-version">
          SDK v{manifest.sdk_version} · {manifest.api_count} APIs
        </span>
      </div>
    </aside>
  );
}
