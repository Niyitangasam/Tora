import express from 'express';

import Parties from '../controllers/parties.controller';
import Auth from '../middlewares/auth';

const router = express.Router();

router.post('/', Auth.verifyToken, Parties.createParty);
router.get('/', Auth.verifyToken,Parties.allParties);
router.delete('/:partyId', Auth.verifyToken, Parties.deleteParty)
router.patch('/:id', Auth.verifyToken,Parties.editParty);



export default router;