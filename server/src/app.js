const express = require('express');
const cors = require('cors');
const authRoutes = require('../routes/auth');
const productRoutes = require('../routes/products');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);

// Health Check Route
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    message: 'FATAFAT-CHAI Backend is running',
    timestamp: new Date().toISOString()
  });
});

// Root Route
app.get('/', (req, res) => {
  res.send('FATAFAT-CHAI Backend Service');
});

module.exports = app;
