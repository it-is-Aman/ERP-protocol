const express = require('express');
const router = express.Router();
const Lead = require('../models/sales/Lead');
const Opportunity = require('../models/sales/Opportunity');
const Transaction = require('../models/sales/Transaction');

// Lead Management Routes
router.get('/leads', async (req, res) => {
  try {
    const leads = await Lead.find();
    res.json(leads);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/leads', async (req, res) => {
  const lead = new Lead(req.body);
  try {
    const newLead = await lead.save();
    res.status(201).json(newLead);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.patch('/leads/:id', async (req, res) => {
  try {
    const updatedLead = await Lead.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedLead);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Sales Pipeline Routes
router.get('/opportunities', async (req, res) => {
  try {
    const opportunities = await Opportunity.find();
    res.json(opportunities);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/opportunities', async (req, res) => {
  const opportunity = new Opportunity(req.body);
  try {
    const newOpportunity = await opportunity.save();
    res.status(201).json(newOpportunity);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.patch('/opportunities/:id', async (req, res) => {
  try {
    const updatedOpportunity = await Opportunity.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedOpportunity);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Revenue Management Routes
router.get('/transactions', async (req, res) => {
  try {
    const transactions = await Transaction.find().sort({ date: -1 });
    res.json(transactions);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/transactions', async (req, res) => {
  const transaction = new Transaction(req.body);
  try {
    const newTransaction = await transaction.save();
    res.status(201).json(newTransaction);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Sales Reporting Routes
router.get('/reports', async (req, res) => {
  try {
    // Monthly Sales
    const monthlySales = await Transaction.aggregate([
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m", date: "$date" } },
          value: { $sum: "$amount" }
        }
      },
      { $sort: { _id: 1 } },
      { $project: { month: "$_id", value: 1, _id: 0 } }
    ]);

    // Sales by Stage
    const salesByStage = await Opportunity.aggregate([
      {
        $group: {
          _id: "$stage",
          value: { $sum: "$value" }
        }
      },
      { $project: { stage: "$_id", value: 1, _id: 0 } }
    ]);

    // Top Salespeople (simulated data - replace with actual data in a real application)
    const topSalespeople = [
      { name: "John Doe", sales: 50000 },
      { name: "Jane Smith", sales: 45000 },
      { name: "Bob Johnson", sales: 40000 },
      { name: "Alice Brown", sales: 35000 },
      { name: "Charlie Davis", sales: 30000 }
    ];

    res.json({
      monthlySales,
      salesByStage,
      topSalespeople
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;