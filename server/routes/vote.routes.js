import express from 'express';

import saveVote from '../controllers/vote.controller';

const router = express.Router();

router.post('/', saveVote);

export default router;