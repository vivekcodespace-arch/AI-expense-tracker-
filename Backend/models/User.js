import mongoose from 'mongoose';

const budgetSchema = new mongoose.Schema({
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  amount: { type: Number, required: true }
});

const userSchema = new mongoose.Schema({
  balance: { type: Number, default: 0 },
  budgets: [budgetSchema]
}, { timestamps: true });

export default mongoose.model('User', userSchema);