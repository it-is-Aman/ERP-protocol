const express = require('express');
const router = express.Router();
const Attendance = require('../../models/hr/Attendance');

router.get('/', async (req, res) => {
  try {
    const attendance = await Attendance.find().populate('employee');
    res.json(attendance);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/', async (req, res) => {
  console.log('Incoming request body:', req.body); // Log the request body
  const attendance = new Attendance(req.body);
  try {
    const newAttendance = await attendance.save();
    res.status(201).json(newAttendance);
  } catch (err) {
    console.error('Error saving attendance:', err.message); // Log the error
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;