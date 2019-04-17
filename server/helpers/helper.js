import Joi from 'joi';

class Helper {
  static validateOffice(office) {
    const officeKeys = Joi.object().keys({
      type: Joi.required(),
      name: Joi.required(),
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

}

export default Helper;