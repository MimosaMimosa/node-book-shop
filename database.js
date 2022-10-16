const mongoose = require('mongoose');

module.exports = async () => {
    await mongoose.connect('mongodb://localhost:27017/book-shop');
};
