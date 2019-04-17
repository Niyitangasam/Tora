import Helper from '../helpers/helper';
import ModelVote from '../models/vote.model';


const saveVote = async (req, res) => {
  const result = Helper.validateVote(req.body);
  if (result.error) {
    return Helper.invalidDataMessage(res, result);
  }

  const AddVoteQuery = new ModelVote(req.body);
  if (!await AddVoteQuery.voteCandidate()) {
    return res.status(422)
      .send({
        status: 422, Error: AddVoteQuery.error.detail,
      });
  }
  return res.status(201).send({ status: 201, message: 'Voted successfully', data: AddVoteQuery.result });
};
export default saveVote;