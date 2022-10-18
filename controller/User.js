const User = require('../model/User');
const { hash } = require('../utils/bcrypt');
exports.create = async (req, res, next) => {
    req.body.password = hash(req.body.password);
    const data = req.body;
    try {
        const user = new User(data);
        await user.save();
        delete user._doc.password;
        return res.status(200).json(user);
    } catch (error) {
        next(error);
    }
};
