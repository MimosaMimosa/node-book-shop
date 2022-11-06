const mongoose = require('mongoose');
const { Schema } = mongoose;

const Collection = new Schema(
    {
        name: { type: String, required: true, max: 100 },
        author: { type: Schema.Types.ObjectId, ref: 'Author' },
        published_at: { type: Date, default: null },
        image: [{ url: String, name: String }],
        link: {
            url: { type: String, default: null },
            name: { type: String, default: null },
        },
        category: { type: Schema.ObjectId, ref: 'Category' },
        price: { type: Number, default: null },
        description: { type: String, max: 255, default: null },
    },
    { timestamps: true }
);

Collection.statics.prepareUpdate = (req) => {
    const { image, ...others } = req.body;
    const data = { ...others };
    if (req.image) {
        data.image = {
            url: req.image.url,
            path: req.image.url,
            name: req.image.name,
        };
    }
    return data;
};

const Book = mongoose.model('Book', Collection);

module.exports = Book;
