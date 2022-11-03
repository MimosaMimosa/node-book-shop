const mongoose = require("mongoose");
const { Schema } = mongoose;

const Collection = new Schema(
	{
		name: { type: String, required: true, max: 100 },
		author: { type: Schema.Types.ObjectId, ref: "Author" },
		published_at: { type: Date, default: null },
		image: [{ url: String, name: String }],
		link: {
			url: { type: String, default: null },
			name: { type: String, default: null },
		},
		category: { type: Schema.ObjectId, ref: "Category" },
		price: { type: Number, default: null },
		description: { type: String, max: 255 },
	},
	{ timestamps: true }
);

const Book = mongoose.model("Book", Collection);

module.exports = Book;
