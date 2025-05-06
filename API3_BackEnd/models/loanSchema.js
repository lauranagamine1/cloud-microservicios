// models/loanSchema.js
import mongoose from "mongoose";

const loanSchema = new mongoose.Schema({
  user_id: { type: String, required: true },
  book_id: { type: String, required: true },
  loan_date: { type: Date, required: true },
  return_date: { type: Date, required: true },
  status: {
    type: String,
    enum: ["active", "returned", "overdue"],
    default: "active"
  }
}, { timestamps: true }); // agrega createdAt y updatedAt automáticamente

const Loan = mongoose.model("loan", loanSchema, "loan"); // minúscula
export default Loan;
