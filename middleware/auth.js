const jwt = require("jsonwebtoken");
const User = require("../model/User");
const { createError } = require("../utils/error");
exports.verifyToken = async (req, res, next) => {
	try {
		const [prefix, token] = req.headers.authorization.split("|");
		const decoded = jwt.verify(token, process.env.SECRET_CODE);
		if (
			prefix === process.env.TOKEN_TYPE &&
			decoded &&
			(await User.findById(decoded?.data?._id).exec())
		) {
			req.user = decoded.data;
			return next();
		}
		return createError(422, { message: "Invalid Token." }, next);
	} catch (error) {
		next(error);
	}
};
