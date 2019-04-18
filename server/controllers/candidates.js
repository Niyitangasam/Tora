import Helper from '../helpers/helper';
import candidates from '../models/candidates';
import dbCon from '../config/connection';

const candidat = {
    async saveCandidate(req, res) {
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
    },
    
        async partyCandidate(req, res) {
        const sql = `SELECT * FROM candidates WHERE party_id = ${req.params.partyId}`;
        try{
            const { rows } = await dbCon.query(sql);
            if(rows.length<=0){
                return res.status(404).send({status:404, message:"there are no candidates in this party"});
            }
            return res.status(200).send({status:200, rows});
        }
        catch(error){
            res.status(404).send(error);
        }
    }
}

export default candidat;