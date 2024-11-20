import React, { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

function ComplianceManagement() {
  const [compliance, setCompliance] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    type: '',
    expirationDate: '',
    status: 'Active',
    responsiblePerson: '',
    description: '',
    policyLink: '',
  });

  useEffect(() => {
    fetchCompliance();
  }, []);

  const fetchCompliance = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/compliance');
      const data = await response.json();
      setCompliance(data);
    } catch (error) {
      console.error('Error fetching compliance:', error);
    }
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/compliance', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (response.ok) {
        fetchCompliance();
        setFormData({
          name: '',
          type: '',
          expirationDate: '',
          status: 'Active',
          responsiblePerson: '',
          description: '',

          policyLink: '',
        });
      }
    } catch (error) {
      console.error('Error adding compliance:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/compliance/${id}`, {
        method: 'DELETE'
      });
      if (response.ok) {
        fetchCompliance();
      }
    } catch (error) {
      console.error('Error deleting compliance:', error);
    }
  };

  const generateReport = () => {
    // Implement a simple report generation logic or redirect to a report page
    alert('Report generation feature is under construction.');
  };

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Add New Compliance</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input name="name" value={formData.name} onChange={handleInputChange} placeholder="Name" required />
            <Input name="type" value={formData.type} onChange={handleInputChange} placeholder="Type" required />
            <Input name="expirationDate" value={formData.expirationDate} onChange={handleInputChange} type="date" required />
            <Select name="status" value={formData.status} onValueChange={(value) => setFormData({ ...formData, status: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Select Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Active">Active</SelectItem>
                <SelectItem value="Expired">Expired</SelectItem>
                <SelectItem value="Pending Renewal">Pending Renewal</SelectItem>
              </SelectContent>
            </Select>
            <Input name="responsiblePerson" value={formData.responsiblePerson} onChange={handleInputChange} placeholder="Responsible Person" required />
            <Input name="description" value={formData.description} onChange={handleInputChange} placeholder="Description" />
            <Input name="policyLink" value={formData.policyLink} onChange={handleInputChange} placeholder="Policy Document Link" />
            <Button type="submit">Add Compliance</Button>
          </form>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Compliance List</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Expiration Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Responsible Person</TableHead>
                <TableHead>Policy Link</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {compliance.map(item => (
                <TableRow key={item._id}>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.type}</TableCell>
                  <TableCell>{new Date(item.expirationDate).toLocaleDateString()}</TableCell>
                  <TableCell>{item.status}</TableCell>
                  <TableCell>{item.responsiblePerson}</TableCell>
                  <TableCell>{item.policyLink ? <a href={item.policyLink} target="_blank" rel="noopener noreferrer">View Policy</a> : 'N/A'}</TableCell>
                  <TableCell>
                    <Button variant="destructive" onClick={() => handleDelete(item._id)}>Delete</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <div className="mt-4">
            <Button onClick={generateReport}>Generate Compliance Report</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default ComplianceManagement;
