import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link, Outlet } from 'react-router-dom';
// import AttendanceTracking from '../components/hr/AttendanceTracking';
// import EmployeeManagement from '../components/hr/EmployeeManagement';
// import LeaveManagement from '../components/hr/LeaveManagement';
// import PayrollManagement from '../components/hr/PayrollManagement';

function HrModule() {
    return (
        // <Router>
        <div className="p-8">
            <h1 className="text-3xl font-bold mb-6">HR Module</h1>
            <nav className="mb-6">
                <ul className="flex space-x-4 text-lg font-bold mb-6">
                    <li><Link to="/hr/Attendance" className="text-gray-400  hover:underline">Attendance Tracking</Link></li>
                    <li><Link to="/hr/Employee" className="text-gray-400  hover:underline">Employee Management </Link></li>
                    <li><Link to="/hr/Leave" className="text-gray-400  hover:underline">Leave Management </Link></li>
                    <li><Link to="/hr/Payroll" className="text-gray-400  hover:underline">Payroll Management</Link></li>
                </ul>
            </nav>
            <Outlet />

            {/* <Routes>
                    <Route path="/hr/Attendance" element={<AttendanceTracking />} />
                    <Route path="/hr/Employee" element={<EmployeeManagement />} />
                    <Route path="/hr/Leave" element={<LeaveManagement />} />
                    <Route path="/hr/Payroll" element={<PayrollManagement />} />
                </Routes> */}
        </div>
        // </Router>
    );
}

export default HrModule;