const Book = require('../../model/Book');
const { calculatePaginate, usePagination } = require('../../utils/helper');
exports.create = async (req, res, next) => {
    const session = await Book.startSession();
    session.startTransaction();
    try {
        const data = Book.prepareStore(req);
        const book = await Book.create([data], { session });
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
        const [currentPage, skip, limit] = calculatePaginate();
        const total = await Book.find().count().exec();
        const totalPage = Math.ceil(total / limit);
        const pagination = usePagination(total, currentPage);
        const books = await Book.find()
            .sort({ _id: -1 })
            .populate('author')
            .skip(skip)
            .limit(limit)
            .exec();
        res.status(200).json({ books, totalPage, currentPage, pagination });
    } catch (error) {
        next(error);
    }
};

exports.show = async (req, res, next) => {
    try {
        const book = await Book.findById(req.params.id)
            .populate('author')
            .exec();
        res.status(200).json({ book });
    } catch (error) {
        next(error);
    }
};
