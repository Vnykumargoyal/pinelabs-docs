import Sidebar from "../components/Sidebar";
import { Outlet } from "react-router-dom";

export default function DocsLayout({ sdkIndex, manifest }) {
  return (
    <div className="layout">
      <Sidebar sdkIndex={sdkIndex} manifest={manifest} />
      <div className="layout-body">
        <Outlet />
      </div>
    </div>
  );
}
