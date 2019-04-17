import OfficeModel from '../models/office.model';
import Helper from '../helpers/helper';

const officeController = {
    createNewOffice: async (req, res) => {
        const result = Helper.validateOffice(req.body);
        if (result.error) {
            return Helper.invalidDataMessage(res, result);
        }

        const newOffice = new OfficeModel(req.body);
        if (!await newOffice.createOffice()) {
            return res.status(422).send({
                    status: 422,
                    error: newOffice.error.detail,
                });
        }
        return res.status(201).send({ status: 201, message: 'New office created', data: newOffice.result });
    },
    getAllOffices: async (req, res) => {
        const office = new OfficeModel(null);
        if(!await office.findAll()){
            return res.status(500).send({
                status: 500,
                error: 'Service not available',
            });
        }
        if(!office.result.length){
            return res.status(404).send({
                status: 404,
                error: 'No office found',
            });
        }
        return res.status(200).json({
            status: 200,
            message: 'List of offices',
            data: office.result,
        });
    }
}
export default officeController;
