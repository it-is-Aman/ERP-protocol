import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

function PayrollManagement() {
  const [payroll, setPayroll] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [formData, setFormData] = useState({ employee: '', month: '', year: new Date().getFullYear() });

  useEffect(() => {
    fetchEmployees();
  }, []);

  useEffect(() => {
    if (formData.employee) {
      fetchPayroll(formData.employee);
    }
  }, [formData.employee]);

  const fetchPayroll = async (employeeId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/payroll/${employeeId}`);
      const data = await response.json();
      setPayroll(data);
    } catch (error) {
      console.error('Error fetching payroll:', error);
    }
  };

  const fetchEmployees = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/employees');
      const data = await response.json();
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
      const response = await fetch('http://localhost:5000/api/payroll', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (response.ok) {
        fetchPayroll(formData.employee);  // Fetch updated payroll after submission
        setFormData({ employee: '', month: '', year: new Date().getFullYear() });
      }
    } catch (error) {
      console.error('Error generating payroll:', error);
    }
  };

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold tracking-tight">Payroll Management</h1>
      <Card>
        <CardHeader>
          <CardTitle>Generate Payroll</CardTitle>
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
            <Input name="month" value={formData.month} onChange={handleInputChange} type="number" min="1" max="12" placeholder="Month" required />
            <Input name="year" value={formData.year} onChange={handleInputChange} type="number" placeholder="Year" required />
            <Button type="submit">Generate Payroll</Button>
          </form>
        </CardContent>
      </Card>

      {payroll.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Payroll Records</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Employee</TableHead>
                  <TableHead>Month</TableHead>
                  <TableHead>Year</TableHead>
                  <TableHead>Basic Salary</TableHead>
                  <TableHead>Overtime</TableHead>
                  <TableHead>Deductions</TableHead>
                  <TableHead>Net Salary</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {payroll.map((record) => (
                  <TableRow key={record._id}>
                    <TableCell>{record.employee.name}</TableCell>
                    <TableCell>{record.month}</TableCell>
                    <TableCell>{record.year}</TableCell>
                    <TableCell>${record.basicSalary.toFixed(2)}</TableCell>
                    <TableCell>${record.overtime.toFixed(2)}</TableCell>
                    <TableCell>${(record.deductions.tax + record.deductions.leave).toFixed(2)}</TableCell>
                    <TableCell>${record.netSalary.toFixed(2)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

export default PayrollManagement;
