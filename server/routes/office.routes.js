import express from 'express';

import officeController from '../controllers/office.controller';
import officeMiddleware from '../middlewares/office.middleware';

const router = express.Router();

router.post('/', officeMiddleware.areAttibutesValid, officeMiddleware.isNameExist, officeController.createNewOffice);
router.get('/:id/results', officeController.getOfficesResult);
router.get('/', officeController.getAllOffices);

export default router;