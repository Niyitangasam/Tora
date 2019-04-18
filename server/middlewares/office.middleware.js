import OfficeModel from '../models/office.model';
import Helper from '../helpers/helper';

const officeMiddleware = {
    areAttibutesValid: (req, res, next) => {
        const officeTypes = ['local', 'state', 'government', 'federal'];
        const result = Helper.validateOffice(req.body);
        if (result.error) {
            return Helper.invalidDataMessage(res, result);
        }
        if(officeTypes.indexOf(req.body.type)===-1){
            return res.status(400).send({
                status: 400,
                error: 'Invalid office type'
            })
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
            return res.status(302).send({
                status: 302,
                error: 'The same name was registered before'
            })
        }
        return next();
    }
}

export default officeMiddleware;
