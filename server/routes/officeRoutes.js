import express from 'express';

import officeController from '../controllers/officeController';

const router = express.Router();

router.post('/', officeController.createNewOffice);

export default router;