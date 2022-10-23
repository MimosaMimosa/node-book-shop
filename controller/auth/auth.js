const User = require("../../model/User");
const { compare } = require("../../utils/bcrypt");
const jwt = require("jsonwebtoken");

const maxAge = 3 * 24 * 60 * 60;

exports.login = async (req, res, next) => {
	const { email, password } = req.body;
	try {
		const user = await User.findOne({ email: email });
		if (user && compare(password, user.password)) {
			const { password, ...others } = user._doc;
			const token = jwt.sign(
				{
					data: others,
				},
				process.env.SECRET_CODE,
				{ expiresIn: maxAge }
			);

			return res.status(200).json({ user:others ,token});
		}
		return res
			.status(422)
			.json({ message: "Invalid username or password" });
	} catch (error) {
		next(error);
	}
};
