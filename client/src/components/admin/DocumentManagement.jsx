import React, { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";

function DocumentManagement() {
  const [documents, setDocuments] = useState([]);
  const [formData, setFormData] = useState({ title: '', type: '', content: '', accessibleTo: [], file: null });

  useEffect(() => {
    fetchDocuments();
  }, []);

  const fetchDocuments = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/documents');
      const data = await response.json();
      setDocuments(data);
    } catch (error) {
      console.error('Error fetching documents:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'file') {
      // Handle file input
      setFormData({ ...formData, file: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleAccessibleToChange = (e) => {
    const departments = Array.from(e.target.selectedOptions, option => option.value);
    setFormData({ ...formData, accessibleTo: departments });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataObj = new FormData();
    formDataObj.append('title', formData.title);
    formDataObj.append('type', formData.type);
    formDataObj.append('content', formData.content);
    formDataObj.append('file', formData.file); // Add the file to FormData
    formData.accessibleTo.forEach(department => formDataObj.append('accessibleTo', department));

    try {
      const response = await fetch('http://localhost:5000/api/documents', {
        method: 'POST',
        body: formDataObj, // FormData for multipart/form-data
      });
      if (response.ok) {
        fetchDocuments();
        setFormData({ title: '', type: '', content: '', accessibleTo: [], file: null });
      }
    } catch (error) {
      console.error('Error adding document:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/documents/${id}`, {
        method: 'DELETE'
      });
      if (response.ok) {
        fetchDocuments();
      }
    } catch (error) {
      console.error('Error deleting document:', error);
    }
  };

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Add New Document</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input name="title" value={formData.title} onChange={handleInputChange} placeholder="Title" required />
            <Input name="type" value={formData.type} onChange={handleInputChange} placeholder="Type" required />
            <Input
              name="file"
              type="file"
              onChange={handleInputChange}
              required
            />
            <Textarea name="content" value={formData.content} onChange={handleInputChange} placeholder="Content" required />
            <select name="accessibleTo" multiple value={formData.accessibleTo} onChange={handleAccessibleToChange} className="w-full p-2 border rounded">
              <option value="HR">HR</option>
              <option value="Finance">Finance</option>
              <option value="Legal">Legal</option>
              <option value="Sales">Sales</option>
              <option value="Product">Product</option>
            </select>
            <Button type="submit">Add Document</Button>
          </form>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Document List</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Uploaded By</TableHead>
                <TableHead>Upload Date</TableHead>
                <TableHead>Accessible To</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {documents.map(doc => (
                <TableRow key={doc._id}>
                  <TableCell>{doc.title}</TableCell>
                  <TableCell>{doc.type}</TableCell>
                  <TableCell>{doc.uploadedBy}</TableCell>
                  <TableCell>{new Date(doc.uploadDate).toLocaleDateString()}</TableCell>
                  <TableCell>{doc.accessibleTo.join(', ')}</TableCell>
                  <TableCell className="flex gap-2">
                    <Button onClick={() => window.open(`http://localhost:5000/uploads/${doc.filename}`, '_blank')}>
                      View
                    </Button>
                    <Button variant="destructive" onClick={() => handleDelete(doc._id)}>Delete</Button>
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

export default DocumentManagement;
