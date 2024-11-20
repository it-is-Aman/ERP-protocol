import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link, Outlet } from 'react-router-dom';

function AdminModule() {
    return (

        <div className="p-8">
            <h1 className="text-3xl font-bold mb-6">Product Module</h1>
            <nav className="mb-6">
                <ul className="flex space-x-4 text-lg font-bold mb-6">
                    <li><Link to="/product/inventory" className="text-gray-400 hover:underline">Inventory Management</Link></li>
                    <li><Link to="/product/catalog" className="text-gray-400 hover:underline">Product Catalog</Link></li>
                    <li><Link to="/product/restock-alerts" className="text-gray-400 hover:underline">Restock - Alerts</Link></li>
                    <li><Link to="/product/reports" className="text-gray-400 hover:underline">Product Reports</Link></li>
                </ul>
            </nav>
            <Outlet />

        </div>

    );
}

export default AdminModule;