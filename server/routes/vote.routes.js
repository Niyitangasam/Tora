import express from 'express';

import saveVote from '../controllers/vote.controller';
import Auth from '../middlewares/auth';

const router = express.Router();

router.post('/', Auth.verifyToken, saveVote);

export default router;