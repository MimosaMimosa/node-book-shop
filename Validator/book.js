const Joi = require("joi");
const { ErrorBag } = require("./helper");

exports.storeRequest = async (req, res, next) => {
	const rule = {
		name: Joi.string().max(50).required(),
		price: Joi.number().required(),
		published_at: Joi.date().required(),
		category: Joi.string()
			.regex(/^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/)
			.required()
			.messages({ "string.pattern.base": "Invalid Id", }),
		author: Joi.string()
			.regex(/^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/)
			.required()
			.messages({ "string.pattern.base": "Invalid Id" }),
		image: Joi.string()
			.valid("image/jpeg", "image/jpg", "image/gif", "image/png")
			.required(),
		description: Joi.string().max(255).required(),
	};
	const schema = Joi.object(rule);
	ErrorBag(req, next, schema);
};
