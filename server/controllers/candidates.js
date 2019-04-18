import Helper from '../helpers/helper';
import candidates from '../models/candidates';

const saveCandidate = async (req, res) => {
    if(req.user.role !== true){
        res.status(404).send({message: "user not admin"});
    }

    const candidate = {
        officeId: req.params.officeId,
        partyId: req.body.partyId,
        userId: req.body.userId
    };

    const result = Helper.validateCandidate(candidate);
    if(result.error){
        return Helper.invalidDataMessage(res, result);
    }

    const createCandidate = new candidates(candidate);
    if(!await createCandidate.createcandidate()){
        return res.status(404).send({
            status: 404, error: createCandidate.error.detail,
        });
    }
    return res.status(201).send({status: 201, message: 'candidate created', data: createCandidate.result});
};

export default saveCandidate;