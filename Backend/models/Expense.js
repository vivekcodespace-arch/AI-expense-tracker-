import mongoose from 'mongoose';

const expenseSchema = new mongoose.Schema({
  item: { type: String, required: true },
  date: { type: Date, required: true },
  time: { type: String, required: true },
  cost: { type: Number, required: true },
  description: { type: String, default: '' }
}, { timestamps: true });

export default mongoose.model('Expense', expenseSchema);