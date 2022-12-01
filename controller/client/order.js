const Order = require("../../model/Order");
const Book = require("../../model/Book");
const { default: mongoose } = require("mongoose");

exports.store = async (req, res, next) => {
	try {
		const { products, address, phone } = req.body;
		const user = req.user;

		const bookIds = products.map((product) =>
			mongoose.Types.ObjectId(product.book)
		);

		const books = await Book.find({
			_id: {
				$in: bookIds,
			},
		})
			.select(["_id", "price"])
			.exec();

		const amount = books
			.map((book) => {
				const price = book.price;
				const product = products.find(
					(product) => product.book === book.id
				);
				if (!product) return 0;
				return price * product.quantity;
			})
			.reduce((a, b) => a + b);

		const data = {
			products,
			address,
			phone,
			user,
			amount,
		};

		const order = await Order.create([data]);
		res.status(200).json({
			order: order[0],
			message: "Your order is accepted",
		});
	} catch (error) {
		next(error);
	}
};

exports.index = async (req, res, next) => {
	try {
		const orders = await Order.find({
			user: req.user._id,
		})
			.sort({ _id: -1 })
			.select(["-products"])
			.exec();
		res.status(200).json({ orders });
	} catch (error) {
		next(error);
	}
};

exports.show = async (req, res, next) => {
	try {
		const orders = await Order.find({
			_id: {
				$in: [mongoose.Types.ObjectId("6377772b2295ca5b3e43c3fc")],
			},
		}).exec();
		res.status(200).json(orders);
	} catch (error) {
		next(error);
	}
};
