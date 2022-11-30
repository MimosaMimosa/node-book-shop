const User = require("../../model/User");
const { compare } = require("../../utils/bcrypt");
const jwt = require("jsonwebtoken");
const { createError } = require("../../utils/error");
const Cart = require("../../model/Cart");
exports.login = async (req, res, next) => {
	// const maxAge = 3 * 24 * 60 * 60;
	const { email, password } = req.body;
	try {
		const user = await User.findOne({ email }).exec();
		if (user && !user.email_verify_at) {
			return createError(
				401,
				{ message: "Please check your email for verification link." },
				next
			);
		}

		if (user && compare(password, user.password)) {
			const { password, email_verify_at, ...others } = user._doc;
			const token = jwt.sign(
				{
					data: others,
				},
				env("SECRET_CODE")
			);

			const carts = await Cart.findOne({ user: user._id })
				.populate([
					{
						path: "products.book",
						model: "Book",
					},
				])	
				.exec();
			return res.status(200).json({ user: others, token, carts });
		}
		return createError(
			401,
			{ message: "Invalid username or password." },
			next
		);
	} catch (error) {
		next(error);
	}
};

exports.isLogin = async (req, res, next) => {
	try {
		const user = req.user;
		const carts = await Cart.findOne({ user: req.user._id }).populate([
			{
				path:'products.book',
				model:'Book'
			}
		]);
		return res.status(200).json({ user, carts });
	} catch (error) {
		next(error);
	}
};
