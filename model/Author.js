const mongoose = require("mongoose");
const { hash } = require("../utils/bcrypt");
const { Schema } = mongoose;

const Collection = new Schema(
	{
		name: { type: String, required: true, max: 50 },
		email: { type: String, required: true, unique: true },
		phone: { type: String, required: true, max: 11 },
		date_of_birth: { type: Date, required: true },
		image: { url: { type: String }, name: { type: String } },
		password: {
			type: String,
			required: true,
			max: 50,
		},
		address: { type: String, required: true, max: 100 },
		country: { type: String, required: true, max: 50 },
	},
	{ timestamps: true }
);

Collection.pre("save", function (next) {
	try {
		const author = this;
		author.password = hash(author.password);
		next();
	} catch (error) {
		throw Error(error);
	}
});

const Author = mongoose.model("Author", Collection);

module.exports = Author;
