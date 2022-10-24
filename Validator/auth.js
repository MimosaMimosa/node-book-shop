const Joi = require('joi');
const { showError } = require('./helper');

const auth = {
    loginRequest: (...arg) => {
        const schema = Joi.object({
            email: Joi.string().email({
                minDomainSegments: 2,
                tlds: { allow: ['com', 'net'] },
            }),
            password: Joi.string().min(6).max(20),
        });

        showError(...arg, schema);
    },
};

module.exports = auth;
