// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.Vite_PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());


app.use('/uploads', express.static('uploads'));


// Connect to MongoDB
mongoose.connect(process.env.Vite_MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Routes for HR Module
app.use('/api/employees', require('./routes/hr/employeeRoutes'));
app.use('/api/attendance', require('./routes/hr/attendanceRoutes'));
app.use('/api/leaves', require('./routes/hr/leaveRoutes'));
app.use('/api/payroll', require('./routes/hr/payrollRoutes'));

// Routes for Admin/Legal Module
app.use('/api/resources', require('./routes/admin/resourceRoutes'));
app.use('/api/compliance', require('./routes/admin/complianceRoutes'));
app.use('/api/documents', require('./routes/admin/documentRoutes'));
app.use('/api/notifications', require('./routes/admin/notificationRoutes'));


// New route for Product Module
app.use('/api/products', require('./routes/productRoutes'));

// New route for Sales Module
app.use('/api/sales', require('./routes/salesRoutes'));

// New route for dashboard stats
app.use('/api/dashboard', require('./routes/dashboardRoutes'));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));