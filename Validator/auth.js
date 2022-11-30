const Joi = require("joi");
const { ErrorBag } = require("./helper");

const auth = {
	loginRequest: (req, res, next) => {
		req.validateBody = { ...req.body };
		const rule = {
			email: Joi.string().email({
				minDomainSegments: 2,
				tlds: { allow: ["com", "net"] },
			}),
			password: Joi.string().min(6).max(20),
		};
		const schema = Joi.object(rule);

		ErrorBag(req, next, schema);
	},
};

module.exports = auth;
