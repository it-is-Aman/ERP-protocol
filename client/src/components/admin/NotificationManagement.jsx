import React, { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

function NotificationManagement() {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/notifications');
      const data = await response.json();
      setNotifications(data);
    } catch (error) {
      console.error('Error fetching notifications:', error);
    }
  };

  const handleResolve = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/notifications/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: 'Resolved' })
      });
      if (response.ok) {
        fetchNotifications();
      }
    } catch (error) {
      console.error('Error resolving notification:', error);
    }
  };

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Notifications</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Type</TableHead>
                <TableHead>Message</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {notifications.map(notification => (
                <TableRow key={notification._id}>
                  <TableCell>{notification.type}</TableCell>
                  <TableCell>{notification.message}</TableCell>
                  <TableCell>{new Date(notification.date).toLocaleString()}</TableCell>
                  <TableCell>{notification.status}</TableCell>
                  <TableCell>
                    {notification.status === 'Pending' && (
                      <Button onClick={() => handleResolve(notification._id)}>Resolve</Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}

export default NotificationManagement;