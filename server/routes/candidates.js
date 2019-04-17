import express from 'express';
import candidates from '../controllers/candidates';

const router = express.Router();

router.post('/candidate/:officeId/register', candidates);

export default router;