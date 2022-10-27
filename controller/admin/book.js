const Book = require("../../model/book");

exports.index = async (req, res, next) => {
	try {
		req.query = {}
		const category = req.query.category;
		const author = req.query.author;

		if (category) {
			req.query.category = category;
		}

		if (author) {
			req.query.author = author;
		}

		const books = await Book.paginate(req);
		return res.status(200).json({books,totalPage:req.totalPage});
	} catch (error) {
		next(error);
	}
};