const { ErrorBag, unique, file } = require("./helper");
const Joi = require("joi");
const Author = require("../model/Author");

exports.storeRequest = async (req, res, next) => {
	req.validateBody = { ...req.body };
	const rule = {
		name: Joi.string().max(50).required(),
		address: Joi.string().max(100).required(),
		country: Joi.string().max(50).required(),
		date_of_birth: Joi.date().required(),
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
		phone: Joi.string().required().max(11),
		password: Joi.string().min(6).max(20).required(),
		email: await unique({
			modal: Author,
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

exports.updateRequest = async (req, res, next) => {
	req.validateBody = { ...req.body };
	const rule = {
		name: Joi.string().max(50).required(),
		address: Joi.string().max(100).required(),
		country: Joi.string().max(50).required(),
		date_of_birth: Joi.date().required(),
		image: file({
			type: "image",
			key: "image",
			rule: Joi.string()
				.allow(null, "")
				.valid(
					"image/jpeg",
					"image/jpg",
					"image/gif",
					"image/png",
					"image/webp"
				)
				.required(),
		}),
		phone: Joi.string().required().max(11),
		password: Joi.string().min(6).max(20).required(),
		email: await unique({
			modal: Author,
			unique: "email",
			ignore: ["_id", req.params.id],
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
