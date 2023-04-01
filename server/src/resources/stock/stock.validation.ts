import Joi from 'joi';

const create = Joi.object({
    title: Joi.string().max(50),

    description: Joi.string().max(500),

    author: Joi.string().max(100),
});

const update = Joi.object({
    title: Joi.string().max(50),

    description: Joi.string().max(500),

    author: Joi.string().max(100),

    statusChangeFile: Joi.boolean(),
});

export default { create, update };
