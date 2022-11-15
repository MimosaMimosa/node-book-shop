const mongoose = require("mongoose");
const { Schema } = mongoose;

const image = new Schema(
	{
		url: {
			type: String,
			default: null,
			get: (url) => global.env("APP_URL") + url,
		},
		name: {
			type: String,
			default: null,
		},
		path: {
			type: String,
			default: null,
			get: (path) => path.substr(1),
		},
	},
	{
		toObject: { getters: true, setters: true },
		toJSON: { getters: true, setters: true },
	}
);

const Collection = new Schema(
	{
		name: { type: String, required: true, max: 100 },
		author: { type: Schema.Types.ObjectId, ref: "Author" },
		published_at: { type: Date, default: null },
		image: [image],
		link: {
			url: { type: String, default: null },
			name: { type: String, default: null },
		},
		categories: [{ type: Schema.ObjectId, ref: "Category" }],
		price: { type: Number, default: null },
		description: { type: String, max: 255, default: null },
	},
	{
		timestamps: true,
		toObject: { getters: true, setters: true },
		toJSON: { getters: true, setters: true },
		runSettersOnQuery: true,
	}
);

Collection.statics.prepareUpdate = (req) => {
	const { image, ...data } = req.body;
	if (req.image) {
		data.image = {
			url: req.image.path,
			path: req.image.path,
			name: req.image.name,
		};
	}
	return data;
};

Collection.statics.prepareStore = (req) => {
	const { image, ...data } = req.body;
	data.image = {
		url: req.image.path,
		path: req.image.path,
		name: req.image.name,
		categories: data.categories,
	};
	return data;
};

Collection.statics.prepareQuery = (req) => {
	const { limit, categories, ...others } = req.query;
	const query = {};
	Object.keys(others).forEach((key) => {
		if (others[key]) {
			query[key] = others[key];
		}
	});
	return query;
};

const Book = mongoose.model("Book", Collection);

module.exports = Book;
