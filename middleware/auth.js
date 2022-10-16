const jwt = require('jsonwebtoken');
exports.verifyToken = (req, res, next) => {
    const [prefix, token] = req.headers.authorization.split('|');
    try {
        if (prefix === process.env.TOKEN_TYPE) {
            const decoded = jwt.verify(token, process.env.SECRET_CODE);
            req.user = decoded.data;
            return next();
        }
        return res.staus(422).json({ message: 'Invalid Token' });
    } catch (error) {
        next(error);
    }
};

exports.isAdmin = (req, res, next) => {
    try {
        if (req.user.role === 2) {
            return next();
        }
        return res.status(404).json({ message: 'Not Found!' });
    } catch (error) {
        next(error);
    }
};
