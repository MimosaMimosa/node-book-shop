const { Schema, default: mongoose } = require("mongoose");

const book = new Schema(
	{
		book: { type: Schema.Types.ObjectId, ref: "Book" },
		quantity: { type: Number, default: 1 },
	},
	{
		toObject: { getters: true, setters: true },
		toJSON: { getters: true, setters: true },
	}
);

const Collection = new Schema(
	{
		user: { type: Schema.Types.ObjectId, ref: "User", required: true },
		products: [book],
		address: { type: String, required: true, max: 255 },
		phone: { type: Number, required: true },
		amount: { type: Number, required: true },
		waiting_time: { type: Date, default: null },
		status: {
			type: Number,
			default: 0,
			enum: [0, 1, 2],
			get: (value) => {
				const data = { code: value };
				switch (value) {
					case 1:
						data.label = "accepted";
						break;
					case 2:
						data.label = "cancel";
						break;
					default:
						data.label = "pending";
				}
				return data;
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

// Collection.pre("save", function (next) {
// 	try {
// 		const IDs = this.products.map((product) => product.book);
// 	} catch (error) {
// 		next(error);
// 	}
// });

const Order = mongoose.model("Order", Collection);

module.exports = Order;
