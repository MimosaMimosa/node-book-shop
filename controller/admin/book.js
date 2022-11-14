const Book = require("../../model/Book");
const { calculatePaginate } = require("../../utils/helper");
const fs = require("fs");
const path = require("path");
const mongoose = require("mongoose");

exports.index = async (req, res, next) => {
	try {
		const [currentPage, skip, limit] = calculatePaginate(req);
		const total = await Book.find().count().exec();
		const totalPage = Math.ceil(total / limit);
		const books = await Book.find()
			.skip(skip)
			.limit(limit)
			.populate([
				{
					path: "category",
					model: "Category",
					select: "name",
				},
				{
					path: "author",
					model: "Author",
					select: "name image",
				},
			])
			.exec();
		res.status(200).json({ books, totalPage, currentPage });
	} catch (error) {
		next(error);
	}
};

exports.store = async (req, res, next) => {
	const session = await Book.startSession();
	session.startTransaction();
	try {
		const data = Book.prepareStore(req);
		await Book.create([data], { session });
		req.mv();
		await session.commitTransaction();
		res.status(200).json({ message: "The book is created." });
	} catch (error) {
		await session.abortTransaction();
		next(error);
	} finally {
		session.endSession();
	}
};

exports.show = async (req, res, next) => {
	try {
		const book = await Book.findById(req.params.id)
			.populate([
				{
					path: "category",
					model: "Category",
					select: "_id",
				},
				{
					path: "author",
					model: "Author",
					select: "_id",
				},
			])
			.exec();
		res.json({ book });
	} catch (error) {
		next(error);
	}
};

exports.update = async (req, res, next) => {
	const session = await mongoose.startSession();
	session.startTransaction();
	try {
		const data = Book.prepareUpdate(req);
		const book = await Book.findByIdAndUpdate(req.params.id, data, {
			session,
		}).exec();
		if (req.image) {
			req.mv();
			book.image.forEach((image) => {
				fs.unlinkSync(path.join(__basedir, image.path));
			});
		}
		await session.commitTransaction();
		res.status(200).json({ message: "The book is updated." });
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
		const book = await Book.findByIdAndDelete(req.params.id, {
			session,
		}).exec();

		book.image.forEach((image) => {
			fs.unlinkSync(path.join(__basedir, image.path));
		});

		await session.commitTransaction();
		res.status(200).json({ message: "The book is deleted." });
	} catch (error) {
		await session.abortTransaction();
		next(error);
	} finally {
		session.endSession();
	}
};
