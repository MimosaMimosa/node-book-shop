const Book = require("../../model/book");
exports.create = async (req, res, next) => {
	req.body.image = { url: req.image.path, name: req.image.name };
	const data = req.body;
	try {
		const book = new Book(data);
		await book.save();
		res.status(200).json(book);
	} catch (error) {
		next(error);
	}
};

exports.index = async (req, res, next) => {
	try {
		const books = await Book.find(Book.query())
			.sort({ _id: -1 })
			.populate("author")
			.limit(req.query.limit ?? 10);
		res.status(200).json({ books });
	} catch (error) {
		next(error);
	}
};

exports.show = async (req, res, next) => {
	try {
		const book = await Book.findById(req.params.id).populate("author");
		return res.status(200).json({ book });
	} catch (error) {
		next(error);
	}
};
