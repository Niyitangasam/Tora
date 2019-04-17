import express from 'express';

import officeController from '../controllers/office.controller';

const router = express.Router();

router.post('/', officeController.createNewOffice);
router.get('/', officeController.getAllOffices);

export default router;