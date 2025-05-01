// 📁 routes/auth.js
import express from 'express';
import {
  login,
  register,
  verifyPhone,
  resetPassword
} from '../controllers/auth.js';

const authRouter = express.Router();

authRouter.post('/login', login);
authRouter.post('/register', register);
authRouter.post('/verify-phone', verifyPhone);     // ✅ New route to verify phone number
authRouter.post('/reset-password', resetPassword); // ✅ Resets password after phone verification

export default authRouter;
