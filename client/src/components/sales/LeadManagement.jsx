import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function LeadManagement() {
  const [leads, setLeads] = useState([]);
  const [newLead, setNewLead] = useState({ name: '', email: '', phone: '', status: 'New' });

  useEffect(() => {
    fetchLeads();
  }, []);

  const fetchLeads = async () => {
    const response = await fetch('http://localhost:5000/api/sales/leads');
    const data = await response.json();
    setLeads(data);
  };

  const handleInputChange = (e) => {
    setNewLead({ ...newLead, [e.target.name]: e.target.value });
  };

  const handleStatusChange = (value) => {
    setNewLead({ ...newLead, status: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch('http://localhost:5000/api/sales/leads', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newLead),
    });
    setNewLead({ name: '', email: '', phone: '', status: 'New' });
    fetchLeads();
  };

  const handleUpdateStatus = async (id, newStatus) => {
    await fetch(`http://localhost:5000/api/sales/leads/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: newStatus }),
    });
    fetchLeads();
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Lead Management</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4 mb-4">
          <Input
            name="name"
            value={newLead.name}
            onChange={handleInputChange}
            placeholder="Lead Name"
            required
          />
          <Input
            name="email"
            value={newLead.email}
            onChange={handleInputChange}
            placeholder="Email"
            type="email"
            required
          />
          <Input
            name="phone"
            value={newLead.phone}
            onChange={handleInputChange}
            placeholder="Phone"
            type="text"
            maxlength="10"
            pattern="^\d{10}$"
            required
          />
          <Select onValueChange={handleStatusChange} value={newLead.status}>
            <SelectTrigger>
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="New">New</SelectItem>
              <SelectItem value="Contacted">Contacted</SelectItem>
              <SelectItem value="Qualified">Qualified</SelectItem>
              <SelectItem value="Lost">Lost</SelectItem>
              <SelectItem value="Won">Won</SelectItem>
            </SelectContent>
          </Select>
          <Button type="submit">Add Lead</Button>
        </form>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {leads.map((lead) => (
              <TableRow key={lead._id}>
                <TableCell>{lead.name}</TableCell>
                <TableCell>{lead.email}</TableCell>
                <TableCell>{lead.phone}</TableCell>
                <TableCell>{lead.status}</TableCell>
                <TableCell>
                  <Select onValueChange={(value) => handleUpdateStatus(lead._id, value)} defaultValue={lead.status}>
                    <SelectTrigger>
                      <SelectValue placeholder="Update status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="New">New</SelectItem>
                      <SelectItem value="Contacted">Contacted</SelectItem>
                      <SelectItem value="Qualified">Qualified</SelectItem>
                      <SelectItem value="Lost">Lost</SelectItem>
                      <SelectItem value="Won">Won</SelectItem>
                    </SelectContent>
                  </Select>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}