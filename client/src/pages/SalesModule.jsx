import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link, Outlet } from 'react-router-dom';

function AdminModule() {
    return (

        <div className="p-8">
            <h1 className="text-3xl font-bold mb-6">Sales Module</h1>
            <nav className="mb-6">
                <ul className="flex space-x-4 text-lg font-bold mb-6">
                    <li><Link to="/sales/leads" className="text-gray-400 hover:underline">LeadManagement</Link></li>
                    {/* <li><Link to="/sales/pipeline" className="text-gray-400 hover:underline">SalesPipelineTracking</Link></li> */}
                    <li><Link to="/sales/revenue" className="text-gray-400 hover:underline">RevenueManagement </Link></li>
                    <li><Link to="/sales/reports" className="text-gray-400 hover:underline">SalesReporting</Link></li>
                </ul>
            </nav>
            <Outlet />

        </div>

    );
}

export default AdminModule;