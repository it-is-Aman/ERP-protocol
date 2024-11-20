import React, { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

function ResourceManagement() {
  const [resources, setResources] = useState([]);
  const [formData, setFormData] = useState({ name: '', type: '', quantity: '', location: '', minimumQuantity: '' });

  useEffect(() => {
    fetchResources();
  }, []);

  const fetchResources = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/resources');
      const data = await response.json();
      setResources(data);
    } catch (error) {
      console.error('Error fetching resources:', error);
    }
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/resources', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (response.ok) {
        fetchResources();
        setFormData({ name: '', type: '', quantity: '', location: '', minimumQuantity: '' });
      }
    } catch (error) {
      console.error('Error adding resource:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/resources/${id}`, {
        method: 'DELETE'
      });
      if (response.ok) {
        fetchResources();
      }
    } catch (error) {
      console.error('Error deleting resource:', error);
    }
  };

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Add New Resource</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input name="name" value={formData.name} onChange={handleInputChange} placeholder="Name" required />
            <Input name="type" value={formData.type} onChange={handleInputChange} placeholder="Type" required />
            <Input name="quantity" value={formData.quantity} onChange={handleInputChange} placeholder="Quantity" required type="number" />
            <Input name="location" value={formData.location} onChange={handleInputChange} placeholder="Location" required />
            <Input name="minimumQuantity" value={formData.minimumQuantity} onChange={handleInputChange} placeholder="Minimum Quantity" required type="number" />
            <Button type="submit">Add Resource</Button>
          </form>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Resource List</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Quantity</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Minimum Quantity</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {resources.map(resource => (
                <TableRow key={resource._id}>
                  <TableCell>{resource.name}</TableCell>
                  <TableCell>{resource.type}</TableCell>
                  <TableCell>{resource.quantity}</TableCell>
                  <TableCell>{resource.location}</TableCell>
                  <TableCell>{resource.minimumQuantity}</TableCell>
                  <TableCell>
                    <Button variant="destructive" onClick={() => handleDelete(resource._id)}>Delete</Button>
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

export default ResourceManagement;