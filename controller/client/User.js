const verifyEmail = require('../../mail/service/verifyMail');
const User = require('../../model/User');
exports.create = async (req, res, next) => {
    const data = req.body;
    try {
        const user = new User(data);
        await user.save();
        delete user._doc.password;
        if (req.image) {
            req.mv();
        }
        verifyEmail(user.email);
        res.status(200).json(user);
    } catch (error) {
        next(error);
    }
};

exports.show = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id);
        res.status(200).json(user);
    } catch (error) {
        next(error);
    }
};

exports.index = async (req, res, next) => {
    const limit = req.query.limit || 10;
    try {
        const users = await User.find().limit(limit);
        res.status(200).json(users);
    } catch (error) {
        next(error);
    }
};
