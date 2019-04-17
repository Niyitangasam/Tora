import Helper from '../helpers/helper';
import Users from '../models/users';


const addUser = async (req, res) => {
  const result = Helper.validateUser(req.body);
  if (result.error) {
    return Helper.invalidDataMessage(res, result);
  }

  const AddUserQuery = new Users(req.body);
  if (!await AddUserQuery.createUser()) {
    return res.status(422)
      .send({
        status: 422, Error: AddUserQuery.error.detail,
      });
  }
  const issueToken = Helper.generateToken(AddUserQuery.result);
  return res.status(201).send({ status: 201, message: 'User added successfully', token: issueToken, data: AddUserQuery.result });
};
export default addUser;