// models/loans.js
import Loan from './loanSchema.js';

class loansModel {
  async create(data) {
    const loan = new Loan(data);
    return await loan.save();
  }

  async getAll() {
    return await Loan.find();
  }

  async getByUserId(user_id) {
    return await Loan.find({ user_id });
  }

  async getOneById(id) {
    return await Loan.findById(id);
  }

  async updateStatus(id, newStatus) {
    return await Loan.findByIdAndUpdate(
      id,
      { status: newStatus },
      { new: true }
    );
  }

  async delete(id) {
    return await Loan.findByIdAndDelete(id);
  }
  
  async updateStatus(id, newStatus) {
    return await Loan.findByIdAndUpdate(
      id,
      { status: newStatus },
      { new: true }
    );
  }
  
  async getActiveByUser(user_id) {
    return await Loan.find({ user_id: user_id, status: "active" });
  }
}

export default new loansModel();
