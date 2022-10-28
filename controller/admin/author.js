const Author = require("../../model/Author");

exports.create = async (req, res, next) => {
	req.body.image = { url: req.image.path, name: req.image.name };
	const data = req.body;
	try {
		const author = new Author(data);
		await author.save();
		delete author._doc.password;
		return res.status(200).json(author);
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
		const authors = await Author.find().skip(skip).limit(limit);
		return res.status(200).json({ authors, totalPage });
	} catch (error) {
		next(error);
	}
};
