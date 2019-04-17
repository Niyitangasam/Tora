import express from 'express';

import officeController from '../controllers/office.controller';

const router = express.Router();

router.post('/', officeController.createNewOffice);

export default router;