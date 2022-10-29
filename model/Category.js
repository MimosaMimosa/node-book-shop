const mongoose = require("mongoose");
const { Schema } = mongoose;
const dayjs = require("../utils/dayjs");
const Collection = new Schema(
	{
		name: { type: String, required: true, max: 100 },
	},
	{ timestamps: { currentTime: () => dayjs().toISOString() } }
);

const Category = mongoose.model("Category", Collection);

module.exports = Category;
