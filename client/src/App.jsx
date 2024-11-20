// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import { ThemeProvider } from './components/theme-provider';
import Dashboard from './pages/Dashboard';
import Sidebar from './components/Sidebar';

import HrModule from './pages/HrModule';
import AttendanceTracking from './components/hr/AttendanceTracking';
import EmployeeManagement from './components/hr/EmployeeManagement';
import LeaveManagement from './components/hr/LeaveManagement';
import PayrollManagement from './components/hr/PayrollManagement';

import AdminModule from './pages/AdminModule';
import ResourceManagement from './components/admin/ResourceManagement';
import ComplianceManagement from './components/admin/ComplianceManagement';
import DocumentManagement from './components/admin/DocumentManagement';
import NotificationManagement from './components/admin/NotificationManagement';

import ProductModule from './pages/ProductModule';
import InventoryManagement from './components/product/InventoryManagement';
import ProductCatalog from './components/product/ProductCatalog';
import RestockAlerts from './components/product/RestockAlerts';
import ProductReports from './components/product/ProductReports';

import SalesModule from './pages/SalesModule';
import LeadManagement from './components/sales/LeadManagement';
// import SalesPipelineTracking from './components/sales/SalesPipelineTracking';
import RevenueManagement from './components/sales/RevenueManagement';
import SalesReporting from './components/sales/SalesReporting';

function App() {
  return (
    // <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
    <Router>
      <div className="flex h-screen bg-background">
        <Sidebar />
        <main className="flex-1 overflow-y-auto">
          <Routes>
            <Route exact path="/" element={<Dashboard />} />
            <Route path='/hr' element={<HrModule />}>
              <Route path="Attendance" element={<AttendanceTracking />} />
              <Route path="Employee" element={<EmployeeManagement />} />
              <Route path="Leave" element={<LeaveManagement />} />
              <Route path="Payroll" element={<PayrollManagement />} />
            </Route>
            <Route path='/admin' element={<AdminModule />}>
              <Route path="resources" element={<ResourceManagement />} />
              <Route path="compliance" element={<ComplianceManagement />} />
              <Route path="documents" element={<DocumentManagement />} />
              <Route path="notifications" element={<NotificationManagement />} />
            </Route>
            <Route path='/product' element={<ProductModule />}>
              <Route path="inventory" element={<InventoryManagement />} />
              <Route path="catalog" element={<ProductCatalog />} />
              <Route path="restock-alerts" element={<RestockAlerts />} />
              <Route path="reports" element={<ProductReports />} />
            </Route>
            <Route path='/sales' element={<SalesModule />}>
              <Route path="leads" element={<LeadManagement />} />
              {/* <Route path="pipeline" element={<SalesPipelineTracking />} /> */}
              <Route path="revenue" element={<RevenueManagement />} />
              <Route path="reports" element={<SalesReporting />} />
            </Route>
          </Routes>
        </main>
      </div>
    </Router>
    // </ThemeProvider>
  );
}

export default App;