import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

function RestockAlerts() {
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    fetchAlerts();
  }, []);

  const fetchAlerts = async () => {
    const response = await fetch('http://localhost:5000/api/products/restock-alerts');
    const data = await response.json();
    setAlerts(data);
  };

  const handleRestock = async (productId) => {
    await fetch(`http://localhost:5000/api/products/${productId}/restock`, { method: 'POST' });
    fetchAlerts();
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Restock Alerts</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Product Name</TableHead>
              <TableHead>SKU</TableHead>
              <TableHead>Current Quantity</TableHead>
              <TableHead>Restock Level</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {alerts.map((alert) => (
              <TableRow key={alert._id}>
                <TableCell>{alert.name}</TableCell>
                <TableCell>{alert.sku}</TableCell>
                <TableCell>{alert.quantity}</TableCell>
                <TableCell>{alert.restockLevel}</TableCell>
                <TableCell>
                  <Button onClick={() => handleRestock(alert._id)}>Restock</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

export default RestockAlerts;