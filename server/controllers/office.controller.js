import OfficeModel from '../models/office.model';

const officeController = {
    getOfficesResult: async (req, res) => {
        const getResultQuery = new OfficeModel(req.params.id);
        if (!await getResultQuery.getResults()) {
          return res.status(500).send({ status: 500, Error: 'Error in getting data' });
        }
        if (getResultQuery.result.length === 0) {
          return res.status(404).send({ status: 404, Error: 'Result not found' });
        }
        return res.status(200).send({ status: 200, data: getResultQuery.result });
      },
    createNewOffice: async (req, res) => {
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
