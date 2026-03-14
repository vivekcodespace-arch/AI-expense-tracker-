import express from 'express';
import { enableBudget ,getBudget} from '../controllers/budgetController.js';

const router = express.Router();

router.post('/', enableBudget);
router.get('/' , getBudget);

export default router;