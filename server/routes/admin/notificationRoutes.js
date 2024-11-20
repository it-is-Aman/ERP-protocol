const express = require('express');
const router = express.Router();
const Notification = require('../../models/admin/Notification');

router.get('/', async (req, res) => {
  try {
    const notifications = await Notification.find().sort({ date: -1 });
    res.json(notifications);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/', async (req, res) => {
  const notification = new Notification(req.body);
  try {
    const newNotification = await notification.save();
    res.status(201).json(newNotification);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const updatedNotification = await Notification.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedNotification);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    await Notification.findByIdAndDelete(req.params.id);
    res.json({ message: 'Notification deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;