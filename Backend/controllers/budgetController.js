import User from '../models/User.js';

export const enableBudget = async (req, res) => {
    try {
        const { startDate, endDate, amount } = req.body;
        let user = await User.findOne();
        if (!user) {
            user = new User();
        }
        user.budgets.push({ startDate, endDate, amount });
        await user.save();
        res.status(201).json(user.budgets);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getBudget = async (req, res) => {
    try {
        let user = await User.findOne();

        if (!user) {
            user = new User();
            await user.save();
        }

        res.json({ budget: user.budgets });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};