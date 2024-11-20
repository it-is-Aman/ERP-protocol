// src/components/LeaveManagement.tsx
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

function LeaveManagement() {
  const [leaves, setLeaves] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [formData, setFormData] = useState({ employee: '', startDate: '', endDate: '', type: 'Sick', reason: '' });

  useEffect(() => {
    fetchLeaves();
    fetchEmployees();
  }, []);

  const fetchLeaves = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/leaves');
      const data = await response.json();
      console.log('Fetched leaves:', data); // Debugging line
      setLeaves(data);
    } catch (error) {
      console.error('Error fetching leaves:', error);
    }
  };

  const fetchEmployees = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/employees');
      const data = await response.json();
      console.log('Fetched employees:', data); // Debugging line
      setEmployees(data);
    } catch (error) {
      console.error('Error fetching employees:', error);
    }
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/leaves', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (response.ok) {
        fetchLeaves();
        setFormData({ employee: '', startDate: '', endDate: '', type: 'Sick', reason: '' });
      }
    } catch (error) {
      console.error('Error requesting leave:', error);
    }
  };

  const handleStatusUpdate = async (id, status) => {
    try {
      const response = await fetch(`http://localhost:5000/api/leaves/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      });
      if (response.ok) {
        fetchLeaves();
      }
    } catch (error) {
      console.error('Error updating leave status:', error);
    }
  };

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold tracking-tight">Leave Management</h1>
      <Card>
        <CardHeader>
          <CardTitle>Request Leave</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Select name="employee" value={formData.employee} onValueChange={(value) => setFormData({ ...formData, employee: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Select Employee" />
              </SelectTrigger>
              <SelectContent>
                {Array.isArray(employees) && employees.map(employee => (
                  <SelectItem key={employee._id} value={employee._id}>{employee.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Input name="startDate" value={formData.startDate} onChange={handleInputChange} type="date" required />
            <Input name="endDate" value={formData.endDate} onChange={handleInputChange} type="date" required />
            <Select name="type" value={formData.type} onValueChange={(value) => setFormData({ ...formData, type: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Select Leave Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Sick">Sick</SelectItem>
                <SelectItem value="Vacation">Vacation</SelectItem>
                <SelectItem value="Personal">Personal</SelectItem>
              </SelectContent>
            </Select>
            <Textarea name="reason" value={formData.reason} onChange={handleInputChange} placeholder="Reason for leave" required />
            <Button type="submit">Request Leave</Button>
          </form>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Leave Requests</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Employee</TableHead>
                <TableHead>Start Date</TableHead>
                <TableHead>End Date</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Reason</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {Array.isArray(leaves) && leaves.map(leave => (
                <TableRow key={leave._id}>
                  <TableCell>{leave.employee.name}</TableCell>
                  <TableCell>{new Date(leave.startDate).toLocaleDateString()}</TableCell>
                  <TableCell>{new Date(leave.endDate).toLocaleDateString()}</TableCell>
                  <TableCell>{leave.type}</TableCell>
                  <TableCell>{leave.reason}</TableCell>
                  <TableCell>{leave.status}</TableCell>
                  <TableCell>
                    {leave.status === 'Pending' && (
                      <>
                        <Button onClick={() => handleStatusUpdate(leave._id, 'Approved')} className="mr-2">Approve</Button>
                        <Button variant="destructive" onClick={() => handleStatusUpdate(leave._id, 'Rejected')}>Reject</Button>
                      </>
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

export default LeaveManagement;