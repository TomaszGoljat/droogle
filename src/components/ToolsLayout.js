import { Link, Outlet } from "react-router-dom";

export default function ToolsLayout() {
    return (
        <>
        <nav className="tools--nav">
            <Link to="/tools" className="topbar--link">List of tools</Link>
            <Link to="/tools/cbd" className="topbar--link">CBD Calculators</Link>
            <Link to="/tools/dxm" className="topbar--link">DXM Calculators</Link>
        </nav>
        <Outlet />
        </>
    )
}