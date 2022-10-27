const Book = require("../model/book");
exports.create = async (req, res, next) => {
	req.body.image = { url: req.image.path, name: req.image.name };
	const data = req.body;
	try {
		const book = new Book(data);
		await book.save();
		return res.status(200).json(book);
	} catch (error) {
		next(error);
	}
};

exports.index = async (req, res, next) => {
	try {
		const search = {};
		const category = req.query.category;
		const author = req.query.author;

		if (category) {
			search.category = category;
		}

		if (author) {
			search.author = author;
		}

		const books = await Book.find(search)
			.sort({ _id: -1 })
			.populate("author")
			.limit(8);
		return res.status(200).json(books);
	} catch (error) {
		next(error);
	}
};

exports.show = async (req, res, next) => {
	try {
		const book = await Book.findById(req.params.id).populate("author");
		return res.status(200).json(book);
	} catch (error) {
		next(error);
	}
};
