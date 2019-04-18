import OfficeModel from '../models/office.model';
import Helper from '../helpers/helper';

const officeMiddleware = {
    areAttibutesValid: (req, res, next) => {
        const result = Helper.validateOffice(req.body);
        if (result.error) {
            return Helper.invalidDataMessage(res, result);
        }
        return next();
    },
    isNameExist: async (req, res, next) => {
        const theOffice = new OfficeModel(req.body.name);
        if(! await theOffice.findByName()){
            return res.status(500).send({
                status: 500,
                error: 'Service is not available'
            })
        }
        if(theOffice.result.length){
            return res.status(304).send({
                status: 304,
                error: 'The same name was registered before'
            })
        }
        return next();
    }
}

export default officeMiddleware;