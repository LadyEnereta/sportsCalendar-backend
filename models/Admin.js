// 📁 models/Admin.js
import mongoose from 'mongoose';

const adminSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: { type: String, required: true, unique: true } // Phone used for password reset verification
}, { timestamps: true });

export default mongoose.model('Admin', adminSchema);
