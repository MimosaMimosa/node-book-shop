exports.queryPaginate = async function (wanted, config = []) {
	const req = request();
	const page = parseInt(req.query.page ?? 1);
	const limit = parseInt(wanted ?? req.query.limit ?? 10);
	const skip = limit * (page - 1);

	const query = this.query();
	const count = await this.find(query).count();
	const totalPage = Math.ceil(count / limit);
	req.totalPage = totalPage;

	return this.find(query).skip(skip).limit(limit).populate(config);
};

/**
 * 
 * @param {Array} custom 
 * @returns {Object}
 */
exports.query = function (custom) {
	const fields = custom ?? ["name", "category", "author", "price"];
	const query = {};
	fields.forEach((field) => {
		if (request().query[field]) {
			query[field] = request().query[field];
		}
	});
	return query;
};
