import express from 'express';

import Parties from '../controllers/parties.controller';

const router = express.Router();

router.post('/', Parties.createParty);
router.get('/', Parties.allParties);
router.patch('/:id', Parties.editParty);


export default router;