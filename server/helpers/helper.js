import Joi from 'joi';

class Helper {

    static validateVote(vote) {
        const schema = Joi.object().keys({
          createdBy: Joi.number().integer().required(),
          office: Joi.number().integer().required(),
          candidate: Joi.number().integer().required(),
        });
        return Joi.validate(vote, schema);
      }
    static invalidDataMessage(res, result) {
        const errors = [];
        for (let index = 0; index < result.error.details.length; index += 1) {
          errors.push(result.error.details[index].message.split('"').join(' '));
        }
        return res.status(422).send({ status: 422, Error: errors });
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
  static validateVote(vote) {
    const schema = Joi.object().keys({
      createdBy: Joi.number().integer().required(),
      office: Joi.number().integer().required(),
      candidate: Joi.number().integer().required(),
    });
    return Joi.validate(vote, schema);
  }
  static invalidDataMessage(res, result) {
    const errors = [];
    for (let index = 0; index < result.error.details.length; index += 1) {
      errors.push(result.error.details[index].message.split('"').join(' '));
    }
    return res.status(422).send({ status: 422, Error: errors });
  }


      static validateCandidate(candidate) {
        const schema = Joi.object().keys({
          officeId: Joi.number().integer().required(),
          partyId: Joi.number().integer().required(),
          userId: Joi.number().integer().required(),
        });
        return Joi.validate(candidate, schema);
      }

}

export default Helper;