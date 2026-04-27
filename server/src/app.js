const express = require('express');
const cors = require('cors');
const authRoutes = require('../routes/auth');
const productRoutes = require('../routes/products');
const cartRoutes = require('../routes/cart');

const app = express();

const path = require('path');

app.use(cors());
app.use(express.json());

// API Routes
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

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  const clientBuildPath = path.join(__dirname, '../../client/dist');
  app.use(express.static(clientBuildPath));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(clientBuildPath, 'index.html'));
  });
} else {
  app.get('/', (req, res) => {
    res.send('FATAFAT-CHAI Backend Service');
  });
}

module.exports = app;
