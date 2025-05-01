import express from 'express';
import { addResult, updateResult, deleteResult, getResults } from '../controllers/result.js';
import { protect } from '../middleware/auth.js'; 

const router = express.Router();

router.get('/', getResults);
router.post('/', protect, addResult);
router.put('/:id', protect, updateResult);
router.delete('/:id', protect, deleteResult);

export default router;
