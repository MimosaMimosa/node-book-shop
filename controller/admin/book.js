const Book = require("../../model/book");
const { calculatePaginate } = require("../../utils/helper");
exports.index = async (req, res, next) => {
	try {
		const [currentPage, skip, limit] = calculatePaginate();
		const total = await Book.find().count().exec();
		const totalPage = Math.ceil(total / limit);
		const books = await Book.find()
			.skip(skip)
			.limit(limit)
			.populate([
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
			])
			.exec();
		res.status(200).json({ books, totalPage, currentPage });
	} catch (error) {
		next(error);
	}
};
