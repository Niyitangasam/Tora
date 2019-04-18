import express from 'express';

import Parties from '../controllers/parties.controller';

const router = express.Router();

router.post('/', Parties.createParty);
router.get('/', Parties.allParties);
router.delete('/:partyId', Parties.deleteParty)


export default router;