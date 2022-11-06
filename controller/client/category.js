const Category = require('../../model/Category');

exports.create = async (req, res, next) => {
    try {
        const category = new Category(req.body);
        await category.save();
        res.status(200).json({ category });
    } catch (error) {
        next(error);
    }
};

exports.index = async (req, res, next) => {
    try {
        const categories = await Category.find().sort({ _id: -1 }).exec();
        res.status(200).json({ categories });
    } catch (error) {
        next(error);
    }
};
