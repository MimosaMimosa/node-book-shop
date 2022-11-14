const mongoose = require("mongoose");
const { hash } = require("../utils/bcrypt");
const { Schema } = mongoose;
const Collection = new Schema(
	{
		name: { type: String, required: true, max: 50 },
		email: { type: String, required: true, unique: true },
		phone: { type: String, default: null, max: 11 },
		image: {
			url: { type: String, default: null },
			path: { type: String, default: null },
			name: { type: String, default: null },
		},
		password: {
			type: String,
			required: true,
			max: 50,
		},
		email_verify_at: { type: Date, default: null },
		address: { type: String, default: null, max: 100 },
		country: { type: String, default: null, max: 50 },
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
		this.password = hash(this.password);
		next();
	} catch (error) {
		next(error);
	}
});

Collection.statics.prepareStore = (req) => {
	const { image, ...data } = req.body;
	data.image = {
		url: req.image.path,
		path: req.image.path,
		name: req.image.name,
	};
	return data;
};

const User = mongoose.model("User", Collection);

module.exports = User;
