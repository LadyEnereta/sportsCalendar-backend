import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import fixtureRoutes from './routes/Fixture.js';
import authRoutes from './routes/auth.js';
import sportTypeRoutes from './routes/sportType.js';
import resultRoutes from './routes/Result.js';


dotenv.config();
connectDB();

const app = express();

app.use(cors({
    origin: "https://le-sport-calendar-frontend.vercel.app/", // Replace with your actual Vercel URL
    credentials: true
  }));
  
app.use(express.json());

app.use('/api/fixtures', fixtureRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/sport-types', sportTypeRoutes);
app.use('/api/results', resultRoutes);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
