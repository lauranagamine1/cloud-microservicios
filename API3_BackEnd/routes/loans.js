import express from 'express';
const router = express.Router();
import loansController from '../controllers/loans.js';
import loansModel from '../models/loans.js';

/**
 * @openapi
 * components:
 *   schemas:
 *     Loan:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: ID del préstamo en MongoDB
 *         user_id:
 *           type: string
 *           description: ID del usuario que toma el préstamo
 *         book_id:
 *           type: string
 *           description: ID del libro prestado
 *         loan_date:
 *           type: string
 *           format: date-time
 *           description: Fecha del préstamo
 *         return_date:
 *           type: string
 *           format: date-time
 *           description: Fecha de devolución
 *         status:
 *           type: string
 *           enum:
 *             - active
 *             - returned
 *             - overdue
 *           description: Estado del préstamo
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Fecha de creación del documento
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: Fecha de última actualización del documento
 */

/**
 * @openapi
 * tags:
 *   name: Loans
 *   description: Gestión de préstamos
 */

/**
 * @openapi
 * /loans:
 *   post:
 *     tags: [Loans]
 *     summary: Crea un nuevo préstamo
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user_id:
 *                 type: string
 *               book_id:
 *                 type: string
 *             required:
 *               - user_id
 *               - book_id
 *     responses:
 *       201:
 *         description: Préstamo creado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Loan'
 *       400:
 *         description: Datos inválidos
 */
router.post('/', loansController.create);

/**
 * @openapi
 * /loans:
 *   get:
 *     tags: [Loans]
 *     summary: Lista todos los préstamos
 *     responses:
 *       200:
 *         description: Array de préstamos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Loan'
 */
router.get('/', loansController.getAll);

/**
 * @openapi
 * /loans/{id}:
 *   get:
 *     tags: [Loans]
 *     summary: Obtiene un préstamo por su ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del préstamo
 *     responses:
 *       200:
 *         description: Préstamo encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Loan'
 *       404:
 *         description: Préstamo no encontrado
 */
router.get('/:id', async (req, res) => {
  try {
    const loan = await loansModel.getOneById(req.params.id);
    if (!loan) return res.status(404).json({ error: "Préstamo no encontrado" });
    res.json(loan);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

/**
 * @openapi
 * /loans/{id}:
 *   put:
 *     tags: [Loans]
 *     summary: Actualiza el estado de un préstamo
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del préstamo
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *                 enum: [active, returned, overdue]
 *     responses:
 *       200:
 *         description: Préstamo actualizado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Loan'
 *       404:
 *         description: Préstamo no encontrado
 */
router.put('/:id', async (req, res) => {
  try {
    const updated = await loansModel.updateStatus(req.params.id, req.body.status);
    if (!updated) return res.status(404).json({ error: 'Préstamo no encontrado' });
    res.json(updated);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

/**
 * @openapi
 * /loans/user/{user_id}/active:
 *   get:
 *     tags: [Loans]
 *     summary: Obtiene préstamos activos de un usuario
 *     parameters:
 *       - in: path
 *         name: user_id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del usuario
 *     responses:
 *       200:
 *         description: Array de préstamos activos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Loan'
 */
router.get('/user/:user_id/active', async (req, res) => {
  try {
    const data = await loansModel.getActiveByUser(req.params.user_id);
    res.json(data);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

export default router;