const express = require('express');
const router = express.Router();
const Leave = require('../../models/hr/Leave');

router.get('/', async (req, res) => {
  try {
    const leaves = await Leave.find().populate('employee');
    res.json(leaves);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/', async (req, res) => {
  const leave = new Leave(req.body);
  try {
    const newLeave = await leave.save();
    res.status(201).json(newLeave);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const updatedLeave = await Leave.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedLeave);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;