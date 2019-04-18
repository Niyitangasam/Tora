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

    static name(input, required) {
        if (!input && !required) {
          return {
            isValid: true,
          };
        }
        if (input.match(/[a-z]{2}/i) && !input.match(/[0-9!$%*|}{:><?~`_&#^=]/)) {
          return {
            isValid: true,
          };
        }
        return {
          isValid: false,
    
          error: 'Please enter valid characters! Only alphabetic characters allowed.!!',
    
    
        };
      }

  static validateOffice(office) {
    const officeKeys = Joi.object().keys({
      type: Joi.string().min(3).max(30).required(),
      name: Joi.string().min(3).max(30).required(),
    })

    return Joi.validate(office, officeKeys);
  }
  
      static validateCandidate(candidate) {
        const schema = Joi.object().keys({
          officeId: Joi.number().integer().required(),
          partyId: Joi.number().integer().required(),
          userId: Joi.number().integer().required(),
        });
        return Joi.validate(candidate, schema);
      }
      static comparePassword(passwordHash, password) {
      const comparedPassword = bcrypt.compareSync(password, passwordHash);
      return comparedPassword;
      } 
      static validateLogin(user) {
        const schema = Joi.object().keys({
          email: Joi.string().trim().email({
            minDomainAtoms: 2,
        }).required(),
          password: Joi.string().min(8).required(),
        })
    
        return Joi.validate(user, schema);
      }   

}

export default Helper;