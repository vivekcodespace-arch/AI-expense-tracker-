import express from 'express';
import { enableBudget } from '../controllers/budgetController.js';

const router = express.Router();

router.post('/', enableBudget);

export default router;