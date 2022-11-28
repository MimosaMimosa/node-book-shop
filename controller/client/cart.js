const Cart = require("../../model/Cart");

exports.store = async (req, res, next) => {
	try {
		const [search, query] = await Cart.prepareQuery(req);
		const carts = await Cart.findOneAndUpdate(
			search,
			{
				user: req.user._id,
				...query,
			},
			{ new: true, upsert: true }
		)
			.populate([
				{
					path: "products.book",
					model: "Book",
				},
			])
			.exec();
		res.status(200).json({ carts });
	} catch (error) {
		next(error);
	}
};

exports.index = async (req, res, next) => {
	try {
		const carts = await Cart.findOne({ user: req.user })
			.populate([
				{
					path: "products.book",
					model: "Book",
				},
			])
			.exec();
		res.status(200).json({ carts });
	} catch (error) {
		next(error);
	}
};

exports.destroyProduct = async (req, res, next) => {
	try {
		const carts = await Cart.findOneAndUpdate(
			{ user: req.user._id },
			{
				$pull: {
					products: { _id: req.params.id },
				},
			},
			{
				new: true,
			}
		)
			.populate([
				{
					path: "products.book",
					model: "Book",
				},
			])
			.exec();
		res.status(200).json({ carts, message: "The product is deleted" });
	} catch (error) {
		next(error);
	}
};
