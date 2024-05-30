import React from "react";
import Navbar from "../components/Dashboard/Navbar/navbar";
import Menu from "../components/Dashboard/Menu/menu";

function AdminLayout({ children }) {
    return (
        <div className="container">
            <Navbar />
            <div className="d-flex py-2">
                <div style={{ minWidth: '180px' }}>
                    <Menu />
                </div>
                <div className="flex-grow-1">
                    { children }
                </div>
            </div>
        </div>
    )
}

export default AdminLayout;