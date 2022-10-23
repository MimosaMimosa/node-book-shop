const mongoose = require('mongoose');
const { Schema } = mongoose;

const Collection = new Schema(
    {
        name: { type: String, required: true, max: 50 },
        name_and_surname: { type: String, required: true, max: 50 },
        email: { type: String, required: true, unique: true, max: 5 },
        role: { type: Number, default: 1 },
        password: { type: String, required: true, max: 50 },
        address: { type: String, required: true, max: 50 },
        country: { type: String, required: true, max: 50 },
    },
    { timestamps: true }
);

const User = mongoose.model('User', Collection);

module.exports = User;
