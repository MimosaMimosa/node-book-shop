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

Collection.statics.paginate = async function (req) {
	const page = parseInt(req.query.page ?? 1);
	const limit = parseInt(req.query.limit ?? 10);
	const skip = limit * (page - 1);
	const count = await this.count();
	const totalPage = Math.ceil(count / limit);
	req.totalPage = totalPage;
	return this.find(req.query)
		.skip(skip)
		.limit(limit)
		.populate("author", ["name", "_id"].join(" "));
};

const Book = mongoose.model("Book", Collection);

module.exports = Book;
