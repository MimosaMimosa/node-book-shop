const Category = require('../model/Category');
exports.create = async (req, res, next) => {
    try {
        const category = new Category(req.body);
        category.save();
        return res.status(200).json(category);
    } catch (error) {
        next(error);
    }
};
