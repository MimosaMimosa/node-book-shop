const mongoose = require('mongoose');
const { Schema } = mongoose;

const Collection = new Schema(
    {
        name: { type: String, required: true, unique: true, max: 50 },
        age: { type: Number, required: true, max: 200 },
        phone: { type: Number },
    },
    { timestamps: true }
);

const Author = mongoose.model('Author', Collection);

module.exports = Author;
