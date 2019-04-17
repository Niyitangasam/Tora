import Joi from 'joi';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

class Helper {
    static validateVote(vote) {
        const schema = Joi.object().keys({
          createdBy: Joi.number().integer().required(),
          office: Joi.number().integer().required(),
          candidate: Joi.number().integer().required(),
        });
        return Joi.validate(vote, schema);
      }
      static validateUser(user) {
        const schema = Joi.object().keys({
          firstname: Joi.string().required(),
          lastname: Joi.string().required(),
          othername: Joi.string().required(),
          email: Joi.string().trim().email({
            minDomainAtoms: 2,
        }).required(),
          password: Joi.string().min(8).required(),
          isadmin: Joi.boolean().required(),
        });
        return Joi.validate(user, schema);
      }
    static invalidDataMessage(res, result) {
        const errors = [];
        for (let index = 0; index < result.error.details.length; index += 1) {
          errors.push(result.error.details[index].message.split('"').join(' '));
        }
        return res.status(422).send({ status: 422, Error: errors });
      }
      static generateToken(userinfo) {
        const Issuetoken = jwt.sign(userinfo[0],
          process.env.SECRET, { expiresIn: '1d' });
      return Issuetoken;
      }
      static hashPassword(password) {
        const hashedPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(8));
        return hashedPassword;

      }

}

export default Helper;