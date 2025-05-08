import express from 'express';
const route = express.Router();
import loansController from '../controllers/loans.js';
import loansModel from '../models/loans.js';

route.post('/', loansController.create);
route.get('/',loansController.getAll);
route.get('/:id', async (req, res) => {
    try {
      const loan = await loansModel.getOneById(req.params.id);
      if (!loan) return res.status(404).json({ error: "Préstamo no encontrado" });
      res.json(loan);
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  });
  
route.put('/:id', async (req, res) => {
    try {
      const updated = await loansModel.updateStatus(req.params.id, req.body.status);
      if (!updated) return res.status(404).json({ error: 'Préstamo no encontrado' });
      res.json(updated);
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  });
route.get('/user/:user_id/active', async (req, res) => {
try {
    const data = await loansModel.getActiveByUser(req.params.user_id);
    res.json(data);
} catch (e) {
    res.status(500).json({ error: e.message });
}
});
  


export default route;