const { ErrorBag, unique } = require("./helper");
const Joi = require("joi");
const User = require("../model/User");
exports.storeRequest = async (req, res, next) => {
	const email = req.body.email;
	const rule = {
		name: Joi.string().max(50).required(),
		password: Joi.string().min(6).max(20).required(),
		email: Joi.string().email().lowercase().required(),
	};
	const user = await unique(User, "email", email);
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