import express from 'express';
const route = express.Router();
import loansController from '../controllers/loans.js';

route.post('/', loansController.create);
route.get('/',loansController.getAll);
route.get('/:id',loansController.getOne);

export default route;