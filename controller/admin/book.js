const Book = require('../../model/book');
const { calculatePaginate } = require('../../utils/helper');
const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');
exports.index = async (req, res, next) => {
    try {
        const [currentPage, skip, limit] = calculatePaginate();
        const total = await Book.find().count().exec();
        const totalPage = Math.ceil(total / limit);
        const books = await Book.find()
            .skip(skip)
            .limit(limit)
            .populate([
                {
                    path: 'category',
                    model: 'Category',
                    select: 'name',
                },
                {
                    path: 'author',
                    model: 'Author',
                    select: 'name image',
                },
            ])
            .exec();
        res.status(200).json({ books, totalPage, currentPage });
    } catch (error) {
        next(error);
    }
};

exports.destroy = async (req, res, next) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
        const book = Book.findByIdAndDelete(req.params.id, { session });
        fs.unlinkSync(path.join(__basedir, book.path));
        await session.commitTransaction();
    } catch (error) {
        await session.abortTransaction();
        next(error);
    } finally {
        session.endSession();
    }
};
