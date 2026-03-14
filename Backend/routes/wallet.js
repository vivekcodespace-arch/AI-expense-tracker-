import express from 'express';
import { addMoney, getWallet } from '../controllers/walletController.js';

const router = express.Router();

router.post('/add', addMoney);
router.get('/', getWallet);

export default router;