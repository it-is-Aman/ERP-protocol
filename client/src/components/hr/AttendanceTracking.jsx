import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

function AttendanceTracking() {
  // State for attendance records and form data
  const [attendance, setAttendance] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [formData, setFormData] = useState({
    employee: '',
    date: '',
    status: 'Present',
    checkIn: '',
    checkOut: '',
    overtime: 0
  });

  // Fetch attendance records and employees when the component mounts
  useEffect(() => {
    fetchAttendance();
    fetchEmployees();
  }, []);

  // Fetch existing attendance records from the server
  const fetchAttendance = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/attendance');
      const data = await response.json();
      setAttendance(data);
    } catch (error) {
      console.error('Error fetching attendance:', error);
    }
  };

  // Fetch the list of employees from the server
  const fetchEmployees = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/employees');
      const data = await response.json();
      setEmployees(data);
    } catch (error) {
      console.error('Error fetching employees:', error);
    }
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission to post attendance data
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Convert the time values to Date objects
    const date = new Date(formData.date); // Use the date part from the form
    const checkIn = new Date(date.setHours(formData.checkIn.split(':')[0], formData.checkIn.split(':')[1])); // Set the hours and minutes
    const checkOut = new Date(date.setHours(formData.checkOut.split(':')[0], formData.checkOut.split(':')[1])); // Set the hours and minutes

    // Prepare the data with Date objects
    const updatedFormData = {
      ...formData,
      checkIn: checkIn,
      checkOut: checkOut,
    };

    try {
      const response = await fetch('http://localhost:5000/api/attendance', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedFormData),
      });
      if (response.ok) {
        fetchAttendance();
        setFormData({ employee: '', date: '', status: 'Present', checkIn: '', checkOut: '', overtime: 0 });
      }
    } catch (error) {
      console.error('Error marking attendance:', error);
    }
  };

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold tracking-tight">Attendance Tracking</h1>

      {/* Form to mark attendance */}
      <Card>
        <CardHeader>
          <CardTitle>Mark Attendance</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Employee selection dropdown */}
            <Select
              name="employee"
              value={formData.employee}
              onValueChange={(value) => setFormData({ ...formData, employee: value })}
              required
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Employee" />
              </SelectTrigger>
              <SelectContent>
                {Array.isArray(employees) && employees.map(employee => (
                  <SelectItem key={employee._id} value={employee._id}>
                    {employee.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Date input */}
            <Input
              name="date"
              value={formData.date}
              onChange={handleInputChange}
              type="date"
              required
            />

            {/* Status selection dropdown */}
            <Select
              name="status"
              value={formData.status}
              onValueChange={(value) => setFormData({ ...formData, status: value })}
              required
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Present">Present</SelectItem>
                <SelectItem value="Absent">Absent</SelectItem>
                <SelectItem value="Half Day">Half Day</SelectItem>
              </SelectContent>
            </Select>

            {/* Check-in and Check-out inputs */}
            <Input
              name="checkIn"
              value={formData.checkIn}
              onChange={handleInputChange}
              type="time"
            />
            <Input
              name="checkOut"
              value={formData.checkOut}
              onChange={handleInputChange}
              type="time"
            />

            {/* Overtime input */}
            <Input
              name="overtime"
              value={formData.overtime}
              onChange={handleInputChange}
              type="number"
              placeholder="Overtime (hours)"
            />

            {/* Submit button */}
            <Button type="submit">Mark Attendance</Button>
          </form>
        </CardContent>
      </Card>

      {/* Table displaying attendance records */}
      <Card>
        <CardHeader>
          <CardTitle>Attendance Records</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Employee</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Check In</TableHead>
                <TableHead>Check Out</TableHead>
                <TableHead>Overtime</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {Array.isArray(attendance) && attendance.map(record => (
                <TableRow key={record._id}>
                  <TableCell>{record.employee?.name || 'N/A'}</TableCell>
                  <TableCell>{new Date(record.date).toLocaleDateString()}</TableCell>
                  <TableCell>{record.status}</TableCell>
                  <TableCell>{record.checkIn ? new Date(record.checkIn).toLocaleTimeString() : 'N/A'}</TableCell>
                  <TableCell>{record.checkOut ? new Date(record.checkOut).toLocaleTimeString() : 'N/A'}</TableCell>
                  <TableCell>{record.overtime}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}

export default AttendanceTracking;
