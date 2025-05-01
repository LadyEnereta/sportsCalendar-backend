// 📁 controllers/auth.js
import Admin from '../models/Admin.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// ✅ Register
export const register = async (req, res) => {
  const { username, password, phone } = req.body;

  try {
    const existing = await Admin.findOne({ username });
    if (existing) {
      return res.status(400).json({ message: 'This role is already registered' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const admin = new Admin({ username, phone, password: hashedPassword });
    await admin.save();

    res.status(201).json({ message: 'Admin registered successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Registration failed', error: err.message });
  }
};

// ✅ Login
export const login = async (req, res) => {
  const { username, password } = req.body;

  const admin = await Admin.findOne({ username });
  if (!admin) return res.status(400).json({ message: 'Invalid credentials' });

  const match = await bcrypt.compare(password, admin.password);
  if (!match) return res.status(400).json({ message: 'Invalid credentials' });

  const token = jwt.sign({ id: admin._id, username: admin.username }, process.env.JWT_SECRET, {
    expiresIn: '1h',
  });

  res.json({ token });
};

// ✅ Verify phone exists and allow password reset
export const verifyPhone = async (req, res) => {
  const { phone } = req.body;

  try {
    const admin = await Admin.findOne({ phone });
    if (!admin) {
      return res.status(404).json({ message: 'Phone number not found' });
    }

    // You may send a code or just allow password reset (simplified here)
    res.json({ message: 'Phone verified. Proceed to reset password.' });
  } catch (err) {
    res.status(500).json({ message: 'Error verifying phone', error: err.message });
  }
};

// ✅ Reset password using phone
export const resetPassword = async (req, res) => {
  const { phone, newPassword } = req.body;

  try {
    const admin = await Admin.findOne({ phone });
    if (!admin) {
      return res.status(404).json({ message: 'Phone number not found' });
    }

    const hashed = await bcrypt.hash(newPassword, 10);
    admin.password = hashed;
    await admin.save();

    res.json({ message: 'Password reset successful. Please log in.' });
  } catch (err) {
    res.status(500).json({ message: 'Password reset failed', error: err.message });
  }
};
