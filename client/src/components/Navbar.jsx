import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="bg-blue-600 text-white">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="text-xl font-bold">SyncSuite HR</Link>
          <div className="flex space-x-4">
            <Link to="/hr" className="hover:text-blue-200">HR module</Link>
            <Link to="/admin" className="hover:text-blue-200">Admin/Legal module</Link>
            {/* <Link to="/leave" className="hover:text-blue-200">Leave</Link>
            <Link to="/payroll" className="hover:text-blue-200">Payroll</Link> */}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;