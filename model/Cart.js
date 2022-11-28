const { Schema, default: mongoose } = require("mongoose");

const Collection = new Schema(
	{
		user: { type: Schema.Types.ObjectId, ref: "User" },
		products: [
			{
				book: {
					type: Schema.Types.ObjectId,
					ref: "Book",
					required: true,
				},
				quantity: { type: Number, required: true, default: 0 },
			},
		],
		subtotal: {
			type: Number,
			default: 0,
			get: function () {
				const subtotal = this.products
					.map((ct) => ct.book.price * ct.quantity)
					.reduce((a, b) => a + b, 0)
					.toFixed(2);
				return Number(subtotal);
			},
		},
	},
	{
		timestamps: true,
		toObject: { getters: true, setters: true },
		toJSON: { getters: true, setters: true },
		runSettersOnQuery: true,
	}
);

Collection.statics.prepareQuery = async (req) => {
	const quantity = req.body.quantity;
	const hasCart = await Cart.find({
		_id: req.user._id,
		"products.book": req.body.book,
	}).exec();

	let search = {
		_id: req.user._id,
	};

	let query = {
		$push: {
			products: { book: req.body.book, quantity },
		},
	};

	if (hasCart.length) {
		query = {
			$inc: {
				"products.$.quantity": quantity,
			},
		};
		search["products.book"] = req.body.book;
	}

	return [search, query];
};

const Cart = mongoose.model("Cart", Collection);

module.exports = Cart;
