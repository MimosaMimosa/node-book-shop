const Book = require('../../model/book');
exports.create = async (req, res, next) => {
    req.body.image = { url: req.image.path, name: req.image.name };
    const session = await Book.startSession();
    session.startTransaction();
    try {
        const book = new Book(req.body);
        await book.save();
        req.mv();
        await session.commitTransaction();
        res.status(200).json(book);
    } catch (error) {
        await session.abortTransaction();
        next(error);
    } finally {
        session.endSession();
    }
};

exports.index = async (req, res, next) => {
    try {
        const books = await Book.find()
            .sort({ _id: -1 })
            .populate('author')
            .limit(req.query.limit ?? 10)
            .exec();
        res.status(200).json({ books });
    } catch (error) {
        next(error);
    }
};

exports.show = async (req, res, next) => {
    try {
        const book = await Book.findById(req.params.id)
            .populate('author')
            .exec();
        return res.status(200).json({ book });
    } catch (error) {
        next(error);
    }
};
