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
            return res.status(422)
                .send({
                    status: 422, error: newOffice.error.detail,
                });
        }
        return res.status(201).send({ status: 201, message: 'New office created', data: newOffice.result });
    }
}
export default officeController;
