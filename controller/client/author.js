const Author = require("../../model/Author");

exports.create = async (req, res, next) => {
	req.body.image = { url: req.image.path, name: req.image.name };
	const data = req.body;
	try {
		const author = new Author(data);
		await author.save();
		delete author._doc.password;
		res.status(200).json({ author });
	} catch (error) {
		next(error);
	}
};

exports.index = async (req, res, next) => {
	try {
		const authors = await Author.find().sort({ _id: -1 }).limit(5);
		res.status(200).json({ authors });
	} catch (error) {
		next(error);
	}
};

exports.randomAuthors = async (req, res, next) => {
	try {
		const authors = await Author.aggregate().sample(10);
		res.status(200).json({ authors });
	} catch (error) {
		next(error);
	}
};
