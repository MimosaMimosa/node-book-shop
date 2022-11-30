const Joi = require("joi");
const { ErrorBag } = require("./helper");

exports.storeRequest = async (req, res, next) => {
	req.validateBody = { ...req.body };
	const rule = {
		products: Joi.array().items(
			Joi.object()
				.keys({
					book: Joi.string()
						.regex(/^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/)
						.required()
						.messages({ "string.pattern.base": "Invalid Id" }),
					quantity: Joi.number().min(-1).required(),
				})
				.required()
		),
		phone: Joi.number().required(),
		address: Joi.string().max(50).required(),
	};

	const schema = Joi.object(rule);

	ErrorBag(req, next, schema);
};
