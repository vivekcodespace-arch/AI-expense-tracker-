import User from '../models/User.js';

export const addMoney = async (req, res) => {
  try {
    const { amount } = req.body;
    let user = await User.findOne();
    if (!user) {
      user = new User();
    }
    user.balance += amount;
    await user.save();
    res.json({ balance: user.balance });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getWallet = async (req, res) => {
  try {
    let user = await User.findOne();
    if (!user) {
      user = new User();
      await user.save();
    }
    res.json({ balance: user.balance });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};