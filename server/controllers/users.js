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

const loginUser = async (req, res) => {
    const result = Helper.validateLogin(req.body);
    if (result.error) {
      return Helper.invalidDataMessage(res, result);
    }
  
    const LoginUserQuery = new Users(req.body);
    if (!await LoginUserQuery.loginUser()) {
      return res.status(401)
        .send({
          status: 401, Error: "Invalid Username or Password",
        });
    }
    const issueToken = Helper.generateToken(LoginUserQuery.result);
    return res.status(201).send({ status: 201, message: 'Welcome to Tora App', token: issueToken});
  };
export { addUser, loginUser };