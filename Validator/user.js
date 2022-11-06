const { ErrorBag, unique } = require('./helper');
const Joi = require('joi');
const User = require('../model/User');
exports.storeRequest = async (req, res, next) => {
    const rule = {
        name: Joi.string().max(50).required(),
        password: Joi.string().min(6).max(20).required(),
        email:
            (await unique(User, 'email')) ||
            Joi.string().email().lowercase().required(),
    };

    const schema = Joi.object(rule);

    ErrorBag(req, next, schema);
};
