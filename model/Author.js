const mongoose = require("mongoose");
const { hash } = require("../utils/bcrypt");
const { Schema } = mongoose;
const Collection = new Schema(
	{
		name: { type: String, required: true, max: 50 },
		email: { type: String, unique: true, required: true },
		phone: { type: String, required: true, max: 11 },
		date_of_birth: { type: Date, required: true },
		image: {
			url: {
				type: String,
				default: null,
				get: (url) => env("APP_URL") + "/" + url,
			},
			name: {
				type: String,
				default: null,
			},
			path: {
				type: String,
				default: null,
			},
		},
		password: {
			type: String,
			required: true,
			max: 50,
		},
		address: { type: String, required: true, max: 100 },
		country: { type: String, required: true, max: 50 },
	},
	{
		timestamps: true,
		toObject: { getters: true, setters: true },
		toJSON: { getters: true, setters: true },
		runSettersOnQuery: true,
	}
);

Collection.pre("save", function (next) {
	try {
		this.image = {
			url: request().image.path,
			name: request().image.name,
			path: request().image.path,
		};
		this.password = hash(this.password);
		next();
	} catch (error) {
		next(error);
	}
});

Collection.pre("updateOne", function (next) {
	try {
		this.password = hash(this.password);
		next();
	} catch (error) {
		next(error);
	}
});

const Author = mongoose.model("Author", Collection);

module.exports = Author;
