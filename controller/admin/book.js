const Book = require("../../model/book");

exports.index = async (req, res, next) => {
	try {
		const books = await Book.paginate(req);
		return res.status(200).json({books,totalPage:req.totalPage});
	} catch (error) {
		next(error);
	}
};