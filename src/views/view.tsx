import { Outlet } from "react-router-dom";
export default function View() {
    return (
        <div className="view">
            <Outlet></Outlet>
        </div>
    );
}
