const express = require('express');
const router = express.Router();
const hrController = require('../../controllers/hrController');

// Employee routes
router.get('/employees', hrController.getEmployees);
router.post('/employees', hrController.addEmployee);
router.put('/employees/:id', hrController.updateEmployee);
router.delete('/employees/:id', hrController.deleteEmployee);

// Attendance routes
router.get('/attendance', hrController.getAttendance);
router.post('/attendance', hrController.markAttendance);

// Leave routes
router.get('/leaves', hrController.getLeaves);
router.post('/leaves', hrController.requestLeave);
router.put('/leaves/:id', hrController.updateLeaveStatus);

// Payroll routes
router.get('/payroll', hrController.getPayroll);
router.post('/payroll/generate', hrController.generatePayroll);

module.exports = router;