import Joi from 'joi';

const create = Joi.object({
    value: Joi.string().max(100).required(),
});

export default { create };
