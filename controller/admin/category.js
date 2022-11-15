const Category = require("../../model/Category");

exports.index = async (req, res, next) => {
	try {
		const categories = await Category.find().exec();
		res.status(200).json({ categories });
	} catch (error) {
		next(error);
	}
};

exports.store = async (req, res, next) => {
	try {
		const category = await Category.create({ name: req.body.name });
		res.status(200).json({
			category,
			message: "The category is created successfully.",
		});
	} catch (error) {
		next(error);
	}
};

exports.show = async (req, res, next) => {
	try {
		const category = await Category.findById(req.params.id);
		res.status(200).json({ category });
	} catch (error) {
		next(error);
	}
};

exports.destroy = async (req, res, next) => {
	try {
		await Category.findByIdAndDelete(req.params.id);
		res.status(200).json({
			message: "The category is deleted successfully",
		});
	} catch (error) {
		next(error);
	}
};
