/**
 *
 * @param {Object} req
 * @param {number} amount pagination limit
 * @returns
 */
exports.calculatePaginate = function (req, amount = 10) {
	const currentPage = parseInt(req.query.page ?? 1);
	const limit = parseInt(req.query.limit ?? amount);
	const skip = limit * (currentPage - 1);
	return [currentPage, skip, limit];
};

exports.config = (search, df = null) => {
	try {
		const [file, key] = search;
		const config = require(`../config/${file}`);
		return config[key] ?? df;
	} catch (error) {
		console.error(error);
	}
};

/**
 * Auto generate pagination for client
 * @param {number} total
 * @param {number} current
 * @param {string}  spreader
 * @returns {Array} [1,...,3,4,5...100],[1...97,98,99,100],[1,2,3,4,7,8]
 */
exports.usePagination = (total, current, spreader = "...") => {
	let pagination = [];
	if (total >= 8) {
		if (current < 5) {
			pagination = [
				...[...Array(5).keys()].map((x) => x + 1),
				spreader,
				total,
			];
		} else if (current >= 5 && current + 3 < total) {
			pagination = [
				1,
				spreader,
				...Array(3)
					.fill(current - 1)
					.map((x, y) => x + y),
				spreader,
				total,
			];
		} else if (current + 3 >= total && current !== 5) {
			pagination = [
				1,
				spreader,
				...Array(5)
					.fill(total - 4)
					.map((x, y) => x + y),
			];
		}
	} else {
		pagination = [
			...Array(total)
				.fill(1)
				.map((x, y) => x + y),
		];
	}

	return pagination;
};

/**
 *
 * @param {number} start
 * @param {number} end
 * @returns {Array}
 */
exports.range = (start, end) => {
	if (!end) {
		return [...Array(start).keys()];
	}
	return [
		...Array(end - start + 1)
			.fill(start)
			.map((x, y) => x + y),
	];
};
