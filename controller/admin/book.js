const Book = require("../../model/book");
exports.index = async (req, res, next) => {
	try {
		const books = await Book.queryPaginate(10, [
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
		]);
		return res
			.status(200)
			.json({ books, totalPage: req.totalPage});
	} catch (error) {
		next(error);
	}
};
