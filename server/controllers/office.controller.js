import OfficeModel from '../models/office.model';
import Helper from '../helpers/helper';

const officeController = {
    getOfficesResult: async (req, res) => {
        const getResultQuery = new OfficeModel(req.params.id);
        if (!await getResultQuery.getResults()) {
          return res.status(500).send({ status: 500, Error: 'Error in getting data' });
        }
        if (getResultQuery.result.length === 0) {
          return res.status(404).send({ status: 404, Error: 'Offices not found' });
        }
        return res.status(200).send({ status: 200, data: getResultQuery.result });
      },
    createNewOffice: async (req, res) => {
        const result = Helper.validateOffice(req.body);
        if (result.error) {
            return Helper.invalidDataMessage(res, result);
        }

        const newOffice = new OfficeModel(req.body);
        if (!await newOffice.createOffice()) {
            return res.status(422)
                .send({
                    status: 422, error: newOffice.error.detail,
                });
        }
        return res.status(201).send({ status: 201, message: 'New office created', data: newOffice.result });
    },

 
};




export default officeController;
