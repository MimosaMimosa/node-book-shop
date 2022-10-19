const mongoose = require("mongoose");
const { Schema } = mongoose;

const Collection = new Schema(
	{
		user: { type: Schema.Types.ObjectId, require: true, ref: "User" },
		books: [{ type: Schema.Types.ObjectId, require: true, ref: "Book" }],
		address: { type: String, required: true, max: 255 },
		phone: { type: Number, required: true },
	},
	{ timestamps: true }
);

const Order = mongoose.model("Order", Collection);

module.exports = Order;
