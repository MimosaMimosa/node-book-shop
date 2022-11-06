const Author = require('../../model/Author');
const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');

exports.store = async (req, res, next) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
        const author = await Author.create([req.body], { session });
        req.mv();
        await session.commitTransaction();
        res.status(200).json({
            author,
            message: 'Created author successfully',
        });
    } catch (error) {
        await session.abortTransaction();
        next(error);
    } finally {
        session.endSession();
    }
};

exports.index = async (req, res, next) => {
    const page = parseInt(req.query.page ?? 1);
    const limit = parseInt(req.query.limit ?? 6);
    const skip = limit * (page - 1);
    try {
        const count = await Author.count();
        const totalPage = Math.ceil(count / limit);
        const authors = await Author.find().skip(skip).limit(limit).exec();
        return res.status(200).json({ authors, totalPage });
    } catch (error) {
        next(error);
    }
};

exports.show = async (req, res, next) => {
    try {
        const author = await Author.findById(req.params.id)
            .select('-password -createdAt -updatedAt -__v')
            .exec();

        res.status(200).json({ author });
    } catch (error) {
        next(error);
    }
};
/**
 * data prepare in pre update hook
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
exports.update = async (req, res, next) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
        const author = await Author.findByIdAndUpdate(
            req.params.id,
            {},
            { session }
        ).exec();
        if (req.image) {
            fs.unlinkSync(path.join(__basedir, author.image.path));
            req.mv();
        }
        await session.commitTransaction();
        res.status(200).json({
            message: 'Author updated successfully',
        });
    } catch (error) {
        await session.abortTransaction();
        next(error);
    } finally {
        session.endSession();
    }
};

exports.destroy = async (req, res, next) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
        const author = await Author.findByIdAndDelete(req.params.id, {
            session,
        }).exec();
        fs.unlinkSync(path.join(__basedir, author.image.path));
        await session.commitTransaction();
        res.status(200).json({ message: 'Deleted author successfully' });
    } catch (error) {
        error.message = 'Deleting author failed';
        await session.abortTransaction();
        next(error);
    } finally {
        session.endSession();
    }
};
