import express from 'express';

import officeController from '../controllers/office.controller';

const router = express.Router();

router.post('/', officeController.createNewOffice);
router.get('/:id/results', officeController.getOfficesResult);

export default router;