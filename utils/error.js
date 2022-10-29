exports.createError = (status, data, next) => {
	const error = new Error();
	error.status = status;
	error.data = data;
	next(error);
};
