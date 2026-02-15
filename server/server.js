const express = require('express'); const app = express(); app.listen(5000, () => console.log('Server running on port 5000'));
// Route usage\napp.use('/api/auth', require('./routes/auth'));
