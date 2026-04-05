const User = require('../models/User');
const {
  signToken,
  hashPassword,
  comparePassword,
} = require('../utils/authUtils');

async function register(req, res) {
  try {
    const { email, password, name } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: 'Email and password are required' });
    }
    const existing = await User.findOne({ email: email.toLowerCase() });
    if (existing) {
      return res.status(409).json({ message: 'Email already registered' });
    }
    const hashed = await hashPassword(password);
    const user = await User.create({
      email: email.toLowerCase(),
      password: hashed,
      name: name || '',
      role: 'user',
    });
    const token = signToken({ userId: user._id.toString(), role: user.role });
    return res.status(201).json({
      token,
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
    });
  } catch {
    return res.status(500).json({ message: 'Registration failed' });
  }
}

async function login(req, res) {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: 'Email and password are required' });
    }
    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    const ok = await comparePassword(password, user.password);
    if (!ok) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    const token = signToken({ userId: user._id.toString(), role: user.role });
    return res.json({
      token,
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
    });
  } catch {
    return res.status(500).json({ message: 'Login failed' });
  }
}

module.exports = { register, login };
