import express from 'express';
import { getConfirms, createConfirm, updateConfirm, deleteConfirm } from '../controllers/confirm.controller.js';

const router = express.Router();

// Confirms routes
router.get('/confirms', getConfirms);
router.post('/confirms', createConfirm);
router.put('/confirms/:id', updateConfirm);
router.delete('/confirms/:id', deleteConfirm);

export default router;

