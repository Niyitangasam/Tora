import express from 'express';
import candidates from '../controllers/candidates';
import Auth from '../middlewares/auth';

const router = express.Router();
router.post('/candidate/:officeId/register', Auth.verifyToken, candidates.saveCandidate);
router.get('/candidates/:partyId', Auth.verifyToken, candidates.partyCandidate);

export default router;