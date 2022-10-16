const mongoose = require('mongoose');
const { Schema } = mongoose;

const Collection = new Schema(
    {
        name: { type: String, required: true, max: 100 },
    },
    { timestamps: true }
);

const Category = mongoose.model('Category', Collection);

module.exports = Category;
