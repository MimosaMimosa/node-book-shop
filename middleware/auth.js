const jwt = require("jsonwebtoken");
const User = require("../model/User");
const { createError } = require("../utils/error");
exports.verifyToken = async (req, res, next) => {
	try {
		const [prefix, token] = req.headers?.authorization?.split("|");
		const decoded = jwt.verify(token, process.env.SECRET_CODE);
		const user = await User.findById(decoded?.data?._id).exec();
		if (
			prefix === process.env.TOKEN_TYPE &&
			decoded &&
			Object.keys(user).length
		) {
			req.user = decoded.data;
			return next();
		}
		return createError(401, { message: "Unauthorized" }, next);
	} catch (error) {
		return createError(401, { message: "Unauthorized" }, next);
	}
};
