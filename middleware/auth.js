const jwt = require("jsonwebtoken");
const User = require("../model/User");
exports.verifyToken = async (req, res, next) => {
	const [prefix, token] = req.headers.authorization.split("|");
	console.log(prefix);
	try {
		if (prefix === process.env.TOKEN_TYPE) {
            console.log(token)
			const decoded = jwt.verify(token, process.env.SECRET_CODE);
			req.user = decoded.data;
			const user = await User.findById(req.user._id);
			if (user) {
				return next();
			}
			throw Error("Not Found");
		} else {
			throw Error("Not Found");
		}
	} catch (error) {
		return res.status(422).json({ message: "Invalid Token" });
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
