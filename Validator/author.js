const { ErrorBag, unique } = require("./helper");
const Joi = require("joi");
const Author = require("../model/Author");

exports.storeRequest = async (req, res, next) => {
	const email = req.body.email;
	const rule = {
		name: Joi.string().max(50).required(),
		address: Joi.string().max(100).required(),
		country: Joi.string().max(50).required(),
		date_of_birth: Joi.date().required(),
		image: Joi.string()
			.valid(
				"image/jpeg",
				"image/jpg",
				"image/gif",
				"image/png",
				"image/webp"
			)
			.required(),
		phone: Joi.string().required().max(11),
		password: Joi.string().min(6).max(20).required(),
		email: Joi.string().email().lowercase().required(),
	};
	const user = await unique(Author, "email", email);
	if (user?._doc) {
		req.body.email = [email, email];
		rule.email = Joi.array()
			.unique()
			.message({ "array.unique": `${email} is already been registered` })
			.label("email");
	}
	const schema = Joi.object(rule);

	ErrorBag(req, next, schema);
};

exports.updateRequest = async (req, res, next) => {
	const rule = {
		name: Joi.string().max(50),
		address: Joi.string().max(100),
		country: Joi.string().max(50),
		date_of_birth: Joi.date().required(),
		phone: Joi.string().max(11),
		password: Joi.string().allow(null, "").min(6).max(20),
		email: Joi.string().allow(null, "").email().lowercase(),
		image: Joi.string().min(0),
	};

	if (req.body.email) {
		const author = await Author.findOne({
			email: req.body.email,
			_id: {
				$ne: req.params.id,
			},
		}).exec();
		
		if (author) {
			req.body.email = [author.email, author.email];
			rule.email = Joi.array()
				.unique()
				.message({
					"array.unique": `${author.email} is already been registered`,
				})
				.label("email");
		}
	}

	if (req.files) {
		rule.image = Joi.string()
			.valid(
				"image/jpeg",
				"image/jpg",
				"image/gif",
				"image/png",
				"image/webp"
			)
			.required();
	} else {
		req.body.image = "";
	}
	const schema = Joi.object(rule);

	ErrorBag(req, next, schema);
};
