module.exports = (req, res, next) => { if (!req.header('x-auth-token')) return res.status(401).send('Access denied'); next(); };
// Middleware prevents unauthorized access
