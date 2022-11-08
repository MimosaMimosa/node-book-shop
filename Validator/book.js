const Joi = require("joi");
const { ErrorBag, file } = require("./helper");

exports.storeRequest = (req, res, next) => {
	req.validateBody = { ...req.body };
	const rule = {
		name: Joi.string().max(50).required(),
		price: Joi.number().required(),
		published_at: Joi.date().required(),
		category: Joi.string()
			.regex(/^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/)
			.required()
			.messages({ "string.pattern.base": "Invalid Id" }),
		author: Joi.string()
			.regex(/^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/)
			.required()
			.messages({ "string.pattern.base": "Invalid Id" }),
		image: file({
			type: "image",
			key: "image",
			rule: Joi.string()
				.valid("image/jpeg", "image/jpg", "image/gif", "image/png")
				.required(),
		}),
		description: Joi.string().max(255).required(),
	};
	const schema = Joi.object(rule);
	ErrorBag(req, next, schema);
};

// exports.updateRequest = (req, res, next) => {
// 	req.validateBody = { ...req.body };
// 	const rule = {
// 		name: Joi.string().max(50).required(),
// 		price: Joi.number().required(),
// 		published_at: Joi.date().required(),
// 		category: Joi.string()
// 			.regex(/^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/)
// 			.required()
// 			.messages({ "string.pattern.base": "Invalid Id" }),
// 		author: Joi.string()
// 			.regex(/^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/)
// 			.required()
// 			.messages({ "string.pattern.base": "Invalid Id" }),
// 		image: file(
// 			"image",
// 			"image",
// 			Joi.string()
// 				.allow(null, "")
// 				.valid("image/jpeg", "image/jpg", "image/gif", "image/png")
// 		),
// 		description: Joi.string().max(255).required(),
// 	};
// 	const schema = Joi.object(rule);
// 	ErrorBag(req, next, schema);
// };
