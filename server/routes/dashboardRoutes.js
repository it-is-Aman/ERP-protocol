const express = require('express');
const router = express.Router();
const Employee = require('../models/hr/Employee');
const Attendance = require('../models/hr/Attendance');
const Resource = require('../models/admin/Resource');
const Compliance = require('../models/admin/Compliance');
const Transaction = require('../models/sales/Transaction');
const Opportunity = require('../models/sales/Opportunity');
const Product = require('../models/Product');

router.get('/', async (req, res) => {
    try {
        // HR data
        const totalEmployees = await Employee.countDocuments();
        const today = new Date().toISOString().split('T')[0];
        const totalAttendance = await Attendance.countDocuments({ date: today });
        const attendanceRate = Math.round((totalAttendance / totalEmployees) * 100);

        // Admin data
        const totalResources = await Resource.countDocuments();
        const pendingCompliances = await Compliance.countDocuments({ status: 'Pending' });

        // Sales data
        const totalRevenue = await Transaction.aggregate([
            { $group: { _id: null, total: { $sum: "$amount" } } }
        ]);
        const openOpportunities = await Opportunity.countDocuments({ stage: { $nin: ['Closed Won', 'Closed Lost'] } });

        // Product data
        const totalProducts = await Product.countDocuments();
        const lowStockItems = await Product.countDocuments({ quantity: { $lte: 10 } });

        res.json({
            hr: {
                totalEmployees,
                attendanceRate
            },
            admin: {
                totalResources,
                pendingCompliances
            },
            sales: {
                totalRevenue: totalRevenue[0]?.total || 0,
                openOpportunities
            },
            product: {
                totalProducts,
                lowStockItems
            }
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;