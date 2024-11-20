const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// Get all products
router.get('/', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add a new product
router.post('/', async (req, res) => {
  const product = new Product(req.body);
  try {
    const newProduct = await product.save();
    res.status(201).json(newProduct);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update product quantity
router.patch('/:id', async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      { quantity: req.body.quantity },
      { new: true }
    );
    res.json(updatedProduct);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// delete a product
router.delete('/:id', async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: 'Product deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get restock alerts
router.get('/restock-alerts', async (req, res) => {
  try {
    const alerts = await Product.find({ quantity: { $lte: 10 } });
    res.json(alerts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Restock a product
router.post('/:id/restock', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    product.quantity += 50; // Add 50 to the current quantity
    await product.save();
    res.json(product);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get product reports
router.get('/reports', async (req, res) => {
  try {
    const products = await Product.find();

    const stockLevels = products.map(p => ({ name: p.name, quantity: p.quantity }));

    // Simulating sales data (replace with actual sales data in a real application)
    const productPerformance = products.map(p => ({ name: p.name, sales: Math.floor(Math.random() * 100) }));

    const restockingNeeds = products
      .filter(p => p.quantity < p.restockLevel)
      .map(p => ({ name: p.name, neededQuantity: p.restockLevel - p.quantity }));

    res.json({
      stockLevels,
      productPerformance,
      restockingNeeds
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});



module.exports = router;