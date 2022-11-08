const Book = require("../../model/Book");

exports.index = async (req, res, next) => {
	try {
		const dt = new Date();
		dt.setDate(dt.getDate() - 7);
		const lastSevenDayBooks = await Book.aggregate([
			{
				$match: {
					createdAt: { $gte: dt },
				},
			},
			{
				$group: {
					_id: {
						$dateToString: {
							format: "%Y-%m-%d",
							date: "$createdAt",
						},
					},
					count: { $sum: 1 },
				},
			},
		]);
		res.status(200).json({ lastSevenDayBooks });
	} catch (error) {
		next(error);
	}
};
