const Author = require("../../model/Author");
const fs = require("fs");
const path = require("path");

exports.store = async (req, res, next) => {
	req.body.image = { url: req.image.path, name: req.image.name };
	const data = req.body;
	try {
		const author = new Author(data);
		await author.save();
		delete author._doc.password;
		res.status(200).json({
			author,
			message: "Created author successfully",
		});
	} catch (error) {
		next(error);
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
		const author = await Author.findById(req.params.id).select(
			"-password -createdAt -updatedAt -__v"
		).exec();

		res.status(200).json({ author });
	} catch (error) {
		next(error);
	}
};

exports.update = async (req, res, next) => {
	try {
		if (req.image) {
			req.body.image = { url: req.image.path, name: req.image.name };
		}
		const data = {};
		for (let key in req.body) {
			if (req.body[key]) {
				data[key] = req.body[key];
			}
		}
		const author = await Author.findByIdAndUpdate(req.params.id, data);
		req.image && fs.unlinkSync(path.join(__basedir, author.image.url));
		res.status(200).json({
			message: "Author updated successfully",
		});
	} catch (error) {
		next(error);
	}
};

exports.destroy = async (req, res, next) => {
	try {
		const author = await Author.findByIdAndDelete(req.params.id);
		fs.unlinkSync(path.join(__basedir, author.image.url));
		res.status(200).json({ message: "Deleted author successfully" });
	} catch (error) {
		error.message = "Deleting author failed";
		next(error);
	}
};
