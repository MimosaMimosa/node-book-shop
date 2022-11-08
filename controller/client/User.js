const verifyEmail = require("../../mail/service/verifyMail");
const User = require("../../model/User");
exports.create = async (req, res, next) => {
	const data = req.body;
	try {
		const user = await User.create({ data }).exec();
		if (req.image) {
			req.mv();
		}
		verifyEmail(user.email);
		res.status(200).json({ user });
	} catch (error) {
		next(error);
	}
};

exports.show = async (req, res, next) => {
	try {
		const user = await User.findById(req.params.id).exec();
		res.status(200).json({ user });
	} catch (error) {
		next(error);
	}
};

exports.index = async (req, res, next) => {
	try {
		const limit = req.query.limit ?? 10;
		const users = await User.find().limit(limit).exec();
		res.status(200).json({ users });
	} catch (error) {
		next(error);
	}
};
