const Book = require("../model/book");
exports.create = async (req, res, next) => {
	req.body.photo = { url: req.image.path, name: req.image.name };
	req.body.categories = req.category;
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
        const books = await Book.find().sort({_id:-1}).limit(4).populate('author');
        return res.status(200).json(books);
    }catch(error) {
        next(error);
    }
};
