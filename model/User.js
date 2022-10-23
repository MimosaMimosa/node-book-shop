const mongoose = require('mongoose');
const { Schema } = mongoose;

const Collection = new Schema(
    {
        name: { type: String, required: true, max: 50 },
        email: { type: String, required: true, unique: true, max: 5 },
        role: { type: Number, default: 1 },
        password: { type: String, required: true, max: 50 },
        Address: { type: String, required: true, max: 50 },
    },
    { timestamps: true }
);

const User = mongoose.model('User', Collection);

module.exports = User;
