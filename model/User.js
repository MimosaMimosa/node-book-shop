const mongoose = require("mongoose");
const { hash } = require("../utils/bcrypt");
const { Schema } = mongoose;
const dayjs = require("../utils/dayjs");
const Collection = new Schema(
	{
		name: { type: String, required: true, max: 50 },
		email: { type: String, required: true, unique: true },
		phone: { type: String, default: null, max: 11 },
		image: {
			url: { type: String, default: null },
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
	{ timestamps: { currentTime: () => dayjs().toISOString() } }
);

Collection.pre("save", function (next) {
	try {
		const user = this;
		user.password = hash(user.password);
		next();
	} catch (error) {
		next(error);
	}
});

const User = mongoose.model("User", Collection);

module.exports = User;
