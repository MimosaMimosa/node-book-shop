const jwt = require("jsonwebtoken");
exports.verifyToken = async (req, res, next) => {
	const [prefix, token] = req.headers.authorization.split("|");
	const decoded = jwt.verify(token, process.env.SECRET_CODE);
	try {
		if (prefix === process.env.TOKEN_TYPE && decoded) {
			req.user = decoded.data;
			next();
		}
		throw Error({});
	} catch (error) {
		error.status = 422,
		error.message = 'Invalid Token.'
		next(error)
	}
};

exports.isAdmin = (req, res, next) => {
	try {
		if (req.user.role === 2) {
			return next();
		}
		return res.status(404).json({ message: "Not Found!" });
	} catch (error) {
		next(error);
	}
};
