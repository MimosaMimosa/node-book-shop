const mongoose = require("mongoose");
const { Schema } = mongoose;
const dayjs = require("../utils/dayjs");
const Collection = new Schema(
	{
		email: { type: String, required: true },
		token: { type: String, required: true, max: 50 },
		expired_at: {
			type: Date,
			default: dayjs().add(1, "h").toISOString(),
		},
	},
	{ timestamps:true }
);

const PasswordReset = mongoose.model("PasswordReset", Collection);

module.exports = PasswordReset;
