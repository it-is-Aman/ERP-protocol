const express = require('express');
const router = express.Router();
const Employee = require('../../models/hr/Employee');
const Payroll = require('../../models/hr/Payroll');

router.get('/', async (req, res) => {
  try {
    const payroll = await Payroll.find().populate('employee');
    res.json(payroll);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get payroll records for a specific employee
router.get('/:employeeId', async (req, res) => {
  try {
    const payrolls = await Payroll.find({ employee: req.params.employeeId })
      .populate('employee', 'name') // Populate employee name
      .exec();

    if (!payrolls || payrolls.length === 0) {
      return res.status(404).json({ message: 'No payroll records found for this employee' });
    }

    return res.json(payrolls); // Return the payroll data
  } catch (error) {
    console.error('Error fetching payroll:', error);
    return res.status(500).json({ message: 'Server error' });
  }
});

router.post('/', async (req, res) => {
  const { employee: employeeId, month, year } = req.body;

  try {
    // Fetch the employee details
    const employee = await Employee.findById(employeeId);
    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }

    // Extract the Basic Salary from the employee
    const basicSalary = employee.salary;

    // Calculate Deductions (you can modify this logic as per your requirements)
    const taxDeduction = basicSalary * 0.15; // Assuming 15% tax
    const leaveDeduction = 200; // Flat amount deduction for leaves
    const totalDeductions = taxDeduction + leaveDeduction;

    // Calculate Net Salary
    const netSalary = basicSalary - totalDeductions;

    // Create a new Payroll document
    const newPayroll = new Payroll({
      employee: employeeId,
      month,
      year,
      basicSalary,
      overtime: 0, // Initialize overtime, you can modify based on logic
      deductions: {
        tax: taxDeduction,
        leave: leaveDeduction,
      },
      netSalary,
    });

    // Save the payroll document
    await newPayroll.save();

    return res.status(201).json(newPayroll);
  } catch (error) {
    console.error('Error generating payroll:', error);
    return res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;