const express = require('express');
const router = express.Router();
const Compliance = require('../../models/admin/Compliance');

router.get('/', async (req, res) => {
  try {
    const compliances = await Compliance.find();
    res.json(compliances);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/', async (req, res) => {
  const compliance = new Compliance(req.body);
  try {
    const newCompliance = await compliance.save();
    res.status(201).json(newCompliance);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const updatedCompliance = await Compliance.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedCompliance);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    await Compliance.findByIdAndDelete(req.params.id);
    res.json({ message: 'Compliance record deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;