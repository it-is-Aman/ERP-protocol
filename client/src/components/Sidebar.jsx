// src/components/Sidebar.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Home, Users, Clock, Calendar, DollarSign, Shield, BarChart, Package } from 'lucide-react';

const sidebarItems = [
  { icon: Home, label: "Dashboard", path: "/" },
  { icon: Users, label: "HR", path: "/hr" },
  { icon: Shield, label: "Admin/Legal", path: "/admin" },
  { icon: Package, label: "Product", path: "/product" },
  { icon: Users, label: "Sales", path: "/sales" },
  // { icon: BarChart, label: "Finance", path: "/finance" },
];

function Sidebar() {
  return (
    <div className="pb-12 w-64">
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
            SyncSuite
          </h2>
          <ScrollArea className="h-[calc(100vh-8rem)] px-1">
            <div className="space-y-1">
              {sidebarItems.map((item, index) => (
                <Button key={index} asChild variant="ghost" className="w-full justify-start">
                  <Link to={item.path}>
                    <item.icon className="mr-2 h-4 w-4" />
                    {item.label}
                  </Link>
                </Button>
              ))}
            </div>
          </ScrollArea>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;