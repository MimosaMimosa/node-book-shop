const Author = require("../../model/Author");
const fs = require("fs");
const path = require("path");
const mongoose = require("mongoose");
const { calculatePaginate, usePagination } = require("../../utils/helper");

exports.index = async (req, res, next) => {
	const [currentPage, skip, limit] = calculatePaginate(req);
	try {
		const count = await Author.count();
		const totalPage = Math.ceil(count / limit);
		const pagination = usePagination(totalPage, currentPage);
		const authors = await Author.find()
			.sort({ _id: -1 })
			.skip(skip)
			.limit(limit)
			.exec();
		return res
			.status(200)
			.json({ authors, totalPage, currentPage, pagination });
	} catch (error) {
		next(error);
	}
};

exports.store = async (req, res, next) => {
	const session = await mongoose.startSession();
	session.startTransaction();
	try {
		const data = Author.prepareStore(req);
		const author = await Author.create([data], { session });
		req.mv();
		await session.commitTransaction();
		res.status(200).json({
			author,
			message: "Created author successfully",
		});
	} catch (error) {
		await session.abortTransaction();
		next(error);
	} finally {
		session.endSession();
	}
};

exports.update = async (req, res, next) => {
	const session = await mongoose.startSession();
	session.startTransaction();
	try {
		const data = Author.prepareUpdate(req);
		const author = await Author.findByIdAndUpdate(req.params.id, data, {
			session,
		}).exec();
		if (req.image) {
			const imageDir = path.join(__basedir, author.image.path);
			if (fs.existsSync(imageDir)) {
				fs.unlinkSync(path.join(__basedir, author.image.path));
			}
			req.mv();
		}
		await session.commitTransaction();
		res.status(200).json({
			message: "Author updated successfully",
		});
	} catch (error) {
		await session.abortTransaction();
		next(error);
	} finally {
		session.endSession();
	}
};

exports.show = async (req, res, next) => {
	try {
		const author = await Author.findById(req.params.id)
			.select("-password -createdAt -updatedAt -__v")
			.exec();
		res.status(200).json({ author });
	} catch (error) {
		next(error);
	}
};

exports.destroy = async (req, res, next) => {
	const session = await mongoose.startSession();
	session.startTransaction();
	try {
		const author = await Author.findByIdAndDelete(req.params.id, {
			session,
		}).exec();

		const imageDir = path.join(__basedir, author.image.path);
		if (fs.existsSync(imageDir)) {
			fs.unlinkSync(imageDir);
		}

		await session.commitTransaction();
		res.status(200).json({ message: "Deleted author successfully" });
	} catch (error) {
		error.message = "Deleting author failed";
		await session.abortTransaction();
		next(error);
	} finally {
		session.endSession();
	}
};
