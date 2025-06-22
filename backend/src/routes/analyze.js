import express from 'express';
import { analyzeCode } from '../controllers/analyzeController.js';

const router = express.Router();

// POST /api/analyze
router.post('/analyze', analyzeCode);

export default router;