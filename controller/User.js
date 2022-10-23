const User = require('../model/User');
exports.create = async (req, res, next) => {
    req.body.image = { url: req.image.path, name: req.image.name };
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
