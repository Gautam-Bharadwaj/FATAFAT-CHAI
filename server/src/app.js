const express = require('express');
const cors = require('cors');
const authRoutes = require('../routes/auth');
const productRoutes = require('../routes/products');
const cartRoutes = require('../routes/cart');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);

app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    message: 'FATAFAT-CHAI Backend is running',
    timestamp: new Date().toISOString(),
  });
});

app.get('/', (req, res) => {
  res.send('FATAFAT-CHAI Backend Service');
});

module.exports = app;
