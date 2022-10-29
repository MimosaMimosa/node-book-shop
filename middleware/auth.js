const jwt = require("jsonwebtoken");
const { createError } = require("../utils/error");
exports.verifyToken = async (req, res, next) => {
	const [prefix, token] = req.headers.authorization.split("|");
	const decoded = jwt.verify(token, process.env.SECRET_CODE);
	try {
		if (prefix === process.env.TOKEN_TYPE && decoded) {
			req.user = decoded.data;
			return next();
		}
		return createError(422, "Invalid Token.", next);
	} catch (error) {
		next(error);
	}
};
