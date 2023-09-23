import { Link, Outlet } from "react-router-dom";

export default function ToolsLayout() {
    return (
        <>
        <nav className="tools--nav">
            <Link to="/tools">List of tools</Link>
            <Link to="/tools/cbd">CBD Calculators</Link>
            <Link to="/tools/dxm">DXM Calculators</Link>
        </nav>
        <Outlet />
        </>
    )
}