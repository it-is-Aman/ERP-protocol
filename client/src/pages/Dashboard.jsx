import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Briefcase, DollarSign, Package2 } from 'lucide-react';

export default function Dashboard() {
  const [dashboardData, setDashboardData] = useState({
    hr: { totalEmployees: 0, attendanceRate: 0 },
    admin: { totalResources: 0, pendingCompliances: 0 },
    sales: { totalRevenue: 0, openOpportunities: 0 },
    product: { totalProducts: 0, lowStockItems: 0 }
  });
  const navigate = useNavigate();

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/dashboard');
      const data = await response.json();
      setDashboardData(data);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    }
  };

  const handleCardClick = (module) => {
    navigate(`/${module}`);
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => handleCardClick('hr')}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">HR Overview</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{dashboardData.hr.totalEmployees}</div>
            <p className="text-xs text-muted-foreground">Total Employees</p>
            <div className="mt-2 text-sm">{dashboardData.hr.attendanceRate}% Attendance Rate</div>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => handleCardClick('admin')}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Admin Overview</CardTitle>
            <Briefcase className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{dashboardData.admin.totalResources}</div>
            <p className="text-xs text-muted-foreground">Total Resources</p>
            <div className="mt-2 text-sm">{dashboardData.admin.pendingCompliances} Pending Compliances</div>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => handleCardClick('sales')}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Sales Overview</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${dashboardData.sales.totalRevenue.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Total Revenue</p>
            <div className="mt-2 text-sm">{dashboardData.sales.openOpportunities} Open Opportunities</div>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => handleCardClick('product')}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Product Overview</CardTitle>
            <Package2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{dashboardData.product.totalProducts}</div>
            <p className="text-xs text-muted-foreground">Total Products</p>
            <div className="mt-2 text-sm">{dashboardData.product.lowStockItems} Low Stock Items</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}