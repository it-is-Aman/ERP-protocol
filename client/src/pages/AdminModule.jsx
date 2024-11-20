import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link, Outlet } from 'react-router-dom';
// import ResourceManagement from './ResourceManagement';
// import ComplianceManagement from './ComplianceManagement';
// import DocumentManagement from './DocumentManagement';
// import NotificationManagement from './NotificationManagement';

function AdminModule() {
    return (
        // <Router>
        <div className="p-8">
            <h1 className="text-3xl font-bold mb-6">Admin/Legal Module</h1>
            <nav className="mb-6">
                <ul className="flex space-x-4 text-lg font-bold mb-6">
                    <li><Link to="/admin/resources" className="text-gray-400 hover:underline">Resource Management</Link></li>
                    <li><Link to="/admin/compliance" className="text-gray-400 hover:underline">Compliance Management</Link></li>
                    <li><Link to="/admin/documents" className="text-gray-400 hover:underline">Document Management</Link></li>
                    <li><Link to="/admin/notifications" className="text-gray-400 hover:underline">Notifications</Link></li>
                </ul>
            </nav>
            <Outlet />

            {/* <Routes>
                    <Route path="/admin/resources" element={<ResourceManagement />} />
                    <Route path="/admin/compliance" element={<ComplianceManagement />} />
                    <Route path="/admin/documents" element={<DocumentManagement />} />
                    <Route path="/admin/notifications" element={<NotificationManagement />} />
                </Routes> */}
        </div>
        //  </Router> 
    );
}

export default AdminModule;