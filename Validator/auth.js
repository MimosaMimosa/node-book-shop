const Joi = require("joi");
const { ErrorBag } = require("./helper");

const auth = {
	loginRequest: (req, res, next) => {
		const schema = Joi.object({
			email: Joi.string().email({
				minDomainSegments: 2,
				tlds: { allow: ["com", "net"] },
			}),
			password: Joi.string().min(6).max(20),
		});

		ErrorBag(req, next, schema);
	},
};

module.exports = auth;
