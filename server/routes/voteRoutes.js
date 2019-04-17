import express from 'express';

import saveVote from '../controllers/voteController.js';

const router = express.Router();

router.post('/', saveVote);

export default router;