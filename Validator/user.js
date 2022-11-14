const { ErrorBag, unique, file } = require("./helper");
const Joi = require("joi");
const User = require("../model/User");
exports.storeRequest = async (req, res, next) => {
	req.validateBody = { ...req.body };
	const rule = {
		name: Joi.string().max(50).required(),
		password: Joi.string().min(6).max(20).required(),
		image: file({
			type: "image",
			key: "image",
			rule: Joi.string()
				.valid(
					"image/jpeg",
					"image/jpg",
					"image/gif",
					"image/png",
					"image/webp"
				)
				.required(),
		}),
		email: await unique({
			modal: User,
			unique: "email",
			ignore: false,
			rule: Joi.array()
				.items(
					Joi.string()
						.email()
						.message({
							"string.email": "email must be valid email",
						})
						.label("email")
				)
				.unique()
				.message({
					"array.unique": `This ${req.body.email} is already been registered.`,
				})
				.label("email"),
		}),
	};

	const schema = Joi.object(rule);

	ErrorBag(req, next, schema);
};
