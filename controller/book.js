const Book = require('../model/book');
exports.create = async (req, res, next) => {
    req.body.photo = { url: req.image.path, name: req.image.name };
    const data = req.body;
    try {
        const book = new Book(data);
        await book.save();
        return res.status(200).json(book);
    } catch (error) {
        next(error);
    }
};
